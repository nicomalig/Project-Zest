"use strict"

var express = require("express")
var cheerio = require("cheerio")
var request = require("request")

// spin up our app
const app = express()

// capture our API server address and port using destructuring, default to port 80
const addr = process.env.ADDR || ":80"
const [host, port] = addr.split(":")

const HttpCode = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotSupported: 405,
    internalServerError: 500,
}

// to ensure that we're getting the right measure
const measures = [
    "cup", "cups",
    "gallon", "gallons", "gal", "gals",
    "quart", "quarts", "qt", "qts",
    "pint", "pints", "pt", "pts",
    "ounce", "ounces", "oz", "ozs",
    "tablespoon", "tablespoons", "tbsp", "tbsps",
    "teaspoon", "teaspoons", "tsp", "tsps",
    "liter", "liters", "l",
    "milliliter", "milliliters", "ml", "mls",
    "stick", "sticks"
]

// our handler
app.get("/v1/scrape/foodnetwork", (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')

    var target = req.query.url
    console.log(`received scrape request for ${target}`) // DEBUG

    // Validate that this is a Food Network URL
    const targetURL = new URL(target)
    if (!targetURL.host.includes("foodnetwork")) {
        res.status(HttpCode.badRequest).send("Only Food Network recipes permitted")
        return
    }

    // first, we send a request over to the url
    request(target, (err, response, html) => {
        if (err) {
            return next(err)
        }

        // load cheerio with our html
        var $ = cheerio.load(html)

        // declare variables
        var link, data, name, img,
            details, total, prep, inactive, cook, level,
            servings, amount, item,
            ingredients

        // declare recipe to return to client
        var recipe = {
            link: target,
            data: {
                name: null,
                img: null,
                details: {
                    total: null,
                    prep: null,
                    inactive: null,
                    cook: null,
                    level: null,
                    servings: {
                        amount: null,
                        item: null,
                    },
                },
                ingredients: [], // JSON array of ingredients
                directions: [], // JSON array of directions
            },
        }

        // ***** BEGIN EXTRACTING *****
        // ===== TITLE/NAME =====
        recipe.data.name = $(".o-AssetTitle__a-HeadlineText", ".recipe-lead").text()

        // ===== IMAGE ===== 
        let sURL = $(".o-AssetMultiMedia__a-Image")
        if (sURL && sURL.length != 0) {
            recipe.data.img = sURL.attr("src")
        } else {
            recipe.data.img = null
        }

        // ===== COOKING TIMES =====
        recipe.data.details.total =
            $(".o-RecipeInfo__a-Description--Total", "dl").first().text()

        // Next, pull the prep, inactive, and cook times if they exist
        $("dl", ".o-RecipeInfo.o-Time").first()
            .children().each((i, elem) => {
                if ($(elem).text().toLowerCase().includes("prep:")) {
                    recipe.data.details.prep =
                        $(elem).next("dd").text().trim()

                } else if ($(elem).text().toLowerCase().includes("inactive:")) {
                    recipe.data.details.inactive =
                        $(elem).next("dd").text().trim()

                } else if ($(elem).text().toLowerCase().includes("cook:")) {
                    recipe.data.details.cook =
                        $(elem).next("dd").text().trim()
                }
            })

        // ===== LEVEL ======
        let sLevel =
            $(".o-RecipeInfo__a-Description", ".o-RecipeInfo.o-Level").first().text()
        if (sLevel) {
            recipe.data.details.level = sLevel.trim()
        }

        // ===== SERVING SIZE =====
        let yieldText =
            $(".o-RecipeInfo__a-Description", ".o-RecipeInfo.o-Yield")
                .first().text().trim()

        if (!yieldText || yieldText === "") {
            // looks like this recipe has no yield, just duct tape this
            recipe.data.details.servings.amount = "1"
            recipe.data.details.servings.item = "serving"
        } else {
            // Amount
            // ASSERTION: the amount is a number and is the first element in the string
            var servingAmount = yieldText.match("([0-9]+)")

            if (servingAmount) {
                recipe.data.details.servings.amount = servingAmount[0].trim()

                // Item
                var servingItem = yieldText.split(servingAmount[0].trim())[1]

                if (servingItem) {
                    if (servingItem.trim().startsWith("dozen")) {
                        recipe.data.details.servings.amount =
                            "" + recipe.data.details.servings.amount * 12
                        recipe.data.details.servings.item = servingItem.split("dozen")[1].trim()
                    } else {
                        recipe.data.details.servings.item = servingItem.trim()
                    }
                }
            }

            // duct tape as necessary
            if (!servingAmount || !servingItem) {
                recipe.data.details.servings.item = yieldText
            }

        }

        // ===== INGREDIENTS =====
        $(".o-Ingredients__a-ListItemText", ".o-Ingredients__m-Body").each((i, e) => {
            // pull the data
            let whole = $(e).text()
            var qty, measure, item

            qty = whole.match("^[\\d\\/\\s]*")[0]

            if (qty && (!isNaN(qty) || qty.includes("/"))) {
                qty = qty.trim()
                measure = whole.match("([a-z]+)")

                if (measure) {
                    // If measure is actually a measure, then pass it through.
                    // Otherwise, it looks like we can't reliably parse this:
                    // we have to hand this ingredient off as just a whole string
                    measure = measure[0].trim()
                    if (measures.includes(measure)) {
                        item = whole.split(measure)
                        if (item) {
                            item = item[1].trim()
                        } else {
                            next("no item pulled!")
                        }
                    } else {
                        qty = qty
                        measure = null
                        item = whole.split(qty)[1].trim()
                    }
                }
            } else { // not a number! just hand it off
                qty = null
                measure = null
                item = whole
            }

            // push to our final recipe JSON
            recipe.data.ingredients.push({
                amount: qty,
                unit: measure,
                item: item,
            })
        })

        // ===== DIRECTIONS =====
        $("p", ".o-Method__m-Body").each((i, e) => {
            let dir = $(e).text().trim()
            // don't push this direction (common in a lot of FN recipes)
            if (!dir.includes("how to make this recipe")) {
                recipe.data.directions.push(dir)
            }
        })
        // ***** END EXTRACTING *****

        // Time to send the recipe back
        res.json(recipe)
    })
})

// centralized error handling
app.use((err, req, res, next) => {
    if (err.stack) {
        console.error(err.stack)
    }
    res.status(500).send("Looks like we encountered an irreparable error. Sorry!!")
})

app.listen(port, "", () => {
    console.log(`server is listening at http://${host}:${port}`)
})
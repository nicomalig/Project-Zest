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
        // First, the title
        // title section: recipe-lead
        // title text: o-AssetTitle__a-HeadlineText
        recipe.data.name = $(".o-AssetTitle__a-HeadlineText", ".recipe-lead").text()

        // Pull the image URL 
        let sURL = $(".o-AssetMultiMedia__a-Image")
        if (sURL) {
            recipe.data.img = sURL.attr("src")
        }

        // Next, the cooking times
        // total: o-RecipeInfo__a-Description--Total
        recipe.data.details.total =
            $(".o-RecipeInfo__a-Description--Total", "dl").first().text()

        console.log($("dl", ".o-RecipeInfo o-Time").children());


        // Next, pull the prep, inactive, and cook times if they exist
        $("dl", ".o-RecipeInfo o-Time").children().each((i, elem) => {
            console.log($(this));

            // let headline = $(this).text().toLowerCase()

            if ($(this).text().toLowerCase().includes("prep")) {
                recipe.data.details.prep = headline
                    .next(".o-RecipeInfo__a-Description").text()

            } else if ($(this).text().toLowerCase().includes("inactive")) {
                recipe.data.details.inactive = headline
                    .next(".o-RecipeInfo__a-Description").text()

            } else if ($(this).text().toLowerCase().includes("cook")) {
                recipe.data.details.cook = headline
                    .next(".o-RecipeInfo__a-Description").text()
            }
        })

        // Pull the level
        let sLevel = $("o-RecipeInfo__a-Description", "o-RecipeInfo o-Level").text()
        if (sLevel) {
            recipe.data.details.level = sLevel
        }

        // Pull the yield/servings
        let yieldText = $(".o-RecipeInfo__a-Description", ".o-RecipeInfo o-Yield").text()

        // ASSERTION: the amount is a number and is the first element in the string
        let servingAmount = yieldText.match("([0-9]+)")
        if (servingAmount) {
            recipe.data.details.servings.amount = servingAmount[0].trim()
        }

        // captures the very last word in the string
        let servingItem = yieldText.match("\s(\w+)$")
        if (servingItem) {
            recipe.data.details.servings.item = servingItem[0].trim()
        }

        // validate yield scraping
        if (!servingAmount || !servingItem) {
            recipe.data.details.servings.item = yieldText // just duct tape whole thing
        } else {
            recipe.data.details.servings.amount = servingAmount
            recipe.data.details.servings.item = servingItem
        }

        // Next, all the ingredients
        // ingredients section: o-Ingredients__m-Body
        // ingredient: o-Ingredients__a-ListItemText
        $(".o-Ingredients__a-ListItemText", ".o-Ingredients__m-Body").each((i, e) => {
            // pull the data
            var whole = $(e).text()
            // ===== REGEX =====
            // qty:             ([0-9])[,/ ]
            // qty (first)      (?:^|(?:[.!?]\s))(\w+)
            // measure:         ([a-z]+) <-- use only first element
            // item:            ([a-z].+)
            // ===== REGEX =====[0-9])[,/ ]")
            var qty, measure, item

            qty = whole.match("(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?")

            if (qty && (!isNaN(qty[0]) || qty[0].includes("/"))) {
                qty = qty[0].trim()
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
                            // console.log(`item extrapolated as: ${item}`) // DEBUG
                        } else {
                            next("no item pulled!")
                        }
                    } else {
                        qty = null
                        measure = "none"
                        item = whole
                    }
                }
            } else { // not a number! just hand it off
                console.log("===== ITEM PULLED AS WHOLE");

                item = whole
            }

            // old scrape
            // if (qty) {
            //     qty = qty[0].trim()
            // }
            // var measure = whole.match("([a-z]+)")
            // if (measure) {
            //     measure = measure[0].trim()

            //     // check for measure, otherwise, just push the whole thing
            //     // as the item  
            // }
            // var item = whole.split(measure)
            // if (item) {
            //     item = item[1].trim()
            // }

            // push to our final recipe JSON
            recipe.data.ingredients.push({
                amount: qty,
                unit: measure,
                item: item,
            })
        })

        // Pull the directions
        // directions section: o-Method__m-Body
        // each direction is a <p> tag
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
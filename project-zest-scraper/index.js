"use strict"

var express = require("express")
var cheerio = require("cheerio")
var request = require("request")

// spin up our app
const app = express()

// capture our API server address and port using destructuring, default to port 80
const addr = process.env.ADDR || ":80"
const [host, port] = addr.split(":")

// our handler
app.get("/v1/scrape/foodnetwork", (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    
    var target = req.query.url
    console.log(`target URL is ${target}`) // DEBUG
    
    // first, we send a request over to the url, 
    // assume we handle URL validation clientside
    request(target, (err, response, html) => {
        if (err) {
            return next(err)
        }
    
        // load cheerio with our html
        var $ = cheerio.load(html)

        // declare variables
        // var link, name, data, img,
        //     details, total, prep, inactive, cook, level, servings,
        //     ingredients, qty, measure, item, 
        //     directions, step, text

        var link, data, name, img,
            details, total, prep, inactive, cook, level,
            servings, amount, item,
            ingredients

        var recipe = {
            link: target,
            data: {
                name,
                img,
                details: {
                    total,
                    prep,
                    inactive,
                    cook,
                    level,
                    servings: {
                        amount,
                        item,
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
        let sURL = $("o-AssetMultiMedia__a-Image")
        if (sURL) {
            recipe.data.img = sURL.attr("src")
        } else {
            recipe.data.img = null
        }

        // Next, the cooking times
        // total: o-RecipeInfo__a-Description--Total
        recipe.data.details.total = $(".o-RecipeInfo__a-Description--Total").text()

        // Next, pull the prep, inactive, and cook times if they exist
        $(".o-RecipeInfo__a-Headline").each((i, elem) => {
            let headline = $(this).text().toLowerCase()
            if (headline.includes("prep")) {
                recipe.data.details.prep = headline
                    .next(".o-RecipeInfo__a-Description").text()

            } else if (headline.includes("inactive")) {
                recipe.data.details.inactive = headline
                    .next(".o-RecipeInfo__a-Description").text()

            } else if (headline.includes("cook")) {
                recipe.data.details.cook = headline
                    .next(".o-RecipeInfo__a-Description").text()
            }
        })

        // Pull the level
        let sLevel = $("o-RecipeInfo__a-Description", "o-RecipeInfo o-Level").text()
        if (sLevel) {
            recipe.data.details.level = sLevel
        } else {
            recipe.data.details.level = null
        }

        // Pull the yield/servings
        let yieldText = $(".o-RecipeInfo__a-Description", ".o-RecipeInfo o-Yield").text()

        // ASSERTION: the amount is a number and is the first element in the string
        let servingAmount = yieldText.match("([0-9]+)")
        if (servingAmount) {
            servingAmount = servingAmount[0].trim()
        }

        // captures the very last word in the string
        let servingItem = yieldText.match("\s(\w+)$")
        if (servingItem) {
            servingItem = servingItem[0].trim()
        }

        // validate yield scraping
        if (!servingAmount || !servingItem) {
            recipe.data.details.servings.amount = null
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
            
            // REGEX
            // qty:     ([0-9])[,/ ]
            // measure: ([a-z]+) <-- use only first element
            // item:    ([a-z].+)
            var qty = whole.match("([0-9])[,/ ]")
            if (qty) {
                qty = qty[0].trim()
            }
            var measure = whole.match("([a-z]+)")
            if (measure) {
                measure = measure[0].trim()
            }
            var item = whole.split(measure)
            if (item) {
                item = item[1].trim()
            }

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
            recipe.data.directions.push($(e).text().trim())
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
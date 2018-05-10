"use strict"

var express = require("express")
var cheerio = require("cheerio")
var request = require("request")

// spin up our app
const app = express()

// capture our API server address and port using destructuring, default to port 80
const addr = process.env.ADDR || ":80"
const [host, port] = addr.split(":")

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
    "milliliter", "milliliters", "ml", "mls"
]

// our handler
app.get("/v1/scrape/foodnetwork", (req, res, next) => {
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
        var title, ingredients, ingrQuantity, ingrMeasure, ingrItem, directions, dirStep, dirStepText

        var recipe = {
            title: "",
            source: target,
            ingredients: [], // JSON array of ingredients
            directions: [], // JSON array of directions
        }

        // ***** BEGIN EXTRACTING *****
        // First, the title
        // title section: recipe-lead
        // title text: o-AssetTitle__a-HeadlineText
        recipe.title = $(".o-AssetTitle__a-HeadlineText", ".recipe-lead").text()

        // Next, all the ingredients
        // ingredients section: o-Ingredients__m-Body
        // ingredient: o-Ingredients__a-ListItemText
        $(".o-Ingredients__a-ListItemText", ".o-Ingredients__m-Body").each((i, e) => {
            // pull the data
            var whole = $(e).text()
            console.log(`\nprocessing ingredient: ${whole}`);
            
            // ===== REGEX =====
            // qty:             ([0-9])[,/ ]
            // qty (first)      (?:^|(?:[.!?]\s))(\w+)
            // measure:         ([a-z]+) <-- use only first element
            // item:            ([a-z].+)
            // ===== REGEX =====

            var qty, measure, item
            qty = whole.match("([0-9])[,/ ]")
            console.log(`qty pulled as: ${qty}`) // DEBUG

            console.log(`qty? --> ${qty == null}`);
            // console.log(`!isNaN(qty[0] --> ${!isNaN(qty[0])}`);
            // console.log(`qty[0].includes("/") --> ${qty[0].includes("/")}`);
            
            
            

            // if we can pull a value and it's a number
            if (qty && (!isNaN(qty[0]) || qty[0].includes("/"))) {

                qty = qty[0].trim()
                console.log(`parsed qty: ${qty}`);
                
                // make sure we get any partial quantities
                if (qty[0].includes("/")) {
                    qty = "" + qty[0] + qty[1]
                    console.log(`new qty is: ${qty}`);
                    
                }

                measure = whole.match("([a-z]+)")
                console.log(`measure pulled as: ${measure}`) // DEBUG
                if (measure) {
                    // If measure is actually a measure, then pass it through.
                    // Otherwise, it looks like we can't reliably parse this:
                    // we have to hand this ingredient off as just a whole string
                    measure = measure[0].trim()
                    if (measures.includes(measure)) {
                        item = whole.split(measure)
                        if (item) {
                            item = item[1].trim()
                            console.log(`item extrapolated as: ${item}`) // DEBUG
                        } else {
                            next("no item pulled!")
                        }
                    } else {
                        qty = null
                        measure = null
                        item = whole
                    }
                }
            } else { // not a number! just hand it off
                console.log("===== ITEM PULLED AS WHOLE");
                
                item = whole
            }

            // push to our final recipe JSON
            recipe.ingredients.push({
                ingrNumber: i + 1,
                ingrQuantity: qty,
                ingrMeasure: measure,
                ingrItem: item,
            })
        })

        // Finally, pull the directions
        // directions section: o-Method__m-Body
        // each direction is a <p> tag
        $("p", ".o-Method__m-Body").each((i, e) => {
            recipe.directions.push({
                dirStep: i + 1, 
                dirStepText: $(e).text().trim(),
            })
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
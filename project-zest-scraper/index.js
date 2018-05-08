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
            
            // REGEX
            // qty:     ([0-9])[,/ ]
            // measure: ([a-z]+) <-- use only first element
            // item:    ([a-z].+)
            var qty = whole.match("([0-9])[,/ ]")[0].trim()
            var measure = whole.match("([a-z]+)")[0].trim()
            var item = whole.split(measure)[1].trim()

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

app.listen(port, "127.0.0.1", () => {
    console.log(`server is listening at http://${host}:${port}`)
})
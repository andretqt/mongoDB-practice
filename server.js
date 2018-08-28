var mongoose = require('mongoose');
var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var axios = require("axios");
var exphbs = require("express-handlebars");
var request = require("request");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Require all models
// var db = require("./models");
var PORT = 3000;
// Initialize Express
var app = express();
// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

//doing the routing here below

app.get("/", function (req, res) {
    res.render("homepage");
});

app.get("/scrape", function (req, res) {
    console.log("routing seems to work..let's send a status response for now");
    //do the scraping in here
    request("http://www.echojs.com/", function (error, response, html) {
        var $ = cheerio.load(html);
        $("article h2").each(function (i, element) {
            // Save an empty result object
            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            console.log(result);
        });
    });

});


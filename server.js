var mongoose = require('mongoose');
var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars")
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

//doing the routing here below

app.get("/", function(req, res) {
    res.render("homepage");
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
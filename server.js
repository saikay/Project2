// Case's Temporary Key (for beta tesitng)
// intialize food2fork api key
const API_KEY = 'b1727ca13adcac54b9fcd530786a7393';
// !! Please remove the above key ^^ and transfer to .env as soon as possible !! //

// Dot ENV for hiding keys
require("dotenv").config();

// Javascript initialize modules
// Body parser and request, used by Case for API call functionality
const bodyParser = require('body-parser');
const request = require('request');

// Case's test directory services
// directory of URLS
const directory = ["/", "/recipes", "/recipes.html", "/index.html"];

// Load express and handlebars
var express = require("express");
var exphbs = require("express-handlebars");

// Require keys from .env
var keys = require("./keys.js");

var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// function to search for the recipe on food2fork and update the page
function recipeSearch(ingredient, response) {
  // get the url of the food2fork website
  let url = `http://food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`;
  // pass in the url
  request(url, function (error, requestResponse, data) {
    // if error, send message
    if (error)
      response.render('index', { page: null });
    // else if successful
    else {
      // parse the data
      let dataInfo = JSON.parse(data);
      // if the object is not empty
      if (dataInfo != null)
        // print the object
        response.render('index', { page: dataInfo.recipes, error: null });
    }
  });
}

// handle post requests
app.post('/', (postRequest, postResponse) => {
  // get the ingredient from the request
  let ingredient = postRequest.body.ingredient;
  // search and render
  recipeSearch(ingredient, postResponse);
});

// loop through all possible urls
for (url of directory) {
  // handle get request
  app.get(url, (getRequest, getResponse) => {
    // get in the ingredient from the URL parameter
    let ingredient = getRequest.query.ingredients;
    // get the url of the food2fork website
    recipeSearch(ingredient, getResponse);
  });
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

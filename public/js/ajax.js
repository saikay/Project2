require("dotenv").config();
var keys = require("./keys.js");

function getRecipeData(yourSearch) {
    var queryUrl = "https://www.food2fork.com/api/search?key=" + api_key + "&q=" + yourSearch + "&page=1";
    console.log("You searched for: " + yourSearch);

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            var results = JSON.parse(response);
            var recipeURL = results.recipes[0].source_url;
            var recipeId = results.recipes[0].recipe_id;
            console.log(results);
            console.log(recipeURL);
            console.log(recipeId);
        }),
        
getRecipeData();





// Code from Glory's Group Project is below ...


// var queryURL = "https://www.food2fork.com/api/search?key=" + "" + "&q=" + search + "&page=1";

//  // Performing an AJAX request with the queryURL for recipe
//  $.ajax({
//    url: queryURL,
//    method: "GET"
//  })

//    // After data comes back from the request for image
//    .then(function (response) {
//      var results = JSON.parse(response);
//      var recipeURL = results.recipes[0].source_url;
//      var recipeId = results.recipes[0].recipe_id;
//      console.log(results);
//      console.log(recipeURL);
//      console.log(recipeId);
//    }),

//    var concert = JSON.parse(body);

//    // Prints out concert info.
//    logOutput("Concert City: " + concert.Events);
//    logOutput("Venue: " + venue.name);
//    logOutput("Date of Event: " + concert.datetime);
//    logOutput("You searched for: ' " + bandName + " '");
// }
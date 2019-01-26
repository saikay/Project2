var db = require("../models");
var unirest = require("unirest");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // console.log(db);
    db.Favorite.findAll({}).then(function (dbRecipes) {
      res.render("index", {
        msg: "Welcome!",
        example: dbRecipes
      });
    });
  });

  app.get("/logout", function (req, res) {
    res.render("index");
  })

  app.get("/account", function (req, res) {
    // console.log(db);
    db.Favorite.findAll({}).then(function (dbRecipes) {
      res.render("account", {
        msg: "Welcome!",
        examples: dbRecipes
      });
    });
  });

  app.get("/account", function (req, res) {
    // console.log(db);
    db.Favorite.findAll({}).then(function (dbRecipes) {
      res.render("account");
    });
  });

  app.get("/favorites", function (req, res) {
    // console.log(db);
    db.Favorite.findAll({}).then(function (dbRecipes) {
      res.render("favorites");
    });
  });

  app.get("/search", function(req, res) {
    var data = req.query.search;
    console.log(req.query)
    console.log("Get route worked again")
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=9&ranking=2&ingredients=" + data)
      .header("X-RapidAPI-Key", process.env.SPOON_KEY)
      .end(function (result) {
        console.log(result.body)
        res.render("search", result.body);
    });
  })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

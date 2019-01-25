var db = require("../models");

module.exports = function(app) {
  // Get all Favorite Recipes by UserId
  // Need to define recipeFavs, use a descriptive endpoint
  app.get("/api/favorites?=:userName", function(req, res) {
    db.Recipe.findAll({}).then(function(recipeFavs) {
      res.json(recipeFavs);
    });
  });

  // Add a favorite Recipe
  app.post("/api/favorites", function(req, res) {
    db.Recipe.create(req.body).then(function(recipeFavs) {
      res.json(recipeFavs);
    });
  });

  // Delete Food by recipeID
  app.delete("/api/favorites", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.body } }).then(function(recipeFavs) {
      res.json(recipeFavs);
    });
  });

  app.get("/api/recipes", function (req, res) {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=2&ingredients=" + ingredient1 + "%2C" + ingredient2 + "%2C" + ingredient3)
      .header("X-RapidAPI-Key", "0dLFzw4TjNmshzQG9xezksktSXbEp1QtQtdjsnAd8FlOiv9etx")
      .end(function (result) {

        // Output resulting JSON to console
        res.send(result)
      });
  });
};



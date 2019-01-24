var db = require("../models");

module.exports = function (app) {
  // Get all Food
  app.get("/api/recipes", function (req, res) {
    db.Food.findAll({}).then(function (dbFoods) {
      res.json(dbFoods);
    });
  });

  // Create a new Food
  app.post("/api/recipes", function (req, res) {
    db.Food.create(req.body).then(function (dbFood) {
      res.json(dbFood);
    });
  });

  // Delete Food by id
  app.delete("/api/recipes/:id", function (req, res) {
    db.Food.destroy({ where: { id: req.params.id } }).then(function (dbFood) {
      res.json(dbFood);
    });
  });

  app.get("/api/recipes", function (req, res) {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=2&ingredients=" + ingredient1 + "%2C" + ingredient2 + "%2C" + ingredient3)
    .header("X-RapidAPI-Key", "0dLFzw4TjNmshzQG9xezksktSXbEp1QtQtdjsnAd8FlOiv9etx")
    .end(function (result) {

      // Output resulting JSON to console
      res.send(result)
    });
  })
};



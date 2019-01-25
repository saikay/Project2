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
};

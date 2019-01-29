var db = require("../models");

module.exports = function (app) {
  // Get all Favorite Recipes by UserId
  // Need to define recipeFavs, use a descriptive endpoint

  app.get("/api/favorites/:id", function (req, res) {
    db.Favorite.findAll({}).then(function (recipeFavs) {

      res.json(recipeFavs);
    });
  });

  app.get("/api/user/:username", function(req, res){
    db.user.findAll({
      where: {
        username: req.params.username
      }
    }).then(function(userData){
      res.json(userData);
    })
  })
  // Add a favorite Recipe
  app.post("/api/favorites", function (req, res) {

    db.Favorite.create(req.body).then(function (recipeFavs) {

      res.json(recipeFavs);
    });
  });

  // Delete Food by recipeID
  app.delete("/api/favorites", function (req, res) {

    db.Favorite.destroy({ where: { id: req.params.body } }).then(function (recipeFavs) {

      res.json(recipeFavs);
    });
  });

};



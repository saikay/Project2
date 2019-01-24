var db = require("../models");

module.exports = function(app) {
  // Get all Food
  app.get("/api/recipes", function(req, res) {
    db.Food.findAll({}).then(function(dbFoods) {
      res.json(dbFoods);
    });
  });

  // Create a new Food
  app.post("/api/recipes", function(req, res) {
    db.Food.create(req.body).then(function(dbFood) {
      res.json(dbFood);
    });
  });

  // Delete Food by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Food.destroy({ where: { id: req.params.id } }).then(function(dbFood) {
      res.json(dbFood);
    });
  });
};

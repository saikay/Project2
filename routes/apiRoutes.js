var db = require("../models");

module.exports = function(app) {
  // Get all Food
  app.get("/api/ingredients", function(req, res) {
    db.Food.findAll({}).then(function(dbFoods) {
      res.json(dbFoods);
    });
  });

  // Create a new Food
  app.post("/api/ingredients", function(req, res) {
    db.Food.create(req.body).then(function(dbFood) {
      res.json(dbFood);
    });
  });

  // Delete Food by id
  app.delete("/api/ingredients/:id", function(req, res) {
    db.Food.destroy({ where: { id: req.params.id } }).then(function(dbFood) {
      res.json(dbFood);
    });
  });
};

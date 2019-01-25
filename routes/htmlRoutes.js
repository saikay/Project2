var db = require("../models");

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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

var db = require("../models");
var unirest = require("unirest");
var passport = require("passport");
var session = require("express-session");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
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
    var uid = req.session.passport.user;
    db.user.findOne(
      {
        where: {
          id: uid
        }
      }
    ).then(function (userdata) {
      var username = userdata.username
      res.render("account", {
        username: "Welcome " + username + "!"
      });
    });
  });

  app.get("/favorites", function (req, res) {
    var uid = req.session.passport.user;
    db.user.findOne({
      where: {
        id: uid
      }
    }).then(function (user) {
      db.Favorite.findAll({
        where: {
          userName: user.username
        }
      }).then(function (dbRecipes) {
        res.render("favorites", {
          data: dbRecipes,
          user: user.username
        });
      });
    });
  })

  app.get("/search", function (req, res) {
    var data = req.query.search.replace(/ /g, "%2C");
    var uid = req.session.passport.user;
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=9&ranking=2&ingredients=" + data)
      .header("X-Mashape-Key", process.env.SPOON_KEY)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      .end(function (result) {
        db.user.findOne({
          where: {
            id: uid
          }
        }).then(function (user) {
          res.render("search", {
            data: result.body,
            user: user.username,
            username: "Welcome " + user.username + "!"
          });
        });
      })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

var db = require("../models");
var unirest = require("unirest");
var passport = require("passport");
var session = require("express-session");

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

  // app.get("/account", function (req, res) {
  //   // console.log(db);
  //   db.Favorite.findAll({}).then(function (dbRecipes) {
  //     res.render("account");
  //   });
  // });

  app.get("/favorites", function (req, res) {
    // console.log(db);
    var uid = req.session.passport.user;
    db.user.findOne({
      where: {
        id: uid
      }
    }).then(function(user){
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

  app.get("/search", function(req, res) {
    var data = req.query.search.replace(/ /g, "%2C");
    var uid = req.session.passport.user;
    console.log(uid);
    console.log(data)
    console.log("Get route worked again")
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=9&ranking=2&ingredients=" + data)
      .header("X-RapidAPI-Key", process.env.SPOON_KEY)
      .end(function (result) {
        console.log(result.body)
        db.user.findOne({
          where: {
            id: uid
          }
        }).then(function(user){
          console.log(user.id)
          res.render("search", {
            data: result.body,
            user: user.username,
            username: "Welcome " + user.username + "!"
          });
      });
  })
});

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
<<<<<<< HEAD
=======
    // console.log(db);
>>>>>>> 24a77272af257cfca49d8c6c6754f18a4a848d57
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
        msg: "Welcome!",
        example: dbRecipes
      });
    });
  });

  app.get("/account", function(req, res) {
<<<<<<< HEAD
=======
    // console.log(db);
>>>>>>> 24a77272af257cfca49d8c6c6754f18a4a848d57
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("account", {
        msg: "Welcome!",
        examples: dbRecipes
      });
    });
  });

  app.get("/account", function(req, res) {
<<<<<<< HEAD
=======
    // console.log(db);
>>>>>>> 24a77272af257cfca49d8c6c6754f18a4a848d57
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("account");
    });
  });

  app.get("/favorites", function(req, res) {
<<<<<<< HEAD
=======
    // console.log(db);
>>>>>>> 24a77272af257cfca49d8c6c6754f18a4a848d57
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("favorites");
    });
  });
  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};

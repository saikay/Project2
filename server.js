require("dotenv").config();
var express = require("express");
var path = require("path");
var db = require("./models");
var app = express();
var exphbs = require("express-handlebars");
var passport = require('passport');
var session = require("express-session");
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.enable('trust proxy');
//For BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      clear: function(value, title, id) {
        if(value !== undefined){
          var link = value.replace("-312x231.jpeg", "").replace("-312x231.jpg", "").replace("-312x231.png", "").replace("Images", "s").replace(id, title.replace(/ /g, "-") + "-" + id);
          return link;
        }
      }
    }
  })
);
app.set("view engine", "handlebars");
 
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var syncOptions = { force: true };
var authRoute = require("./routes/auth")(app);

//load passport strategies
 
require('./config/passport/passport.js')(passport, db.user);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

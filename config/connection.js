
// Pull in required dependencies
var mysql = require('mysql');

// Create the MySQL connection object
var connection;

if (process.env.JAWSDB_URL) {
	// DB is JawsDB on Heroku
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// DB is local on localhost
	connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'potato',
		database: 'project2_db'
	})
};

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database")


var app = firebase.initializeApp({
  apiKey: "AIzaSyDWyTFnMYG8zErRpbPVr-zRWJo-qY_FAMM",
  authDomain: "fridge-fix.firebaseapp.com",
  databaseURL: "https://fridge-fix.firebaseio.com",
  projectId: "fridge-fix",
  storageBucket: "fridge-fix.appspot.com",
  messagingSenderId: "143472972782"
});

var userAuth = app.auth();

function CreateUser(userName, email, password, firstName, lastName) {

  this.create = function (email, password, username) {
    userAuth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    userAuth.updateCurrentUser({
      displayName: userName,
      firstName: firstName,
      lastName: lastName
    })
  }

  this.signIn = function (email, password) {
    userAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  this.signOut = function () {
    userAuth.signOut().then(function () {
      console.log("Sign out successful")
    }).catch(function (error) {
      console.log(error);
    });
  };

  this.userInfo = userAuth.currentUser();
};

var thisUser = new CreateUser();

module.exports = thisUser;
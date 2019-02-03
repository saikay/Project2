const authController = require('../controllers/authcontroller.js');
const passport = require('passport');
const session = require("express-session");

module.exports = function (app) {
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/account',
        failureRedirect: '/'
    }
    ));
    
    app.get('/account', isLoggedIn, authController.account);
    
    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/account',
        failureRedirect: '/'
    }
    ));



    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/account');
    }
}


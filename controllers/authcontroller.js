var exports = module.exports = {}
 
exports.signup = function(req, res) {
    console.log(req.user.username);
    res.render('account');
};

exports.signin = function(req, res) {
    res.render('account');
};

exports.account = function(req, res) {
    console.log("account working");
    res.render('account');
};

exports.logout = function (req, res, next) {
    // Get rid of the session token. Then call `logout`; it does no harm.
    req.logout();
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
        return res.send({ authenticated: req.isAuthenticated() });
    });
  };


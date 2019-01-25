var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('account');
};

exports.signin = function(req, res) {
    res.render('account');
};

exports.account = function(req, res) {
    res.render('account');
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
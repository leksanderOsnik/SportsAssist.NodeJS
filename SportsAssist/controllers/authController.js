const passport = require('passport');

exports.getLoginPage = (req, res) => { 
    res.render('login.hbs', { title: 'Login', cybersecurity:`${req.csrfToken()}`})
};

//authtentication of the login details
exports.login = passport.authenticate('local',
 {
  failureRedirect: '/login',
  failureFlash: 'Email/Password Invalid!',
  successRedirect: '/teams',
});

//log out redirect to homepage
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

//check to see if user is logged in
exports.isLoggedIn = (req, res, next) => {

  if (req.isAuthenticated()) {
    next();
    return;
  }
  //if not logged in redirect to login
  res.redirect('/login');
};

//check to see if user is not logged in
exports.notLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    next();
    return;
  }
  //if logged in redirect to teams
  res.redirect('/teams');
};


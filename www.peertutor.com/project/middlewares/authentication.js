const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').users;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
},
  (em, pw, done) => {
    User.findOne({
      where:{ email: em },
    }).then((user) => {
      if (user) {
        if (passwordsMatch(pw, user.password) === false) {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } else if (user == null) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      return done(null, user, { message: 'Successfully Logged In!' });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

//passport.deserializeUser((id, done) => {
//  User.findById(email).then((user) => {
//    if (user == null) {
//      return done(null, false);
//    }
//
//    return done(null, user);
//  });
//});

passport.deserializeUser((email, done) => {
  User.findOne({
      where: {
          email: email
      }
  }).then((user) => {
    if (user == null) {
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.redirectIfLoggedIn = (route) =>
  (req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
  (req, res, next) => (req.user ? next() : res.redirect(route));

module.exports = passport;

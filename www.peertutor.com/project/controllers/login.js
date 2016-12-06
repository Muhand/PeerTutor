const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifLoggedIn('/dashboard'), this.index);
    router.post('/', this.login);

    return router;
  },
  index(req, res) {
      res.render('login');           //If not logged in then just redirect to the homepage.
  },
  login(req, res) { 
      console.log('login entered');
      passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
    })(req, res);
  },
};

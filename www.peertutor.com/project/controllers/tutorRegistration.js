const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/',  Redirect.ifNotLoggedIn(), this.index);
    router.get('/profileSignUp', Redirect.ifNotLoggedIn(), this.signup);
      
    return router;
  },
  index(req, res) {
      res.render('tutorRegistration');
  },
  signup(req, res){
      res.render('tutorRegistration/profileSignUp');
  },
};

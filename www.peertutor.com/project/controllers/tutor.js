const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/',  Redirect.ifNotLoggedIn(), this.index);

    return router;
  },
  index(req, res) {
      if(res.locals.cur_user.isTutor === false)
          res.redirect('/tutorRegistration');
      else
          res.render('tutor/dashboard');
  },
};

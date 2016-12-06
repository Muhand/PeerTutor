const express = require('express');
const Redirect = require('../middlewares/redirect');
const models = require('../models');

module.exports = {
  registerRouter() {
      const router = express.Router();

      router.get('/', Redirect.ifNotLoggedIn(), this.index);
      router.get('/:subjectname/:subjectid', Redirect.ifNotLoggedIn(), this.subject);
      return router;
  },
    index(req, res) {
        res.redirect('/dashboard');
    },
    subject(req, res) {
        console.log(req.params.subjectname);
        console.log(req.params.subjectid);
      res.render('subject', {
          user: req.user,
          subject: req.subject,
          school: req.school,
          success: req.flash('success'),
      });
  },
};
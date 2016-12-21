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
        
//        http://192.168.33.10:8080/subject/English/2/schools/csi/
      res.render('subject', {
          contentURL: 'schools/csi/tutoringCenterRules/index.pdf',
          success: req.flash('success'),
      });
  },
};
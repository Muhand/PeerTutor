const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    //res.render('sign-up');
      //res.send('error');
      res.redirect('/');
  },
  submit(req, res) {
      models.users.create({
          firstname: req.body.fname,
          lastname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
//          school: req.body.school.selectedIndex
          school: req.body.selected_school,
          
      }).then((user) => {
          res.render('homepage', {signup_success: true, SignUpResultMessage: "Your registration was successful!"});
      }).catch(() => {
          //res.render('sign-up');
          res.render('homepage', {signup_failed: true, SignUpResultMessage: "Error, this email already exists."});
      });
  },
};

const express = require('express');
const Redirect = require('../middlewares/redirect');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);

    return router;
  },
  index(req, res) {
      var subjects = [];
      models.subject.findAll().then(function(subject){
          subject.forEach(function(item){
              if(res.locals.cur_user.school == item.schoolid){
                  subjects.push(item);
              }
          });
      });
      
      res.render('dashboard', {
          user: req.user, 
          success: req.flash('success'),
          subject: subjects
      });
  },
};
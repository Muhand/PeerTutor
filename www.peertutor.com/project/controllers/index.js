const express = require('express');
const fs = require('fs');
const path = require('path');
const models = require('../models');

const router = express.Router();
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });


router.get('/', (req, res) => {
  var schools = [];
  models.schools.findAll().then(function(school){
      school.forEach(function(item){
          schools.push(item.schoolname);
      });
      
  });
    if(res.locals.cur_user){
        res.redirect('/dashboard');
    }
    else{
        res.render('homepage', {school: schools});
    }
});

module.exports = router;
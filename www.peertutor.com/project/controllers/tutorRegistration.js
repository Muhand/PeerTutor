const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');
const models = require('../models');

var subjects = [];
var errors = [];
var days = [];
var months = [];
var years = [];

module.exports = {
  registerRouter() {
    const router = express.Router();
    
    router.get('/',  Redirect.ifNotLoggedIn(), this.index);
    router.get('/profileSignUp', Redirect.ifNotLoggedIn(), this.error);
    router.post('/profileSignUp', Redirect.ifNotLoggedIn(), this.signupProfile);
    router.post('/profileSignUp/register', Redirect.ifNotLoggedIn(), this.signup);
    
    return router;
  },
  index(req, res) {
      res.render('tutorRegistration');
  },
  signupProfile(req, res){
      init(res);
      
      res.render('tutorRegistration/profileSignUp',{
          day:days,
          month:months,
          year:years,
          subject: subjects,
          error: errors
      });
  },
  signup(req, res){
      dobm = req.body.dobm;
      dobd = req.body.dobd;
      doby = req.body.doby;
      var dob = dobm + '/' + dobd + '/'+ doby;
      var ssn = req.body.ssn;
      var cgrade = req.body.cgrade;
      var empid = req.body.empid;
      var ts = req.body.teachSubjectList;
      var cer = req.body.iscertified;
      var pw = req.body.password;
      var iscer;
      if(cer == "Yes")
          iscer = true;
      else
          iscer = false;
      //Validate form
      if(isNaN(dobm) || isNaN(dobd) || isNaN(doby)){
          errors.push("Please indicate a valid date of birth.");
          res.render('tutorRegistration/profileSignUp',{
              day:days,
              month:months,
              year:years,
              subject: subjects,
              error: errors
          });
      } else {
          models.tutors.create({
              userid: res.locals.cur_user.id,
              dob: dob,
              ssn: ssn,
              collegegrade: cgrade,
              emplid: empid,
              certifiedtutor: iscer
          }).then((user) => {
              req.user.update({
                  password: pw,
                  isTutor: true
              }, {
                  where:{
                      id: req.user.id,
                      email: req.user.email,
                      school: req.user.school
                  }
              });
              res.render('tutor/dashboard', {signup_success: true, SignUpResultMessage: "Your registration was successful!"});
          }).catch(() => {
              //res.render('sign-up');
              res.render('tutorRegistration/profileSignUp', {signup_failed: true, SignUpResultMessage: "Error, this EMPLID already exists."});
          });
      }
  },
  error(req, res){
      res.redirect('/tutorRegistration');
  },
};

function init(res)
{
    //Clear the arrays
    subjects = [];
    errors = [];
    days = [];
    months = [];
    years = [];
    
    //Load the data
    loadSubjects(res);
    loadDays();
    loadMonths();
    loadYears();
}
function loadSubjects(res)
{
    models.subject.findAll().then(function(subject){
        subject.forEach(function(item){
            if(res.locals.cur_user.school == item.schoolid){
                subjects.push(item);
            }
        });
    });
}
function loadDays()
{
    for(var i = 0; i < 31; i++){
        days[i] = i+1;
    }
}
function loadMonths()
{
    for(var i = 0; i < 12; i++) {
        months[i] = i+1;
    }
}
function loadYears()
{
    for(var i = 1900; i < 2016; i++) {
        years[i] = i+1;
    }
}

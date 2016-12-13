'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var tutors = sequelize.define('tutors', {
    userid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    dob:{
        type:Sequelize.STRING,
        allowNull: false
    }, 
    ssn:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    }, 
    collegegrade:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    emplid: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    certifiedtutor: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tutors;
};
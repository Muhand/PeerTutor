'use strict';
module.exports = function(sequelize, DataTypes) {
  var subject = sequelize.define('subject', {
    subjectname: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    schoolid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return subject;
};
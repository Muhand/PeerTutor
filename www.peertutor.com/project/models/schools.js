'use strict';
module.exports = function(sequelize, DataTypes) {
  var schools = sequelize.define('schools', {
    schoolname: DataTypes.STRING,
    contactEmail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
    
  return schools;
};
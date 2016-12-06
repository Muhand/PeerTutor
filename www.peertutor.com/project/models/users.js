'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    firstname:DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: DataTypes.STRING,
    school: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model: "schools",
            key: "id"
        }
    },
    profileImage: {
        type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
    
    User.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
            resolve(hashedPassword);
        });
    }).then((hashedPw) => {
        user.password = hashedPw;
    })
    );
  return User;
};
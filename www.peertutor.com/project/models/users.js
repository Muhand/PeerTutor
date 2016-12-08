'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstname:DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    },
    aboutMe: {
        type: Sequelize.TEXT
    }
  }, {
//    classMethods: {
//      associate: function(models) {
//        // associations can be defined here
//      }
//    },
//      hooks: {
//          beforeUpdate: function() {
//              console.log("UPDATED");
//          }
//      }
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

    User.beforeUpdate((user) =>
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
//  var User = sequelize.define('users', {
//    firstname:DataTypes.STRING,
//    lastname: DataTypes.STRING,
//    email: {
//        type: Sequelize.STRING,
//        allowNull: false,
//        primaryKey: true,
//    },
//    password: DataTypes.STRING,
//    school: {
//        type: Sequelize.INTEGER,
//        allowNull: false,
//        primaryKey: true,
//        references:{
//            model: "schools",
//            key: "id"
//        }
//    },
//    profileImage: {
//        type: Sequelize.STRING
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
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
        type: Sequelize.STRING,
        defaultValue: 'img/profile.png'
      },
        isTutor:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
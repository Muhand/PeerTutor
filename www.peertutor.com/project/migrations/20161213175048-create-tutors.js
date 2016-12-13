'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tutors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
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
    return queryInterface.dropTable('tutors');
    }
};
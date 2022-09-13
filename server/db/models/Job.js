const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const { STRING, INTEGER, TEXT } = require('sequelize')
const User = require('./User')

const Job = db.define('job', {
  DepartmentName: {
    type: Sequelize.STRING,
  },
  JobTitle: {
    type: Sequelize.STRING,
  },
  OrganizationName: {
    type: Sequelize.STRING,
  },
  DrugTestRequired: {
    type: Sequelize.STRING,
  },
  TeleworkEligible: {
    type: Sequelize.STRING,
  },
  HighGrade: {
    type: Sequelize.INTEGER,
  },
  PositionURI: {
    type: Sequelize.STRING,
  },
  jobSummary: {
    type: Sequelize.TEXT,
    
  },
  contactEmail: {
    type: Sequelize.STRING,
  },
  whatToExpect: {
    type: Sequelize.STRING,
  },
  majorDuties: {
    type: Sequelize.STRING,
  },
  keyRequirements: {
    type: Sequelize.STRING,
  }
})

Job.belongsTo(User)

module.exports = Job

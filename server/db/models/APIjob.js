const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const { STRING, INTEGER, TEXT, JSON } = require('sequelize')
const User = require('./User')

const APIjob = db.define('apijob', {
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
    type: Sequelize.TEXT(2500),
    
  },
  min: {
    type: Sequelize.INTEGER
  },
  city: {
    type: Sequelize.STRING
  },
  max: {
    type: Sequelize.INTEGER
  },
  contactEmail: {
    type: Sequelize.STRING,
  },
  whatToExpect: {
    type: Sequelize.STRING(2500),
  },
  majorDuties: {
    type: Sequelize.STRING(6000),
  },
  keyRequirements: {
    type: Sequelize.JSON,
  },
  start: {
    type: Sequelize.STRING
  },
  end: {
    type: Sequelize.STRING
  }
})

module.exports = APIjob

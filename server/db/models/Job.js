const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const { STRING, INTEGER, TEXT } = require('sequelize')
const User = require('./User')

const Job = db.define('job', {
    jobId: {
      type: INTEGER
    }
})

Job.belongsTo(User)

module.exports = Job

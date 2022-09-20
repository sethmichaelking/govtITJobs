//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Job = require('./models/Job')
const APIjob = require('./models/APIjob')


//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Job,
    APIjob
  },
}

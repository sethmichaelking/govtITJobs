'use strict'

const {db, models: {User} } = require('../server/db')
const APIjob = require('../server/db/models/APIjob')
const fetch = require('node-fetch');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
  
  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  var host = 'data.usajobs.gov'; 
  var userAgent = 'sethkingriter@gmail.com'
  var authKey = 'InzNEWOLXdrBHP/62f3tqX6pOhSGmFDaTdHOB9zEmbg=' 

  for (let i = 1; i <= 2; i++){
    const response = await fetch(`https://data.usajobs.gov/api/search?Keyword=Software&ResultsPerPage=500&Page=${i}`, {
      method: 'GET',      
      headers: {          
          "Host": host,          
          "User-Agent": userAgent,          
          "Authorization-Key": authKey      
        }  
      }
    )
    .then(response => response.json())
    .then(data => {
      const jobs = data.SearchResult.SearchResultItems
      for (let job of jobs){
        APIjob.create({ 
          start: job.MatchedObjectDescriptor.PositionStartDate,
          end: job.MatchedObjectDescriptor.PositionEndDate,
          DepartmentName: job.MatchedObjectDescriptor.DepartmentName,
          JobTitle: job.MatchedObjectDescriptor.PositionTitle,
          OrganizationName: job.MatchedObjectDescriptor.OrganizationName,
          DrugTestRequired: job.MatchedObjectDescriptor.UserArea.Details.DrugTestRequired,
          TeleworkEligible: job.MatchedObjectDescriptor.UserArea.Details.TeleworkEligible,
          HighGrade:  !isNaN(job.MatchedObjectDescriptor.UserArea.Details.HighGrade) ?  job.MatchedObjectDescriptor.UserArea.Details.HighGrade * 1 : 0,
          PositionURI: job.MatchedObjectDescriptor.PositionURI,
          min: parseInt(job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange),
          max: parseInt(job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1),
          city: job.MatchedObjectDescriptor.PositionLocation[0].CityName,
          jobSummary: job.MatchedObjectDescriptor.UserArea.Details.JobSummary,
          contactEmail: job.MatchedObjectDescriptor.UserArea.Details.AgencyContactEmail,
          whatToExpect: job.MatchedObjectDescriptor.UserArea.Details.WhatToExpectNext,
          majorDuties: job.MatchedObjectDescriptor.UserArea.Details.MajorDuties[0],
          keyRequirements: job.MatchedObjectDescriptor.UserArea.Details.KeyRequirements,
         })
      }
    })
  }
console.log('all the jobs are seeded')
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

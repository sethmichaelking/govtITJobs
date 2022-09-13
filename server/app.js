const path = require('path')
const express = require('express')
const morgan = require('morgan')
const Job = require('./db/models/Job')
const app = express()

module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

//body parser
var bodyParser = require('body-parser')

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.post('/savejob', async (req, res) => {
  try {
    const job = await Job.create(req.body)
    res.send(job)
  }
  catch(err){
    console.log(err)
  }
})

app.delete('/jobs/:id', async (req, res)=> {
  try{
    console.log('id', req.params.id)
    const job = await Job.findByPk(req.params.id)
    await job.destroy()
    res.sendStatus(204)
  }
  catch(err){
    console.log(err)
  }
})

app.get('/jobs/', async(req, res) => {
  try {
    const jobs = await Job.findAll()
    res.send(jobs)
  }
  catch(err){
    console.log(err)
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

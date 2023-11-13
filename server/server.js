const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// const PORT = 3000
const PORT = 4000
// Changed to 4000 for testing purposes

const cors = require('cors')
app.use(cors({ origin: '*' }))

app.use(express.static('build'))
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

const {
  getProfile,
  createProfile
} = require('./controllers/profile-controller')

const { getRuns, postRun } = require('./controllers/run-controller')

app.use('/profile', getProfile, createProfile, getRuns, (req, res) => {
  return res.status(200).json(res.locals.profile)
})

app.post('/run', postRun, (req, res) => {
  console.log('hitting middleware...')
  return res.status(200).json(res.locals.postedRun)
})

// 404 bad req error handler
app.use('*', (req, res) => {
  return res.status(404).json({
    response: 'yikes, that is no bueno'
  })
})
// Global/catch-all error handler
app.use((err, req, res, next) => {
  return res.status(err.status).send(err.update)
})

app.listen(PORT, console.log(`listening on port: ${PORT}`))

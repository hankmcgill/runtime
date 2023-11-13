const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000
// const PORT = 4000
// Changed to 4000 for testing purposes

const cors = require('cors')
app.use(cors({ origin: '*' }))

const { getProfile, createProfile } = require('./controllers/pg-controller')
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())

app.use('/profile', getProfile, createProfile, (req, res) => {
  return res.status(200).json(res.locals.profile)
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

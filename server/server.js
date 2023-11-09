const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const { getProfile, createProfile } = require('./controllers/pg-controller')
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())

app.get('/profile', getProfile, createProfile, (req, res) => {
  return res.status(200).json(res.locals.profile)
})

// 404 bad req error handler
app.use('*', (req, res) => {
  return res.status(404).send('yikes, that is no bueno')
})
// Global/catch-all error handler
app.use((err, req, res, next) => {
  return res.status(err.status).send(err.update)
})

app.listen(PORT, console.log(`listening on port: ${PORT}`))

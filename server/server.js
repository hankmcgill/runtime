const express = require('express')
const URL = require('url')
const bodyParser = require('body-parser')
const app = express()
// const PORT = 4000
const PORT = 3000
// Changed to 4000 for testing purposes
const cors = require('cors')
app.use(
  cors({
    origin: '*'
  })
)

const { getProfile, createProfile } = require('./controllers/pg-controller')
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())

// app.use('/test', (req, res) => {
//   return res.status(200).send({
//     cognito_pool_id: '7000',
//     username: 'hankold'
//   })
// })

app.get('/profile', (req, res) => {
  console.log('id: ', req.query.cognitoId)

  return res.status(200).send({
    response: 'returned'
  })
})

// app.post('/profile', getProfile, createProfile, (req, res) => {
//   return res.status(200).json(res.locals.profile)
// })

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

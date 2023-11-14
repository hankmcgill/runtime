require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.REACT_APP_TOKEN
})
client.connect()

module.exports = {
  getRuns: async (req, res, next) => {
    console.log('checking for existing runs...')
    if (!req.query.cognitoId) {
      console.log('invalid path')
      return next({ status: 500, update: 'err occurred getting profile' })
    }
    const text = 'SELECT * FROM Run WHERE cognito_pool_id = $1;'
    const values = [req.query.cognitoId]
    try {
      const result = await client.query(text, values)
      if (result.rowCount > 0) {
        res.locals.profile.runs = result.rows
      } else {
        console.log('no results found - new user')
      }
      return next()
    } catch (err) {
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  },

  postRun: async (req, res, next) => {
    console.log('body: ', req.body)
    console.log('dist in body: ', req.body.distance_in_miles)

    if (!req.query.cognitoId) {
      console.log('failing to hitting path')
      return next({ status: 500, update: 'err occurred getting profile' })
    }

    const text = `INSERT INTO Run (cognito_pool_id, distance_in_miles, time_in_seconds, shoe_model, treadmill, difficulty, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    const values = [
      '662aa3cc-ce45-40c5-a390-15daccca89e5',
      req.body.distance_in_miles,
      req.body.time_in_seconds,
      req.body.shoe_model,
      req.body.treadmill,
      req.body.difficulty,
      req.body.notes
    ]
    console.log('creating new entry in DB...')
    try {
      const result = await client.query(text, values)
      res.locals.postedRun = result.rows[0]
      console.log('new run posted & returned')
      return next()
    } catch (err) {
      console.log('ERROR in creation of run')
      return next({ status: 500, update: 'err occurred posting run' })
    }
  },

  deleteRun: async (req, res, next) => {
    console.log('id: ', req.query.runId)

    if (!req.query.cognitoId) {
      console.log('failing to hitting path')
      return next({ status: 500, update: 'err occurred getting profile' })
    }

    const text = `DELETE FROM Run WHERE id=($1) RETURNING *;`
    const values = [req.query.runId]
    console.log('deleting entry in DB...')
    try {
      const result = await client.query(text, values)
      res.locals.postedRun = result.rows[0]
      console.log('run deleted')
      return next()
    } catch (err) {
      console.log('ERROR in deletion of run')
      return next({ status: 500, update: 'err occurred deleting run' })
    }
  }
}

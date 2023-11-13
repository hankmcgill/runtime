require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.REACT_APP_TOKEN
})
client.connect()

module.exports = {
  getProfile: async (req, res, next) => {
    console.log('req', req.body.cognito_pool_id)

    const text = 'SELECT * FROM Profile WHERE cognito_pool_id = $1;'
    // const values = [req.body.cognito_pool_id]
    const values = [req.body.cognito_pool_id]
    console.log('querying DB...')

    try {
      const result = await client.query(text, values)
      console.log('result:', result.rowCount)

      if (result.rowCount > 0) {
        // if profile exists, get values
        res.locals.profile = result.rows[0]
      } else {
        console.log('no results found - new user')
      }
      return next()
    } catch (err) {
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  },

  createProfile: async (req, res, next) => {
    if (res.locals.profile) return next()

    const text =
      'INSERT INTO Profile (cognito_pool_id, username) VALUES ($1, $2) RETURNING *;'
    const values = [req.body.cognito_pool_id, req.body.username]
    console.log('querying DB...')

    try {
      const result = await client.query(text, values)
      console.log('result:', result.rows[0])

      if (result.rowCount > 0) {
        // if profile exists, get values
        res.locals.profile = result.rows[0]
      } else {
        console.log('new user created & returned')
      }
      return next()
    } catch (err) {
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  }
}

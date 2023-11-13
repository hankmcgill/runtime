require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.REACT_APP_TOKEN
})
client.connect()

module.exports = {
  getProfile: async (req, res, next) => {
    // console.log('checking for existing profile...')

    if (!req.query.cognitoId) {
      console.log('invalid path')
      return
    }

    const text = 'SELECT * FROM Profile WHERE cognito_pool_id = $1;'
    const values = [req.query.cognitoId]

    try {
      const result = await client.query(text, values)

      if (result.rowCount > 0) {
        res.locals.profile = result.rows[0]
      } else {
        // console.log('no results found - new user')
      }
      return next()
    } catch (err) {
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  },

  createProfile: async (req, res, next) => {
    if (!req.query.cognitoId) return
    if (res.locals.profile) return next()

    const text = `INSERT INTO Profile (cognito_pool_id, username) VALUES ($1, $2) RETURNING *;`
    const values = [req.query.cognitoId, req.query.username]
    // console.log('creating new entry in DB...')

    try {
      const result = await client.query(text, values)
      res.locals.profile = result.rows[0]
      // console.log('new user created & returned')
      return next()
    } catch (err) {
      console.log('ERROR in creation of user: ', req.query.username)
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  }
}

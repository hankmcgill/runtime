require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.REACT_APP_TOKEN
})
client.connect()

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const result = await client.query('SELECT * FROM Profile')
      res.locals.profile = result.rows
      return next()
    } catch (err) {
      // console.log('data', data.rows[0])
      // res.locals.profile = data.rows[0]
      return next({ status: 500, update: 'err occurred getting profile' })
    }
  }
}

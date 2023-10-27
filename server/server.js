const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

app.use(express.static("build"));

app.use('/test', (req, res) => {
    res.send("this is a new test")
  })

app.listen(PORT, console.log(`listening on port: ${PORT}`))
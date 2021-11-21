'use strict'

const express = require('express')
const app = express()
const fs = require('fs')
const hls = require('hls-server')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
// const session = require('express-session')

const PORT = 8080
const HOST = '0.0.0.0'
const corsOptions = {
  origin: 'http://localhost:8080'
}
app.engine('.hbs', engine({
  extname: '.hbs'
}
))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
// App
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cookieSession({
  name: 'session',
  keys: ['AuthToken']
}))

app.use(express.json())
require('./routes/user.routes')(app)
require('./routes/account.routes')(app)
require('./routes/authentication.routes')(app)
const server = app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

new hls(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split('.').pop()
      if (ext !== 'm3u8' && ext !== 'ts') {
        return cb(null, true)
      }
      fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
        if (err) {
          console.log('File not exist')
          return cb(null, false)
        }
        cb(null, true)
      })
    },
    getManifestStream: (req, cb) => {
      console.log('get Manifest Stream')
      const stream = fs.createReadStream(__dirname + req.url)
      cb(null, stream)
    },
    getSegmentStream: (req, cb) => {
      console.log('get segment stream')
      const stream = fs.createReadStream(__dirname + req.url)
      cb(null, stream)
    }
  }

})

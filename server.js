'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
 
 

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
  keys: ['AuthToken', 'userEmail', 'userName', ]
}))

app.use(express.json())
app.get('/', function (req, res) {
  res.redirect('videos')
})

require('./routes/user.routes')(app)
require('./routes/account.routes')(app)
require('./routes/authentication.routes')(app)
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

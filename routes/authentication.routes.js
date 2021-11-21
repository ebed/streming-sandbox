module.exports = app => {
  const authentication = require('../controllers/authentication.controller.js')

  const router = require('express').Router()

  router.post('/register', authentication.register)
  router.post('/signin', authentication.signin)
  router.get('/signup', authentication.signup)
  router.get('/login', authentication.login)
  router.get('/logout', authentication.logout)
  app.use('', router)
}

module.exports = app => {
  const account = require('../controllers/account.controller.js')
  const router = require('express').Router()

  const requireAuth = (req, res, next) => {
    if (req.session.AuthToken) {
      next()
    } else {
      res.render('login', {
        message: 'Please login to continue',
        messageClass: 'alert-danger'

      })
    }
  }

  router.get('/videos', requireAuth, account.videos)
  router.get('/player', requireAuth, account.player)
  router.get('/stream', requireAuth, account.stream)
  router.get('/estadisticas', requireAuth, account.estadistics)
  app.use('', router)
}

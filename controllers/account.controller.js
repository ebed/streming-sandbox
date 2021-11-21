const Videos = require('../models/videos.model')
const Carousel = require('../models/carousel.model.js')
exports.videos = (req, res, next) => {
  const ses = req.session

  console.log(ses.userEmail)
  Videos.list(' ', (err, result) => {
    if (err) {
      console.error('Error', err)
      res.render('error')
    } else {
      Carousel.list((err, carousels) => {
        if (err) {
          console.log(err)
          res.render('videos', { videos: result })
        } else {
          res.render('videos', { videos: result, carousels: carousels, ses: ses })
        }
      })
    }
  })
}

exports.estadistics = (req, res) => {
  res.render('estadistics')
}

exports.player = (req, res) => {
  const idVideo = req.query.id
  const ses = req.session
  Videos.find(idVideo, (err, result) => {
    if (err) {
      console.error('Error', err)
      res.render('error')
    } else {
      console.log(result)
      res.render('player', { video: result, ses: ses })
    }
  })
}

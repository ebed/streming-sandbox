const Videos = require('../models/videos.model')
exports.videos = (req, res, next) => {
  Videos.list(' ', (err, result) => {
    if (err) {
      console.error('Error', err)
      res.render('error')
    } else {
      res.render('videos', { videos: result })
    }
  })
}

exports.estadistics = (req, res) => {
  res.render('estadistics')
}

exports.player = (req, res) => {
  const idVideo = req.query.id

  Videos.find(idVideo, (err, result) => {
    if (err) {
      console.error('Error', err)
      res.render('error')
    } else {
      console.log(result)
      res.render('player', { video: result })
    }
  })
}

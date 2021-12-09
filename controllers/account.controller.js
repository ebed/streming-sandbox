const fs = require('fs')

const Videos = require('../models/videos.model')
const currentPlaylist = require('../utils/playlist.js')

const Carousel = require('../models/carousel.model.js')
const { setFlagsFromString } = require('v8')
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
      const url =  'http://localhost:8085/stream?video_id=1&pos=1'
      res.render('player', { video: result, ses: ses, url: url })
    }
  })
}

exports.stream = (req, res) => {
  console.log('streaming')
  console.log(req.query)
   
  currentPlaylist(req.session.userEmail, req.query.video_id, '')
    .then((data) => {
      if (data) {
        console.log(data)
        res.send(data)
      } else {
        res.send('error')
      }
    })
   
   
 
}
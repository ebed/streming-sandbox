const VideoOptions = require('../models/videos_options.js')
const Session = require('../models/sessions.model')
const session = require('express-session')
const { get } = require('prompt')
 


const currentPlaylist = function (user, videoId, quality) {
  return new Promise((resolve, reject) => {
    getSession(user, videoId)
      .then((data) => {
        console.log(data)
        VideoOptions.list(videoId, quality, (err, result) => {
          if (err) {
            reject(err)
          }  
          console.log(result[0])
          const pos = getPosition(data.started)
          console.log(pos)
          resolve(generate(result[0], pos,  data.started))
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function  getSession(user, videoId) {
  return new Promise((resolve, reject) => {
    Session.find(user, videoId, (err, sesionData) => { 
      if (err) {
        reject(err)
      }
      if  (sesionData) {        
        console.log("SI HAY SESSION") 
        resolve(sesionData)
      } else {
        console.log("Crear session")
        resolve(generateSesion(user, videoId))
      }
    })
  })
}

function generateSesion(user, videoId) {
  return new Promise((resolve, reject) =>{
    const session = new Session({
      user_id: user,
      video_id: videoId,
      started: Date.now()
    })
    Session.create(session, (err, sessionCreated) => {
      if (err) {
        reject(err)
      } else {
          console.log("CHECK SESION")
          console.log(sessionCreated)
          resolve(sessionCreated)
        }
      })
  })
}


function generate(videoInfo, position, started) { 
  console.log(position)
  let m3u8 = header(videoInfo.segment_duration, position, started)
  m3u8 += segments(videoInfo.segment_duration, position, videoInfo.segment_name, videoInfo.segments)
  return m3u8
}
 
function header  (duration, position, started) {
  let head = '#EXTM3U\n#EXT-X-VERSION:7'
  head += '\n#EXT-X-TARGETDURATION:' + duration 
  head += '\n#EXT-X-MEDIA-SEQUENCE:' + position
  head += '\n#EXT-X-PROGRAM-DATE-TIME:'+started
  head += '\n' 

  return head
}


function segments  (duration, position, segmentName, q_segments) {
  console.log(q_segments)
  const segUnit = '#EXTINF:' + duration + '.000000,'
  let resultSegment = ''
  for (let i = 0; i < 3; i++) {
    const j = parseInt(position) + i
    if ( j <= q_segments) {
      resultSegment += segUnit + '\n' + '/rawvideos/' + segmentName + j + '.ts\n'
      if (j == q_segments) {
        resultSegment += '#EXT-X-ENDLIST'
      }
    }  
  }   
  return resultSegment
}


function getPosition(start_time) { 
  let temp_position = (Date.now() - parseInt(start_time))
  temp_position = ( (temp_position - (temp_position % 10000)) / 10000 ) +1
  console.log(temp_position)
  return temp_position
}
module.exports = currentPlaylist

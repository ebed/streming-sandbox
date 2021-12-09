const con = require('./database')

const VideoOptions = function (videoOptions) {
  this.id = videoOptions.id
  this.video_id = videoOptions.video_id
  this.quality = videoOptions.quality
  this.segments = videoOptions.segments
  this.segment_name = videoOptions.segment_name
  this.segment_duration = videoOptions.segment_duration
}

VideoOptions.create = (newOption, result) => {
  con.query('INSERT INTO video_options set ?', newOption, function (err, results) {
    if (err) {
      console.error('error creating Video Option', err)
      result(err, null)
      return
    }
    console.log('Nueva alteernativa de video creada')
    result(null, { id: result.id, newOption })
  })
}
VideoOptions.find = (id, result) => {
  const sql = 'select * from video_options where id = ' + id
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Video recuperado')
    result(null, res[0])
  })
}

VideoOptions.video_alternatives = (id, result) => {
  const sql = 'select * from video_options where video_id = ' + id
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Video recuperado')
    result(null, res[0])
  })
}
VideoOptions.list = (videoId, quality, result) => {
  let sql = 'select * from video_options'
  let where = ''

  if (videoId) {
    where = ' video_id = ' + videoId
  }
  if (quality) {
    if (where) {
      where += ' and '
    }
    where += ' quality = ' + quality
  }

  if (where) {
    sql = sql + ' where ' + where
  }
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Alternativad de Videos recuperados')
    result(null, res)
  })
}

module.exports = VideoOptions

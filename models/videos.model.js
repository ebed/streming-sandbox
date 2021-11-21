const con = require('./database')

const Video = function (video) {
  this.name = video.name
  this.filename = video.filename
  this.urlthumb = video.urlthumb
}

Video.create = (newVideo, result) => {
  con.query('INSERT INTO videos set ?', newVideo, function (error, results) {
    if (error) {
      console.error('error creating video', error)
      result(error, null)
      return
    }
    console.log('Video creado exitosamente')
    result(null, { id: result.id, newVideo })
  })
}
Video.find = (id, result) => {
  const sql = 'select * from videos where id = ' + id 
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Video recuperado', res[0])
    result(null, res[0])
  })
}

Video.list = (name, result) => {
  let sql = 'select * from videos'
  if (name) {
    sql += " WHERE lower(name) like '%" + name + "%'"
  }
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Videos recuperados', res)
    result(null, res)
  })
}

module.exports = Video

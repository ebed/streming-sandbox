const con = require('./database')

const Carousel = function (carousel) {
  this.title = carousel.title
  this.description = carousel.description
  this.image_url = carousel.image_url
}

Carousel.create = (newCarousel, result) => {
  con.query('INSERT INTO carousels set ?', newCarousel, function (error, results) {
    if (error) {
      console.error('error creating Carousel item', error)
      result(error, null)
      return
    }
    console.log('Carousel item creado exitosamente')
    result(null, { id: result.id, newCarousel })
  })
}
Carousel.find = (id, result) => {
  const sql = 'select * from carousels where id = ' + id
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Carousel recuperado')
    result(null, res[0])
  })
}

Carousel.list = (result) => {
  const sql = 'select * from carousels'
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Items carousels recuperados')
    result(null, res)
  })
}

module.exports = Carousel

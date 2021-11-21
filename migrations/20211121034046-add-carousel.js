'use strict'
const Carousel = require('../models/carousel.model.js')

let dbm
let type
let seed

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

const carousel1 = new Carousel({
  title: 'Primera serie propietaria de zapping',
  description: 'Nuestra primera serie, con las ultimas estrellas del cine internacional',
  image_url: 'https://as01.epimg.net/epik/imagenes/2020/05/27/portada/1590599587_464191_1590599652_noticia_normal_recorte1.jpg'
})

const carousel2 = new Carousel({
  title: 'Proximamente [Adult swim]  en Zapping',
  description: 'Quien dicee que los dibujos animados solo son para niños?',
  image_url: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/01/adult-swim-hbo-1849689.jpg?itok=vZ0CYIQN'
})

exports.up = function (db) {
  return db.createTable('carousels', {
    id: { type: 'integer', primaryKey: true, unique: true, autoIncrement: true },
    title: 'string',
    description: 'string',
    image_url: 'string'
  }).then(
    function (res) {
      Carousel.create(carousel1, (err, data) => {
        if (err) {
          console.error(err)
        }
        console.log(data)
      })
      Carousel.create(carousel2, (err, data) => {
        if (err) {
          console.error(err)
        }
        console.log(data)
      })
    },
    function (err) {
      console.log(err)
    })
}

exports.down = function (db) {
  return db.dropTable('carousels')
}

exports._meta = {
  version: 1
}

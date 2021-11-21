'use strict'
const Video = require('../models/videos.model.js')
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

const video = new Video({
  name: 'Big Buck Bunny',
  filename: 'segment.m3u8',
  urlthumb: 'http://1.bp.blogspot.com/-n5fY3dPI4NY/TnFmMdSDSRI/AAAAAAAAAI4/OQTVbDehERA/s1600/big+buck+bunny+cabecera.jpg',
  description: 'Big Buck Bunny es el segundo corto animado de Blender Fundation y el primer proyecto de BLENDER INSTITUTE una división de blender fundation la cual fue creada después de Elephants Dreams pues el proyecto fue muy grande y debían dividir desarrolladores de software y desarrolladores de proyectos open movie asi el proyecto empieza en octubre del 2007 y se estrena en Amsterdan el 10 de abril del 2008.'
})

exports.up = function (db) {
  return db.createTable('videos', {
    id: { type: 'integer', primaryKey: true, unique: true, autoIncrement: true },
    name: 'string',
    filename: { type: 'string', length: 255 },
    urlthumb: { type: 'string', length: 255 },
    description: { type: 'string', length: 1255 }
  }).then(
    function (result) {
      Video.create(video, (err, data) => {
        if (err) {
          console.error(err)
        }
        console.log(data)
      })
    },
    function (err) {
      console.log(err)
    }
  )
}

exports.down = function (db) {
  return db.dropTable('videos')
}

exports._meta = {
  version: 1
}

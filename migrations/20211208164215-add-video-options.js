'use strict'
const VideoOptions = require('../models/videos_options.js')

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

const videoOption = new VideoOptions({
  video_id: 1,
  quality: '1920x1080',
  segments: 63,
  segment_name: 'segment',
  segment_duration: 10
})

exports.up = function (db) {
  return db.createTable('video_options', {
    id: { type: 'int', primaryKey: true, unique: true, autoIncrement: true },
    video_id: { type: 'int' },
    quality: { type: 'string' },
    segments: { type: 'int' },
    segment_name: { type: 'string' },
    segment_duration: { type: 'int' }
  }).then(
    function (result) {
      VideoOptions.create(videoOption, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          console.log(data)
        }
      }
      )
    })
}

exports.down = function (db) {
  return db.dropTable('video_options')
}

exports._meta = {
  version: 1
}

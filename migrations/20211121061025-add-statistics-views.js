'use strict'

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

exports.up = function (db) {
  return db.createTable('statistics', {
    id: { type: 'integer', primaryKey: true, unique: true, autoIncrement: true },
    user_id: 'integer',
    video_id: 'integer',
    date: 'date'
  }
  )
}

exports.down = function (db) {
  return db.dropTable('statistics')
}

exports._meta = {
  version: 1
}

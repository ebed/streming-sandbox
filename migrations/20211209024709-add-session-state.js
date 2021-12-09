'use strict';
const Session = require('../models/sessions.model')
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


 
exports.up = function(db) {
  return db.createTable('sessions', {
    id: { type: 'int', primaryKey: true, unique: true, autoIncrement: true },
    video_id: { type: 'int' },
    user_id: { type: 'string' },
    started: { type: 'long' },
    segments: { type: 'int' }
  })
};

exports.down = function(db) {
  return db.dropTable('sessions')
};

exports._meta = {
  "version": 1
};

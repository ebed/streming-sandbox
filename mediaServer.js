const HLSServer = require('hlsServer')
const http = require('http')
const server = http.createServer()

const mediaServer = new HLSServer(server, {
  path: '/media',
  dir: 'media'
})

module.exports = mediaServer

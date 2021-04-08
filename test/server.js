var http = require('http')
var WebSocketServer = require('ws').Server;

var server = http.createServer()
var wss = new WebSocketServer({server: server})
server.listen('/tmp/civet-ipc.socket')
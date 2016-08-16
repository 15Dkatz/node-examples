'use strict';

let express = require('express');
let http = require('http');

let socket = require('./routes/socket.js');

let app = express();
let server = http.createServer(app);

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorhandler({dumpExceptions: true, showStack: true}));
}

// Socket.io
let io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

// Starting the server
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
})

module.exports = app;

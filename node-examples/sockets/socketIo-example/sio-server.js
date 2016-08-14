let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(3000);
// invoking the socket.io funciton by passing the http server
let io = require('socket.io')(server);

app.use(express.static('./public'));

io.on('connection', (socket) => {

  socket.on('chat', message => {
    socket.broadcast.emit('message', message);
  })

  socket.emit('message', 'Welcome to Cyber Chat');
});

console.log('Starting a Socket App - http://localhost:3000');

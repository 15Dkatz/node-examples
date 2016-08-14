let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 3000});

// socket.io falls back to long-polling when sockets aren't supported by the browser

wss.on('connection', ws => {
  ws.on('message', message => {
    if (message === 'exit') {
      ws.close();
    } else {

      wss.clients.forEach(client => {
        client.send(message);
      })
    }
  })
  ws.send('Welcome to cyber chat');
})

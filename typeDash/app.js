const http = require('http');
const express = require('express');

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}));
app.use(require('webpack-hot-middleware')(compiler));

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

const server = new http.Server(app);

// Socket.io
const socket = require('./routes/socket.js');
const io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')} in ${app.get('env')} mode`);
})

module.exports = app;

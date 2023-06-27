const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.json());

const expressServer = app.listen(4318, () => console.log('listening...'));
const io = socketio(expressServer);
let socketId;

app.post('/v1/traces', (req, res) => {
  io.to(socketId).emit('interaction', {data: req.body})
  res.sendStatus(200);
})

io.on('connection', (socket) => {

  console.log('socket.io connection successful');

  socket.on('socketId', (data) => {
    socketId = data.data;
    console.log(socketId);
  });
});
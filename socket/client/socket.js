const socket = io('http://localhost:44222');

socket.on('connect', () => {
  socket.emit('socketId', {data: socket.id})
  console.log('new connection: ', `id ${socket.id}: `, socket);
});

socket.on('interaction', (data) => {
  console.log(data);
});
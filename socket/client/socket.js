const socket = io('http://localhost:4318');

socket.on('connect', () => {
  socket.emit('socketId', {data: socket.id})
});

socket.on('interaction', (data) => {
  console.log(data);
});
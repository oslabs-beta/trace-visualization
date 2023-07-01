const socket = io('http://localhost:44222');
let socketId;

socket.on('connect', () => {
  socketId = socket.id;
  socket.emit('socketId', {data: socket.id});
  console.log('new connection: ', `id ${socket.id}: `, socket);
});

socket.on('interaction', (data) => {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log(`id ${socketId} disconnected`);
})
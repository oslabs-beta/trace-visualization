import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:12720');

export default socket;

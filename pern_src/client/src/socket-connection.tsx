import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:44222');

export default socket;

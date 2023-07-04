import React, { useEffect, useState } from 'react';
import './App.css';
import Webview from './Webview';
import socket from './socket-connection';

function App() {

	const [socketId, setSocketId] = useState('');
	const [stackData, setStackData] = useState({});

	useEffect(()=> {
		socket.on('connect', () => {
			setSocketId(socket.id);
			socket.emit('socketId', {data: socket.id});
			console.log('new connection: ', `id ${socket.id}: `, socket);
		});
		
		socket.on('interaction', (data) => {
			setStackData(data);
		});
	
		socket.on('disconnect', () => {
			console.log(`id ${socketId} disconnected`);
		})
	},[]);


	return (
		<div className="webview">
			<h1>{JSON.stringify(stackData)}</h1>
			<Webview />
		</div>
	);
}

export default App;

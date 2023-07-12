import React, { useEffect, useState } from 'react';
import './App.css';
import Webview from '../src/pages/Webview';
import socket from './socket-connection';
import { Box, Typography } from '@mui/material';

interface DataObject {
	executionTime: string;
	httpMethod: string;
	requestPayload: string;
	responseData: string;
	route: string;
	sqlQuery: string;
	statusCode: string;
}

function App() {
	const [socketId, setSocketId] = useState('');
	const [allData, setAllData] = useState([]);
	const [stackData, setStackData] = useState<DataObject>({
		executionTime: '',
		httpMethod: '',
		requestPayload: '',
		responseData: '',
		route: '',
		sqlQuery: '',
		statusCode: '',
	});

	useEffect(() => {
		socket.on('connect', () => {
			setSocketId(socket.id);
			socket.emit('socketId', { data: socket.id });
			console.log('new connection: ', `id ${socket.id}: `, socket);
		});

		socket.on('interaction', (data) => {
			setStackData(data);
		});

		socket.on('disconnect', () => {
			console.log(`id ${socketId} disconnected`);
		});
	}, [socketId, stackData]);

	return (
		<>
			<Box sx={{ background: '#D7DADB' }}>
				<div className="webview">
					<Webview stackData={stackData} />
				</div>
			</Box>
		</>
	);
}

export default App;

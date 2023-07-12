import React, { useEffect, useState } from 'react';
import './App.css';
import Webview from '../src/pages/Webview';
import socket from './socket-connection';
import { Box, Typography } from '@mui/material';
import { DataObject } from './Types';

function App() {
	const [socketId, setSocketId] = useState('');
	const [allData, setAllData] = useState([]);
	const [stackData, setStackData] = useState<DataObject>({
		data: {
			executionTime: '',
			httpMethod: '',
			requestPayload: undefined,
			responseData: undefined,
			route: '',
			sqlQuery: '',
			statusCode: undefined,
		},
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
			<Box sx={{ background: '#EEEEEE', maxWidth: 'auto' }}>
				<div className="webview">
					<Webview stackData={stackData} />
				</div>
			</Box>
		</>
	);
}

export default App;

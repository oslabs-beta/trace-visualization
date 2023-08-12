import React, { useEffect, useState } from 'react';
import './App.css';
import Webview from '../src/pages/Webview';
import socket from './socket-connection';
import { Box } from '@mui/material';
import { DataObject } from './Types';

function App() {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'short',
	};
	const date = new Date().toLocaleString('en-US', options);

	const [socketId, setSocketId] = useState('');
	const [allData, setAllData] = useState<DataObject[]>([]);
	const [stackData, setStackData] = useState<DataObject>({
		data: {
			executionTime: '',
			httpMethod: '',
			requestPayload: undefined,
			responseData: undefined,
			route: '',
			sqlQuery: '',
			statusCode: undefined,
			date: date,
		},
	});

	useEffect(() => {
		socket.on('connect', () => {
			setSocketId(socket.id);
			socket.emit('socketId', { data: socket.id });
			console.log('New Connection: ', `Id ${socket.id}: `, socket);
		});

		socket.on('interaction', (data) => {
			setStackData({ data: { ...data.data, date: date } });
			setAllData([...allData, { data: { ...data.data, date: date } }]);
		});

		socket.on('disconnect', () => {
			console.log(`Id ${socketId} disconnected`);
		});
	}, [socketId, stackData, allData, date]);

	return (
		<>
			<Box sx={{ background: '#EEEEEE', maxWidth: 'auto' }}>
				<div className="webview">
					<Webview stackData={stackData} allData={allData} />
				</div>
			</Box>
		</>
	);
}

export default App;

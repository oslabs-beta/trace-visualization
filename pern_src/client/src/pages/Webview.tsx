import React from 'react';
import Diagram from '../Diagram';
import Dashboard from '../Dashboard';
import { Box, Typography } from '@mui/material';

interface Props {
	stackData: Object;
}

const Webview = ({ stackData }: Props) => {
	return (
		<>
			<Box sx={{ background: '#D7DADB' }}>
				<Diagram stackData={stackData} />
				<Dashboard stackData={stackData} />
			</Box>
		</>
	);
};

export default Webview;

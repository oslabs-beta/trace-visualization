import React from 'react';
import Diagram from '../Diagram';
import Dashboard from '../Dashboard';
import { Box, Typography } from '@mui/material';
import { DataObject } from '../Types';

interface Props {
	stackData: DataObject;
}

const Webview = ({ stackData }: Props) => {
	return (
		<>
			<Box sx={{ background: '#EEEEEE', maxWidth: 'auto' }}>
				<Diagram stackData={stackData} />
				<Dashboard stackData={stackData} />
			</Box>
		</>
	);
};

export default Webview;

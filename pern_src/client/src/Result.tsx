import React from 'react';
import { Typography, Box } from '@mui/material';

interface Props {
	stackData: Object;
}
const Result = ({ stackData }: Props) => {
	const stringify = JSON.stringify(stackData);
	console.log(stackData);
	return (
		<>
			<Box sx={{ overflowWrap: 'break-word' }}>
				<Typography variant="body1">{stringify}</Typography>
			</Box>
		</>
	);
};

export default Result;

import React from 'react';
import { Typography, Box } from '@mui/material';
import { DataObject } from './Types';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

interface Props {
	stackData: DataObject;
}
const Result = ({ stackData }: Props) => {
	const stackDataArray = Object.entries(stackData);
	const keyValue = Object.entries(stackDataArray[0][1]);

	return (
		<>
			<TableContainer sx={{ maxHeight: '43vh', maxWidth: 'auto', overflow: 'auto' }} component={Paper}>
				<Table stickyHeader sx={{ minWidth: 650 }} size="medium">
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '200px', fontWeight: 'bold' }} align="left">
								Metrics
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }} align="left">
								Data
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								Request Payload
							</TableCell>
							<TableCell component="th" scope="row">
								{JSON.stringify(stackData.data.requestPayload)}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								HTTP Method
							</TableCell>
							<TableCell component="th" scope="row">
								{stackData.data.httpMethod}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								Route
							</TableCell>
							<TableCell component="th" scope="row">
								{stackData.data.route}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								SQL Query
							</TableCell>
							<TableCell component="th" scope="row">
								{stackData.data.sqlQuery}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								Response Data
							</TableCell>
							<TableCell component="th" scope="row">
								{JSON.stringify(stackData.data.responseData)}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								Status Code
							</TableCell>
							<TableCell component="th" scope="row">
								{stackData.data.statusCode}
							</TableCell>
						</TableRow>
						<TableRow sx={{ border: 0 }}>
							<TableCell component="th" scope="row">
								Execution Time
							</TableCell>
							<TableCell component="th" scope="row">
								{stackData.data.executionTime}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Result;

/*
<TableRow>
							<TableCell>{JSON.stringify(stackData.data.requestPayload)}</TableCell>
						</TableRow>
						<TableCell>{stackData.data.httpMethod}</TableCell>
						<TableCell>{stackData.data.route}</TableCell>
						<TableCell>{stackData.data.sqlQuery}</TableCell>
						<TableCell>{JSON.stringify(stackData.data.responseData)}</TableCell>
						<TableCell>{stackData.data.statusCode}</TableCell>
						<TableCell>{stackData.data.executionTime}</TableCell>
*/
/* <Box sx={{ overflowWrap: 'break-word' }}>
<TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Metrics</TableCell>
        <TableCell>Data</TableCell>
      </TableRow>
    </TableHead>
  </Table>
</TableContainer>
<Typography variant="body1">{JSON.stringify(stackData.data.requestPayload)}</Typography>
<Typography variant="body1">{stackData.data.httpMethod}</Typography>
<Typography variant="body1">{stackData.data.route}</Typography>
<Typography variant="body1">{stackData.data.sqlQuery}</Typography>
<Typography variant="body1">{JSON.stringify(stackData.data.responseData)}</Typography>
<Typography variant="body1">{stackData.data.statusCode}</Typography>
<Typography variant="body1">{stackData.data.executionTime}</Typography>
</Box> */

{
	/* <TableBody>
{keyValue.map((itemKey: any, index: any) => (
  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell component="th" scope="row">
      {itemKey[0]}
    </TableCell>
    <TableCell>{typeof itemKey[1] === 'string' ? itemKey[1] : JSON.stringify(itemKey[1])}</TableCell>
  </TableRow>
))}
</TableBody> */
}

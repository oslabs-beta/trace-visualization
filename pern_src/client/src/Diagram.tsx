import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Container } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { DataObject } from './Types';
import SequenceDiagram from './SequenceDiagram';
import DatabaseDiagram from './DatabaseDiagram';
import isValidUri from './utils/validateUri';
import getTableData from './services/databaseService';

interface Props {
	stackData: DataObject;
}

const Diagram = ({ stackData }: Props) => {
	const [value, setValue] = React.useState('1');
	const [pgUri, setPgUri] = React.useState('');
	const [tables, setTables] = React.useState({});

	useEffect(() => {

		const fetchData = async () => {
			if (isValidUri(pgUri)) {
				const data = await getTableData(pgUri)
				setTables(data);
			}
		}

		fetchData();
	},[pgUri])

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPgUri(event.currentTarget.value);
	};

	return (
		<>
			<Box sx={{ display: 'flex', height: '50vh' }}>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						paddingBottom: '10px',
						marginTop: '10px',
					}}>
					<TabContext value={value}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: 'divider',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'column',
								'@media (min-width: 600px)': {
									flexDirection: 'row',
								},
							}}>
							<TabList
								onChange={handleChange}
								sx={{
									display: 'flex',
									flexDirection: 'row',
									'@media (max-width: 600px)': {
										flexDirection: 'column',
									},
								}}>
								<Tab sx={{ pr: 4 }} label="Sequence Diagram" value="1" />
								<Tab sx={{ pr: 4 }} label="ER Diagram" value="2" />
							</TabList>
							<TextField 
								variant='filled'
								sx = {{
								}}
								label='PG URI'
								onChange={handleInput}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								'@media (min-width: 600px)': {
									flexDirection: 'row',
								},
							}}>
							<TabPanel value="1" sx={{ flex: 1, padding: 1 }}>
								<SequenceDiagram stackData={stackData} />
							</TabPanel>
							<TabPanel value="2" sx={{ flex: 1, padding: 1 }}>
								<div style={{ width: '81vw'}}>
									<DatabaseDiagram tables={tables}/>
								</div>
							</TabPanel>
						</Box>
					</TabContext>
				</Container>
			</Box>
		</>
	);
};

export default Diagram;

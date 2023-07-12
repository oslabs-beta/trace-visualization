import React from 'react';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

interface Props {
	stackData: Object;
}

const Diagram = ({ stackData }: Props) => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<>
			<Box sx={{ display: 'flex', height: '60vh' }}>
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
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								'@media (min-width: 600px)': {
									flexDirection: 'row',
								},
							}}>
							<TabPanel value="1" sx={{ flex: 1 }}>
								<Typography>Sequence Diagram</Typography>
							</TabPanel>
							<TabPanel value="2" sx={{ flex: 1 }}>
								<Typography>ER Diagram</Typography>
							</TabPanel>
						</Box>
					</TabContext>
				</Container>
			</Box>
		</>
	);
};

export default Diagram;

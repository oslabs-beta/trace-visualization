import axios from 'axios';

const url = 'http://localhost:12720/api';

const getTableData = async (pgUri: string) => {
	const encodedUri = encodeURIComponent(pgUri);
	const { data } = await axios.get(`${url}/getDatabase/${encodedUri}`);

	return data;
};

export default getTableData;

import axios from 'axios';

const url = 'http://localhost:12720/api';

const queryParser = async (query: string) => {
	const { data } = await axios.get(`${url}/getParsedQuery/${query}`);

	return data;
};

export default queryParser;

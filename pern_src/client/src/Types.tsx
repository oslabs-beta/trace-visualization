export interface DataObject {
	data: {
		executionTime: string;
		httpMethod: string;
		requestPayload: any | undefined;
		responseData: any | undefined;
		route: string;
		sqlQuery: string;
		statusCode: number | undefined;
		date: string;
	};
}

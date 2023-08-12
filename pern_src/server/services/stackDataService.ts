const stackDataService = {
	getStackProps: (requestBody: any) => {
		const stackData: any = {};

		const keys = new Set(['requestPayload', 'responseData']);

		//check if open telemetry request
		if (requestBody.resourceSpans) {
			const scopeSpans = requestBody.resourceSpans[0].scopeSpans;

			for (const scopeSpan of scopeSpans) {
				if (scopeSpan.scope.name === '@opentelemetry/instrumentation-pg') {
					const spans = scopeSpan.spans;
					for (const span of spans) {
						//crawl attributes for sql query
						for (const obj of span.attributes) {
							if (obj.key === 'db.statement') {
								stackData['sqlQuery'] = obj.value.stringValue;
							}
						}
					}
				} else if (scopeSpan.scope.name === '@opentelemetry/instrumentation-http') {
					const spans = scopeSpan.spans;
					for (const span of spans) {
						//filter out noise
						const url = span.attributes[0].value.stringValue;
						if (url.includes('/socket.io/') || url.includes('/v1/traces')) {
							continue;
						}
						if (span.name === 'OPTIONS') {
							continue;
						}

						//crawl remaining spans for relevant properties
						else {
							stackData['executionTime'] = `${(span.endTimeUnixNano - span.startTimeUnixNano) / 1000000000}s`;
							for (const attribute of span.attributes) {
								if (attribute.key === 'http.url') {
									stackData['route'] = attribute.value.stringValue;
								}
								if (attribute.key === 'http.method') {
									stackData['httpMethod'] = attribute.value.stringValue;
								}
								if (attribute.key === 'http.status_code') {
									stackData['statusCode'] = attribute.value.intValue;
								}
							}
						}
					}
				}
			}
		} else {
			for (const [k, v] of Object.entries(requestBody) as [string, string][]) {
				if (keys.has(k)) {
					stackData[k] = JSON.parse(v);
				}
			}
		}
		return stackData;
	},
};

export default stackDataService;

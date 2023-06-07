const fs = require('fs');
const path = require('path');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ConsoleSpanExporter, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');
const io = require('socket.io-client');
const express = require('express');
const app = express();

// Optionally register instrumentation libraries
registerInstrumentations({
	instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});

// Create a tracer provider
const provider = new NodeTracerProvider();

// Create a span exporter and exports in console in batches
const exporter = new ConsoleSpanExporter();
const processor = new BatchSpanProcessor(exporter);
provider.addSpanProcessor(processor);

// Initialize the tracer provider
provider.register();

const rootDirectory = path.resolve(__dirname, '..');

function logData(data) {
	// const socket = io('http://localhost:8080');
	// socket.emit('server tracing data', data);
	fs.appendFileSync(path.join(rootDirectory, 'log.txt'), data);
}

// Add a span processor to log the span data
provider.addSpanProcessor({
	// onStart needed or run into error saying onStart is not a function
	onStart: (span) => {
		// Doing nothing on start
	},
	onEnd: (span) => {
		if (span.attributes['http.method'] !== 'OPTIONS') {
			if (span.attributes['http.method']) {
				logData(`HTTP method: ${span.attributes['http.method']}\n`);
			}
			if (span.attributes['http.target']) {
				logData(`API route: ${span.attributes['http.target']}\n`);
			}
			if (span.attributes['http.method'] && span.duration) {
				logData(`Execution time (ms): ${span.duration}\n`);
			}
			if (span.attributes['http.status_code']) {
				logData(`HTTP status code: ${span.attributes['http.status_code']}\n`);
			}
			if (span.attributes['db.statement']) {
				logData(`SQL Query: ${span.attributes['db.statement']}\n`);
			}
		}
	},
});

app.listen(8080, () => {
	console.log('Server running at http://localhost:8080/');
});

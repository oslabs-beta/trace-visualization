const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

//Open Telemetry Auto Instrumentation
const sdk = new NodeSDK({
	serviceName: 'my-app',
	traceExporter: new OTLPTraceExporter({ url: 'http://localhost:12720/v1/traces' }),
	instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});
sdk.start();

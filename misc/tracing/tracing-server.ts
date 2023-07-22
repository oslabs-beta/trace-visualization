import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';

//Open Telemetry Auto Instrumentation
const sdk = new NodeSDK({
	serviceName: 'my-app',
	traceExporter: new OTLPTraceExporter({ url: 'http://localhost:12720/v1/traces' }),
	instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});
sdk.start();
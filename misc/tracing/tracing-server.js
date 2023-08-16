const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { PgInstrumentation } = require("@opentelemetry/instrumentation-pg");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");

registerInstrumentations({
  instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});

const provider = new NodeTracerProvider();
const exporter = new OTLPTraceExporter({
  url: "http://localhost:12720/v1/traces",
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register();

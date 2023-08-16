import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

registerInstrumentations({
  instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});

const provider = new NodeTracerProvider();
const exporter = new OTLPTraceExporter({
  url: "http://localhost:12720/v1/traces",
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register();

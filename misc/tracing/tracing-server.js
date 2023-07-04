const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { PgInstrumentation } = require("@opentelemetry/instrumentation-pg");

//Open Telemetry Auto Instrumentation
const sdk = new NodeSDK({
  serviceName: 'invest-with-friends',
  traceExporter: new OTLPTraceExporter({url:'http://localhost:44222/v1/traces'}),
  instrumentations: [new HttpInstrumentation(), new PgInstrumentation()]
});
sdk.start();

// Express Server
const app = express();
const PORT = 44222;

app.use(cors({credentials: true,}));
app.use(express.json());

const expressServer = app.listen(PORT, () => console.log(`Injected server listening on port: ${PORT}...`));

//Socket IO server
const io = socketio(expressServer, {cors: {origin: '*'}});
let socketId;

let stackData = {};

app.post('/v1/traces', (req, res) => {
  filter(req.body);
  if (Object.keys(stackData).length >= 7) {
    io.to(socketId).emit('interaction', {data: stackData});
    console.log('sending data...');
    stackData = {};
  }
  res.sendStatus(200);
})

io.on('connection', (socket) => {

  socket.on('socketId', (data) => {
    socketId = data.data;
    console.log(`connected to new socket: id ${socketId}`);
  });

  socket.on('disconnect', () => {
    console.log(`id ${socketId} disconnected`)
  })
});

//request filtering logic
const filter = (requestBody) => {

  const keys = new Set([
    'requestPayload',
    'responseData',
  ])

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
              stackData['sqlQuery'] = obj.value.stringValue
            }
          }
        }
      }
      else if (scopeSpan.scope.name === '@opentelemetry/instrumentation-http') {
        const spans = scopeSpan.spans;
        for (const span of spans) {

          //filter out noise
          const url = span.attributes[0].value.stringValue;
          if (url.includes('/socket.io/') || url.includes('/v1/traces')) {continue;} 
          if (span.name === 'OPTIONS') {continue}

          //crawl remaining spans for relevant properties
          else {
            stackData['executionTime'] = `${(span.endTimeUnixNano - span.startTimeUnixNano)/1000000000}s`
            for (const attribute of span.attributes) {
              if (attribute.key === 'http.url') {stackData['route'] = attribute.value.stringValue}
              if (attribute.key === 'http.method') {stackData['httpMethod'] = attribute.value.stringValue}
              if (attribute.key === 'http.status_code') {stackData['statusCode'] = attribute.value.intValue}
            }
          }
        }
      }
    }
  } else {
    for (const [k, v] of Object.entries(requestBody)) {
      if (keys.has(k)) {
        stackData[k] = v;
      }
    }
  }
}

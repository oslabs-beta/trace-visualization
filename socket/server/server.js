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

const expressServer = app.listen(PORT, () => console.log('listening...'));

//Socket IO server
const io = socketio(expressServer);
let socketId;

app.post('/v1/traces', (req, res) => {
  console.log('sending data...');
  io.to(socketId).emit('interaction', {data: req.body});
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
import express, { Express, NextFunction, Request, Response, } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import databaseController from './controllers/databaseController';

const app: Express = express();
const PORT = 12720;

let socketId: any;
let stackData: any = {};

//middleware
app.use(cors({credentials: true,}));
app.use(express.json());

//routes
app.get('/api/getDatabase/:pgUri', databaseController.getDatabase, (req, res) => {
  return res.status(200).json(res.locals.tableData);
})

app.post('/v1/traces', (req, res) => {
  filter(req.body);
  if (Object.keys(stackData).length >= 7) {
    io.to(socketId).emit('interaction', {data: stackData});
    console.log('sending data...');
    stackData = {};
  }
  res.sendStatus(200);
})

//global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(500);
})

//server 
const expressServer = app.listen(PORT, () => {
  console.log(`extension backend listening on port: ${PORT}...`);
});

//Socket IO server
const io: any = new Server(expressServer, {cors: {origin: '*'}});

io.on('connection', (socket: any) => {

  socket.on('socketId', (data: any) => {
    socketId = data.data;
    console.log(`connected to new socket: id ${socketId}`);
  });

  socket.on('disconnect', () => {
    console.log(`id ${socketId} disconnected`)
  })
});

//request filtering logic
const filter = (requestBody: any) => {

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
    for (const [k, v] of (Object.entries(requestBody) as [any, any][])) {
      if (keys.has(k)) {
        stackData[k] = JSON.parse(v);
      }
    }
  }
}

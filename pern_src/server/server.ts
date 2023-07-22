import express, { Express, NextFunction, Request, Response, } from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import databaseController from './controllers/databaseController';
import stackDataService from './services/stackDataService';

const app: Express = express();
const PORT = 12720;

let socketId: string;
let stackData: any = {};

//middleware
app.use(cors({credentials: true,}));
app.use(express.json());

//routes
app.get('/api/getDatabase/:pgUri', databaseController.getDatabase, (req, res) => {
  return res.status(200).json(res.locals.tableData);
})

app.post('/v1/traces', (req, res) => {
  stackData = {...stackData, ...stackDataService.getStackProps(req.body)}
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
const io: Server = new Server(expressServer, {cors: {origin: '*'}});

interface connectionData {
  data: string
}

io.on('connection', (socket: Socket) => {

  socket.on('socketId', (data: connectionData) => {
    socketId = data.data;
    console.log(`connected to new socket: id ${socketId}`);
  });

  socket.on('disconnect', () => {
    console.log(`id ${socketId} disconnected`)
  })
});

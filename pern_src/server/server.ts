import express, { Express, NextFunction, Request, Response, } from 'express';
import cors from 'cors';
import databaseController from './controllers/databaseController';

const app: Express = express();
const PORT = 12720;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/api/getDatabase/:pgUri', databaseController.getDatabase, (req, res) => {
  return res.status(200).json(res.locals.tableData);
})

app.get('/api/getParsedQuery/:query', databaseController.parseQuery, (req, res) => {
  return res.status(200).json(res.locals.parsedQuery);
})

//global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(500);
})

//server 
app.listen(PORT, () => {
  console.log(`extension backend listening on port: ${PORT}...`);
});

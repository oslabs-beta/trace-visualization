import express, { Express, NextFunction, Request, Response, } from 'express';

const app: Express = express();
const PORT = 12720;

//middleware
app.use(express.json());

//routes


//global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(500);
})

//server 
app.listen(PORT, () => {
  console.log(`extension backend listening on port: ${PORT}...`);
});

import { Request, Response, NextFunction } from "express";
import databaseService from "../services/databaseService";
import queryParser from "../services/queryParserService";

const databaseController = {
  getDatabase: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pgUri = req.params.pgUri;
      const tableData = await databaseService.getTablesFields(pgUri);
      res.locals.tableData = tableData;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  parseQuery: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.params.query;
      const parsedQuery = await queryParser(query);
      res.locals.parsedQuery = parsedQuery;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default databaseController;

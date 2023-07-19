import { Request, Response, NextFunction } from 'express';
import databaseService from '../services/databaseService';

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
  }
}

export default databaseController;
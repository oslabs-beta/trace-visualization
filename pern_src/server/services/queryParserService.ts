//@ts-ignore
import { parse } from "pgsql-parser";
const statementController = require("./queryParserStatementFunctions");

function queryParser(query: string) {
  const parsedQuery = parse(query);
  const stmt = parsedQuery[0].RawStmt.stmt;

  //Determine which type of CRUD statement is used
  const stmtType: string = Object.keys(stmt)[0];

  //initialize an query object to store info
  interface QueryInfo {
    [key: string]: any;
  }

  //initialize an query object to store columns info
  interface Columns {
    [key: string]: Array<string>;
  }
  const columns: Columns = {};

  let queryInfo: QueryInfo = {
    SQL_Query: query,
    statementType: stmtType.split("Stmt")[0],
    columns: columns,
  };

  //object to hold aliases
  const aliasObj: any = {};

  switch (stmtType) {
    case "SelectStmt":
      statementController.populateSelectCols(
        stmt[stmtType],
        queryInfo,
        aliasObj
      );
      break;
    case "InsertStmt":
      statementController.populateInsertCols(
        stmt[stmtType],
        queryInfo,
        aliasObj
      );
      break;
    case "UpdateStmt":
      statementController.populateUpdateCols(
        stmt[stmtType],
        queryInfo,
        aliasObj
      );
      break;
    case "DeleteStmt":
      statementController.populateDeleteCols(
        stmt[stmtType],
        queryInfo,
        aliasObj
      );
      break;
    default:
      break;
  }

  //Alias Reassignment
  if (Object.keys(aliasObj).length) {
    for (let table in queryInfo.columns) {
      if (aliasObj[table]) {
        queryInfo.columns[aliasObj[table]] = queryInfo.columns[table];
        delete queryInfo.columns[table];
      }
    }
  }
  return queryInfo;
}

export default queryParser;

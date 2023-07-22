//@ts-ignore
import { parse } from 'pgsql-parser';

function queryParser(query : string){
  if (query.includes('*') === true) return 'Sorry, statements cannot contain "*" '
  const parsedQuery = parse(query);
  const stmt = parsedQuery[0].RawStmt.stmt;

  //Determine which type of CRUD statement is used
  const stmtType = Object.keys(stmt)[0];

  //initialize an query object to store info
  interface QueryInfo {
      [key: string]: any;
    }

  const queryInfo : QueryInfo = {SQL_Query : query};

  switch (stmtType){
    case 'SelectStmt': //Query uses Select

      queryInfo.statementType = 'Select'

      //initialize an query object to store columns info
    interface Columns {
      [key: string]: Array<any>;
    }
      var columns : Columns = {};
      var colsArr = stmt.SelectStmt.targetList;

      //if a join expression is used, the following code applies
      if (stmt.SelectStmt.fromClause[0].JoinExpr){
        for (let i = 0; i < colsArr.length; i++){
          const pair = colsArr[i].ResTarget.val.ColumnRef.fields
          if (!columns[pair[0].String.str]){
            columns[pair[0].String.str] = [pair[1].String.str];
          } else{
            columns[pair[0].String.str].push(pair[1].String.str);
          }
        }
      } 
    
      //if no join expression is used, the following code applies
      else{
        var table = stmt.SelectStmt.fromClause[0].RangeVar.relname;
        columns[table] = [];
        for (let i = 0; i < colsArr.length; i++){
          const pair = colsArr[i].ResTarget.val.ColumnRef.fields
            columns[table].push(pair[0].String.str);
        }
      }
      queryInfo.columns = columns;
      break;

    case 'InsertStmt' :
      queryInfo.statementType = 'Insert'; //Query uses Insert
      columns = {};
      table = stmt.InsertStmt.relation.relname;
      columns[table] = [];
      colsArr = stmt.InsertStmt.cols;
      for (let i = 0; i < colsArr.length; i++){
        columns[table].push(colsArr[i].ResTarget.name)
      }
      queryInfo.columns = columns;

      break;
    case 'UpdateStmt' :
      queryInfo.statementType = 'Update';
      columns = {};
      table = stmt.UpdateStmt.relation.relname;
      columns[table] = [];
      colsArr = stmt.UpdateStmt.targetList;
      for (let i = 0; i < colsArr.length; i++){
        columns[table].push(colsArr[i].ResTarget.name)
      }
      queryInfo.columns = columns;

      break;
    case 'DeleteStmt' :
      queryInfo.statementType = 'Delete';
      break;
    default:
      console.log("query not recognized")
    }
    return queryInfo;
}

export default queryParser
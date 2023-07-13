const { parse } = require('pgsql-parser');

function queryParser(query){
  if (query.includes('*') === true) return 'Sorry, statements cannot contain "*" '
  const parsedQuery = parse(query);
  const stmt = parsedQuery[0].RawStmt.stmt;

  //Determine which type of CRUD statement is used
  const stmtType = Object.keys(stmt)[0];

  //initialize an query object to store info
  const queryInfo = {SQL_Query : query};

  switch (stmtType){
    case 'SelectStmt': //Query uses Select

      queryInfo.statementType = 'Select'
      var columns = {};
      var colsArr = stmt.SelectStmt.targetList;

      //if a join expression is used, the following code applies
      if (stmt.SelectStmt.fromClause[0].JoinExpr){
        for (col of colsArr){
          const pair = col.ResTarget.val.ColumnRef.fields
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
        for (col of colsArr){
          const pair = col.ResTarget.val.ColumnRef.fields
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
      for (cols of colsArr){
        columns[table].push(cols.ResTarget.name)
      }
      queryInfo.columns = columns;

      break;
    case 'UpdateStmt' :
      queryInfo.statementType = 'Update';
      columns = {};
      table = stmt.UpdateStmt.relation.relname;
      columns[table] = [];
      colsArr = stmt.UpdateStmt.targetList;
      for (cols of colsArr){
        columns[table].push(cols.ResTarget.name)
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



const query = `
INSERT INTO reviews (trail_id, user_id, review, stars, date)
VALUES ($1, $2, $3, $4, $5) RETURNING review_id
`;

console.log(queryParser(query))

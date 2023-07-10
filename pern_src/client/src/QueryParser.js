const { parse } = require('pgsql-parser');

function queryParser(query){
  const parsedQuery = parse(query);
  const stmt = parsedQuery[0].RawStmt.stmt;

  //Determine which type of CRUD statement is used
  const stmtType = Object.keys(stmt)[0];

  //initialize an query object to store info
  const queryInfo = {};

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

        //join expressions will add an additional property to the query info object that highlights the type of join, primary key, and foreign key
        const keys = stmt.SelectStmt.fromClause[0].JoinExpr.quals;
        const primaryKey = keys.A_Expr.lexpr.ColumnRef.fields;
        const foreignKey = keys.A_Expr.rexpr.ColumnRef.fields
        const joinInfo = {
          joinType : stmt.SelectStmt.fromClause[0].JoinExpr.jointype,
          primaryKey: {table: primaryKey[0].String.str, column: primaryKey[1].String.str},
          foreignKey: {table: foreignKey[0].String.str, column: foreignKey[1].String.str},
        }
        queryInfo.joinInfo = joinInfo
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

      //if a return is used, the following code applies and adds a returningList property to query info
      if (stmt.InsertStmt.returningList){
        console.log('hi')
        var returningCols = {};
        returningCols[table] = [];
        var retColsArr = stmt.InsertStmt.returningList;
        for (retCols of retColsArr){
          returningCols[table].push(retCols.ResTarget.val.ColumnRef.fields[0].String.str);
        }
        queryInfo.returningCols = returningCols;
      }
      break;
    case 'UpdateStmt' :
      queryInfo.statementType = 'Update';
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
INSERT INTO holdings (holder_id, stock_quantity, stock_id) 
SELECT $1, $3, (
    SELECT stock_id 
    FROM stocks
    WHERE stocks.ticker = $2
    )
WHERE EXISTS (
    SELECT * 
    FROM stocks 
    WHERE stocks.ticker = $2
);
`
const query2 = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id AS id, first_name AS "firstName", last_name AS "lastName", email'
const pq = parse(query)
const pg2 = parse(query2)


console.log(queryParser(query2))


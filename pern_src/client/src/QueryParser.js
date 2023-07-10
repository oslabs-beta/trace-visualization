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
      const columns = {};
      const colsArr = stmt.SelectStmt.targetList;

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
        const table = stmt.SelectStmt.fromClause[0].RangeVar.relname;
        columns[table] = [];
        for (col of colsArr){
          const pair = col.ResTarget.val.ColumnRef.fields
            columns[table].push(pair[0].String.str);
        }
      }

      queryInfo.columns = columns;
      break;
    case 'InsertStmt' :
      break;
      default:
      console.log("query not recognized")
    }
    return queryInfo;
}

const query = 'SELECT holdings.holder_id AS user_id, holdings.stock_quantity, stocks.stock_id, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=68'

const query2 = 'SELECT word_id, word FROM "words"'

// const query2 = `
// INSERT INTO holdings (holder_id, stock_quantity, stock_id) 
// SELECT $1, $3, (
//     SELECT stock_id 
//     FROM stocks
//     WHERE stocks.ticker = $2
//     )
// WHERE EXISTS (
//     SELECT * 
//     FROM stocks 
//     WHERE stocks.ticker = $2
// );
// `
console.log(queryParser(query))

console.log(queryParser(query2))

// const pq1 = parse(query)
// const pq2 = parse(query2)


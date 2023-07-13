const { Pool } = require('pg');

const PG_URI = 'postgres://khdcswpz:0rKJ3iUwCHP6awn7bBLufyoEJiEYjIZv@queenie.db.elephantsql.com/khdcswpz'

const pool = new Pool({
  connectionString: PG_URI,
});

const query = (text, params, callback) => {
  // console.log('executed query', text);
  return pool.query(text, params, callback);
}

const getDatabaseInfo = async () => {
  const queryText = "SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = \'BASE TABLE'"

  // const queryText = 'SELECT * FROM stocks'
  const data = await query(queryText);

  const ourTables = [];
  for (let table of data.rows)
      if (!table['table_name'].includes('pg_') && !table['table_name'].includes('sql_')){
          ourTables.push(table['table_name'])
      }


  const tablesInfo = {};

  for (let table of ourTables){
      tablesInfo[table] = [];
      const columnQuery = 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = $1'
      const data = await query(columnQuery, [table]);
      for (eachTable of data.rows){
        tablesInfo[table].push(eachTable['column_name'])
      }
  }
    return tablesInfo;
}

getDatabaseInfo();



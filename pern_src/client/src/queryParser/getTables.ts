import { Pool } from 'pg';

const databaseService = {
  getTablesFields: async (uri: string) => {
    const pool = new Pool({
      connectionString: uri,
    })
    const query = (text: string, params?: any, callback?: any) => {
      return pool.query(text, params, callback);
    }

    const queryText = "SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = \'BASE TABLE'"
    const data: any = await query(queryText);

    const tables: string[] = [];
    for (const table of data.rows) {
      if (!table['table_name'].includes('pg_') && !table['table_name'].includes('sql_')){
          tables.push(table['table_name'])
      }
    }

    interface TableFields {
      [key: string]: any[]
    }

    const tablesFields: TableFields = {};
    for (const table of tables){
      tablesFields[table] = [];
      const columnQuery = 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = $1'
      const data: any = await query(columnQuery, [table]);
      for (const eachTable of data.rows){
        tablesFields[table].push(eachTable['column_name'])
      }
    }
    return tablesFields;
  }
}

export default databaseService;
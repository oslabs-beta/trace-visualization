import { useMemo } from 'react'
import ReactFlow, { Controls, Background, Node } from 'reactflow';
import NodeStyles from './TableNode';
import 'reactflow/dist/style.css';

interface Tables {
  [key: string]: any[]
}

interface Props {
	tables: Tables;
}

const DatabaseDiagram = ({ tables }: Props) => {
  const nodeTypes = useMemo(() => ({ opaqueNode: NodeStyles.OpaqueNode, tableNode: NodeStyles.TableNode}), []);

  const queryInfo : any = {
    SQL_Query : ` SELECT holdings.holder_id AS user_id, holdings.stock_quantity, stocks.stock_id, stocks.ticker, stocks.company_name, stocks.closing_price, stocks.last_updated FROM "holdings" LEFT JOIN "stocks" ON "holdings"."stock_id"="stocks"."stock_id" WHERE "holder_id"=$1
    `,
    statementType : 'Select',
    columns : {
      holdings: [ 'holder_id', 'stock_quantity' ],
      stocks: [
        'stock_id',
        'ticker',
        'company_name',
        'closing_price',
      ]
      }
  }

  const nodeType = (key: string, i : number, queryInfo: any) => {

    //this logic pertains to if the columns from the database appear in the query, giving it the table style
    if (Object.keys(queryInfo.columns).includes(key)){
      return {
        id: i.toString(),
      position: { x: i * 150, y: 0 },
      data: { tableName: key, fields: tables[key], columns: queryInfo.columns[key], statementType : queryInfo.statementType },
      type: 'tableNode',
      }
    }

    //this logic pertains to if the columns from the database do not appear in the query, apply opaque style
    else{
      return {
        id: i.toString(),
      position: { x: i * 150, y: 0 },
      data: { tableName: key, fields: tables[key], queryInfo: queryInfo},
      type: 'opaqueNode',
      }
    }
  }
  const nodes : Node[] = Object.keys(tables).map((key, i) => (
    nodeType(key, i, queryInfo)
  ))
  return (
    <div style={{ height: '44vh' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DatabaseDiagram;

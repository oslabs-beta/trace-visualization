import { useMemo } from 'react'
import ReactFlow, { Controls, Background, Node } from 'reactflow';
import NodeStyles from './NodeStyles';
import 'reactflow/dist/style.css';

interface Tables {
  [key: string]: any[]
}

interface QueryInfo {
  [key: string]: any[]
}

interface Props {
	tables: Tables,
  queryInfo: QueryInfo;
}

const DatabaseDiagram = ({ tables, queryInfo }: Props) => {
  const nodeTypes = useMemo(() => ({ opaqueNode: NodeStyles.OpaqueNode, tableNode: NodeStyles.TableNode, legendNode: NodeStyles.LegendNode}), []);

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
  nodes.push(
    {
      id: 'Legend',
    position: { x: 0, y: 200 },
    data: { tableName: 'Statement Type'},
    type: 'legendNode',
    }
  )
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
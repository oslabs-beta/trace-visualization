import { useMemo } from 'react'
import ReactFlow, { Controls, Background, Node } from 'reactflow';
import TableNode from './TableNode';
import 'reactflow/dist/style.css';

interface Tables {
  [key: string]: any[]
}

interface Props {
	tables: Tables;
}

const DatabaseDiagram = ({ tables }: Props) => {

  const nodeTypes = useMemo(() => ({ tableNode: TableNode }), []);

  const nodes: Node[] = Object.keys(tables).map((key, i) => (
    {
      id: i.toString(),
      position: { x: i * 150, y: 0 },
      data: { tableName: key, fields: tables[key]},
      type: 'tableNode',
    }
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

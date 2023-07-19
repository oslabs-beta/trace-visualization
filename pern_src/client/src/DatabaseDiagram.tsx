import { useMemo } from 'react'
import ReactFlow, { Controls, Background, Node } from 'reactflow';
import TableNode from './TableNode';
import 'reactflow/dist/style.css';

interface Props {
	pgUri: String;
}

const DatabaseDiagram = ({ pgUri }: Props) => {

  const nodeTypes = useMemo(() => ({ tableNode: TableNode }), []);

  const nodes: Node[] = [
    {
      id: '1', // required
      position: { x: 0, y: 0 }, // required
      data: { label: 'Test Node'},
      type: 'tableNode',
    },
    {
      id: '2', // required
      position: { x: 150, y: 0 }, // required
      data: { label: 'Test2'},
      type: 'tableNode',
    },

  ];

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

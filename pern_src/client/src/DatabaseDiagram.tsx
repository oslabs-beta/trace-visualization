import { useMemo } from 'react';
import ReactFlow, { Controls, Background, Node } from 'reactflow';
import NodeStyles from './NodeStyles';
import 'reactflow/dist/style.css';

interface Tables {
	[key: string]: any[];
}

interface QueryInfo {
	[key: string]: any[];
}

interface Props {
	tables: Tables;
	queryInfo: QueryInfo;
}

const DatabaseDiagram = ({ tables, queryInfo }: Props) => {
	const nodeTypes = useMemo(() => ({ opaqueNode: NodeStyles.OpaqueNode, tableNode: NodeStyles.TableNode, legendNode: NodeStyles.LegendNode }), []);
	const defaultViewport = { x: 0, y: 0, zoom: 1 };

	const nodeType = (key: string, i: number, queryInfo: any) => {
		//this logic pertains to if the columns from the database appear in the query, giving it the table style
		if (Object.keys(queryInfo.columns).includes(key)) {
			return {
				id: i.toString(),
				position: { x: i * 195, y: 10 },
				data: { tableName: key, fields: tables[key], columns: queryInfo.columns[key], statementType: queryInfo.statementType },
				type: 'tableNode',
			};
		}

		//this logic pertains to if the columns from the database do not appear in the query, apply opaque style
		else {
			return {
				id: i.toString(),
				position: { x: i * 195, y: 10 },
				data: { tableName: key, fields: tables[key], queryInfo: queryInfo },
				type: 'opaqueNode',
			};
		}
	};
	const nodes: Node[] = Object.keys(tables).map((key, i) => nodeType(key, i, queryInfo));
	nodes.push({
		id: 'Legend',
		position: { x: 0, y: 300 },
		data: { tableName: 'Statement Syntax' },
		type: 'legendNode',
	});
	return (
		<div style={{ width: '95vw', height: '42vh' }}>
			<ReactFlow nodes={nodes} nodeTypes={nodeTypes} defaultViewport={defaultViewport}>
				<Controls position="bottom-right" showInteractive={false} />
			</ReactFlow>
		</div>
	);
};
export default DatabaseDiagram;

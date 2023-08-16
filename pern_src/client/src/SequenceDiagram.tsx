import React, { useEffect, useState } from "react";
import { DataObject } from "./Types";
import ReactFlow, {
  Node,
  Edge,
  useEdgesState,
  Position,
  MarkerType,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Sequence-diagram.css";

interface Props {
  stackData: DataObject;
}

const SequenceDiagram = ({ stackData }: Props) => {
  const requestPayload = JSON.stringify(stackData.data.requestPayload);
  const httpMethod = stackData.data.httpMethod;
  const route = stackData.data.route;
  const sqlQuery = stackData.data.sqlQuery;
  const responseData = JSON.stringify(stackData.data.responseData);
  let flowRender = false;

  if (httpMethod.length > 0) flowRender = true;

  const nodeStyle = {
    width: 100,
    height: 50,
    backgroundColor: "#EAFFF1",
    border: "1px solid #999999",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const responseNodeStyle = {
    width: 275,
    backgroundColor: "white",
    border: "1px solid #999999",
    borderRadius: 5,
  };

  const responseNodeStyleSql = {
    width: 445,
    backgroundColor: "white",
    border: "1px solid #999999",
    borderRadius: 5,
  };

  const initialStyle = {
    backgroundColor: "#EEEEEE",
    border: "none",
    width: 500,
    fontStyle: "italic",
    fontSize: "20px",
    color: "gray",
  };

  const defaultViewport = { x: 0, y: 0, zoom: 1 };

  const initialNodes: Node[] = [
    {
      id: "1",
      sourcePosition: Position.Right,
      targetPosition: Position.Bottom,
      data: { label: "User" },
      position: { x: 0, y: 5 },
      style: nodeStyle,
    },
    {
      id: "2",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { label: "Client" },
      position: { x: 175, y: 5 },
      style: nodeStyle,
    },
    {
      id: "3",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { label: "Server" },
      position: { x: 350, y: 5 },
      style: nodeStyle,
    },
    {
      id: "4",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { label: "Controller" },
      position: { x: 525, y: 5 },
      style: nodeStyle,
    },
    {
      id: "5",
      sourcePosition: Position.Left,
      targetPosition: Position.Left,
      data: { label: "Database" },
      position: { x: 700, y: 5 },
      style: nodeStyle,
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "6-7",
      source: "6",
      type: "smoothstep",
      target: "7",
      animated: true,
      style: { stroke: "red" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "red",
      },
    },
    {
      id: "7-8",
      source: "7",
      type: "smoothstep",
      target: "8",
      animated: true,
      style: { stroke: "red" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "red",
      },
    },
    {
      id: "8-9",
      source: "8",
      type: "smoothstep",
      target: "9",
      animated: true,
      style: { stroke: "red" },
      label: (
        <div
          style={{ position: "relative", textAlign: "center", top: "-20px" }}
        >
          Return Data
        </div>
      ),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "red",
      },
    },
    {
      id: "9-1",
      source: "9",
      type: "smoothstep",
      target: "1",
      animated: true,
      style: { stroke: "red" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "red",
      },
    },
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useEdgesState<Edge[]>(initialEdges);

  useEffect(() => {
    if (!flowRender) {
      const newNodes = [
        ...nodes,
        {
          id: "0",
          data: {
            label: "Run a request to show your sequence diagram",
          },
          position: { x: 150, y: 200 },
          style: initialStyle,
        },
      ];
      setNodes(newNodes);
    }
    if (flowRender) {
      const filteredNodes = nodes.filter((node) => node.id !== "0");
      const newNodes = [
        ...filteredNodes,
        {
          id: "6",
          sourcePosition: Position.Bottom,
          targetPosition: Position.Bottom,
          data: {
            label: (
              <div
                className="nowheel align"
                style={{
                  height: "50px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="bold">Request Payload:</div>
                <div>{requestPayload}</div>
              </div>
            ),
          },
          position: { x: 0, y: 74 },
          style: responseNodeStyle,
        },
        {
          id: "7",
          sourcePosition: Position.Bottom,
          targetPosition: Position.Left,
          data: {
            label: (
              <div
                className="nowheel align"
                style={{
                  height: "50px",
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="bold">Route:</div>
                <div>{route}</div>
              </div>
            ),
          },
          position: { x: 175, y: 166 },
          style: responseNodeStyle,
        },
        {
          id: "8",
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: {
            label: (
              <div
                className="nowheel align"
                style={{
                  height: "60px",
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="bold">SQL Query:</div>
                <div>{sqlQuery}</div>
              </div>
            ),
          },
          position: { x: 350, y: 260 },
          style: responseNodeStyleSql,
        },
        {
          id: "9",
          sourcePosition: Position.Left,
          targetPosition: Position.Right,
          data: {
            label: (
              <div
                className="nowheel align"
                style={{
                  height: "60px",
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="bold">Response Data:</div>
                <div>{responseData}</div>
              </div>
            ),
          },
          position: { x: 175, y: 361 },
          style: responseNodeStyleSql,
        },
      ];
      setNodes(newNodes);
    }
  }, [requestPayload]);

  const customHandleStyle = `
  .react-flow__handle[data-nodeid='0'],
  .react-flow__handle[data-nodeid='1'],
  .react-flow__handle[data-nodeid='2'],
  .react-flow__handle[data-nodeid='3'],
  .react-flow__handle[data-nodeid='4'],
  .react-flow__handle[data-nodeid='5'] {
    opacity: 0;
  }
`;

  return (
    <div style={{ width: "95vw", height: "45vh" }}>
      <style>{customHandleStyle}</style>
      <ReactFlow nodes={nodes} edges={edges} defaultViewport={defaultViewport}>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default SequenceDiagram;

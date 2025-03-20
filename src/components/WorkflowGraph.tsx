'use client';

import { ReactFlow, Background, Controls, Node, Edge, Connection, useReactFlow } from '@xyflow/react';
import { useState, useCallback } from 'react';
import { nodeTypes } from './nodes/nodeTypes';
import { processNode } from '@/lib/api';
import { NodeModal } from './NodeModal';
import '@xyflow/react/dist/style.css';
import { getFlowObjectFromLLM, type FlowObject } from '@/lib/parseAPI';

export type NodeData = {
  label: string;
  type: string;
  status?: 'idle' | 'processing' | 'completed' | 'error';
  result?: any;
};

export function WorkflowGraph() {
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const { project } = useReactFlow();
  const [flowData, setFlowData] = useState<FlowObject | null>(null);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => [...eds, { ...connection, type: 'smoothstep', id: `e${connection.source}-${connection.target}` }]);
  }, []);

  const onNodeClick = useCallback(async (event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);

    // Process node when clicked
    try {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, data: { ...n.data, status: 'processing' } } : n
        )
      );

      const result = await processNode(node);

      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, data: { ...n.data, status: 'completed', result } }
            : n
        )
      );
    } catch (error) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, data: { ...n.data, status: 'error' } }
            : n
        )
      );
    }
  }, []);

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node<NodeData>, nodes: Node<NodeData>[]) => {
      setNodes(nodes);
    },
    []
  );

  const fetchFlowData = async (prompt: string) => {
    try {
      const data = await getFlowObjectFromLLM(prompt);
      setFlowData(data);
    } catch (error) {
      console.error('Error fetching flow data:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-[#2a2b36] rounded-lg relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <NodeModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'user_input',
    position: { x: 100, y: 0 },
    data: { label: 'User Query', type: 'input', status: 'idle' },
  },
  // ... other nodes
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  // ... other edges
]; 
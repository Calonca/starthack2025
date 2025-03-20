import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import { Workflow } from '@/types/workflow';
import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodes/CustomNodes';
import { NodeModal } from './NodeModal';
import { processNode } from '@/lib/api';
import { WorkflowExecutor, NodeData } from '@/lib/workflowExecutor';

type WorkflowDetailProps = {
  workflow: Workflow;
};

const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'user_input',
    position: { x: 100, y: 0 },
    data: { label: 'User Query', type: 'input', status: 'idle' },
  },
  {
    id: '2',
    type: 'ai_agent',
    position: { x: 300, y: 0 },
    data: { label: 'AI Assistant', type: 'ai', status: 'idle' },
  },
  {
    id: '3',
    type: 'data_retrieval',
    position: { x: 500, y: -50 },
    data: { label: 'Financial Data API', type: 'data', status: 'idle' },
  },
  {
    id: '4',
    type: 'analysis',
    position: { x: 700, y: 0 },
    data: { label: 'Data Analysis', type: 'analysis', status: 'idle' },
  },
  {
    id: '5',
    type: 'visualization',
    position: { x: 900, y: 0 },
    data: { label: 'Generate Report', type: 'visualization', status: 'idle' },
  },
  {
    id: '6',
    type: 'action',
    position: { x: 1100, y: 0 },
    data: { label: 'Send Report', type: 'action', status: 'idle' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
  { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
  { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
];

export function WorkflowDetail({ workflow }: WorkflowDetailProps) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const updateNode = useCallback((nodeId: string, data: Partial<NodeData>) => {
    setNodes(nds =>
      nds.map(n =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, ...data } }
          : n
      )
    );
  }, []);

  const executeWorkflow = useCallback(async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    try {
      const executor = new WorkflowExecutor(nodes, edges, updateNode);
      await executor.execute();
    } catch (error) {
      console.error('Workflow execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  }, [nodes, edges, updateNode, isExecuting]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start ml-8 mr-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{workflow.name}</h1>
          <p className="text-gray-400">{workflow.description}</p>
        </div>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-lg ${isExecuting
              ? 'bg-purple-600/50 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
              }`}
            onClick={executeWorkflow}
            disabled={isExecuting}
          >
            {isExecuting ? 'Running...' : 'Run Workflow'}
          </button>
          <button className="px-4 py-2 bg-[#2a2b36] hover:bg-[#32333e] rounded-lg">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#2a2b36] p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Status</div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${workflow.status === 'active' ? 'bg-green-400' :
              workflow.status === 'scheduled' ? 'bg-yellow-400' :
                'bg-gray-400'
              }`} />
            <span className="capitalize">{workflow.status}</span>
          </div>
        </div>
        <div className="bg-[#2a2b36] p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Last Run</div>
          <div>{workflow.lastRun}</div>
        </div>
        <div className="bg-[#2a2b36] p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Assignee</div>
          <div>{workflow.assignee}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="h-[500px] bg-[#2a2b36] rounded-lg">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={onNodeClick}
              onNodeDragStop={onNodeDragStop}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{ type: 'smoothstep' }}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          {/* Prompt Section */}
          <div className="bg-[#2a2b36] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Workflow Prompt</h3>
            <div className="bg-[#1a1b23] p-4 rounded-lg text-gray-300">
              {workflow.prompt}
            </div>
          </div>

          {/* Chat History */}
          <div className="bg-[#2a2b36] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Development History</h3>
            <div className="space-y-4">
              {workflow.chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                      ? 'bg-purple-600/20 text-purple-200'
                      : 'bg-[#1a1b23] text-gray-300'
                      }`}
                  >
                    <div className="mb-1">{message.content}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Configuration Panel */}
          <div className="bg-[#2a2b36] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Trigger Type</div>
                <div>Manual</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Schedule</div>
                <div>Every 6 hours</div>
              </div>
            </div>
          </div>

          {/* Recent Runs Panel */}
          <div className="bg-[#2a2b36] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Runs</h3>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                  <div>
                    <div className="text-sm">Run #{i + 1}</div>
                    <div className="text-xs text-gray-400">2h ago</div>
                  </div>
                  <span className="text-green-400">Successful</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedNode && (
        <NodeModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
} 
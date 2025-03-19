import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import { Workflow } from '@/types/workflow';
import { useState } from 'react';
import '@xyflow/react/dist/style.css';
import {
  UserInputNode,
  AIAgentNode,
  DataRetrievalNode,
  AnalysisNode,
  VisualizationNode,
  ActionNode
} from './nodes/CustomNodes';

type WorkflowDetailProps = {
  workflow: Workflow;
};

const nodeTypes = {
  user_input: UserInputNode,
  ai_agent: AIAgentNode,
  data_retrieval: DataRetrievalNode,
  analysis: AnalysisNode,
  visualization: VisualizationNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  { id: "1", type: "user_input", data: { label: "User Query" }, position: { x: 100, y: 0 } },
  { id: "2", type: "ai_agent", data: { label: "AI Assistant" }, position: { x: 300, y: 0 } },
  { id: "3", type: "data_retrieval", data: { label: "Financial Data API" }, position: { x: 500, y: -50 } },
  { id: "4", type: "analysis", data: { label: "Data Analysis" }, position: { x: 700, y: 0 } },
  { id: "5", type: "visualization", data: { label: "Generate Report" }, position: { x: 900, y: 0 } },
  { id: "6", type: "action", data: { label: "Send Report" }, position: { x: 1100, y: 0 } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: 'smoothstep' },
  { id: "e2-3", source: "2", target: "3", type: 'smoothstep' },
  { id: "e3-4", source: "3", target: "4", type: 'smoothstep' },
  { id: "e4-5", source: "4", target: "5", type: 'smoothstep' },
  { id: "e5-6", source: "5", target: "6", type: 'smoothstep' },
];

export function WorkflowDetail({ workflow }: WorkflowDetailProps) {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">{workflow.name}</h1>
          <p className="text-gray-400">{workflow.description}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
            Run Workflow
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
              fitView
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{ type: 'smoothstep' }}
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
    </div>
  );
} 
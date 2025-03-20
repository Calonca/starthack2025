import { Handle, Position } from '@xyflow/react';

const baseNodeStyles = "px-4 py-2 rounded-lg text-sm font-medium";

interface NodeProps {
  data: {
    label: string;
    status?: 'idle' | 'processing' | 'completed' | 'error';
  };
}

function getStatusStyles(status?: string) {
  switch (status) {
    case 'completed':
      return 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]';
    case 'processing':
      return 'border-yellow-500/50 animate-pulse';
    case 'error':
      return 'border-red-500/50';
    default:
      return 'border-blue-500/50';
  }
}

export function UserInputNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-blue-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>👤</span>
        {data.label}
      </div>
    </div>
  );
}

export function AIAgentNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-purple-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>🤖</span>
        {data.label}
      </div>
    </div>
  );
}

export function DataRetrievalNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-green-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📊</span>
        {data.label}
      </div>
    </div>
  );
}

export function AnalysisNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-yellow-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📈</span>
        {data.label}
      </div>
    </div>
  );
}

export function VisualizationNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-red-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📊</span>
        {data.label}
      </div>
    </div>
  );
}

export function ActionNode({ data }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-orange-500/20 border ${getStatusStyles(data.status)}`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>📤</span>
        {data.label}
      </div>
    </div>
  );
}

export const nodeTypes = {
  user_input: UserInputNode,
  ai_agent: AIAgentNode,
  data_retrieval: DataRetrievalNode,
  analysis: AnalysisNode,
  visualization: VisualizationNode,
  action: ActionNode,
}; 
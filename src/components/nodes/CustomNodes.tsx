// @ts-nocheck
import { getResult } from '@/lib/convertToReactFlow';
import {
  Handle, Position, useNodeConnections, useNodesData, useReactFlow,
  type NodeProps,
  type Node,
} from '@xyflow/react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const baseNodeStyles = "px-4 py-2 rounded-lg text-sm font-medium";

export function UserInputNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-blue-500/20 border border-blue-500/50`}>
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>👤</span>
        {data.label}
      </div>
    </div>
  );
}

type AiAgentNode = Node<{ label: string, tool: any, }>

export function AIAgentNode({ id, data }: NodeProps<AiAgentNode>) {
  const tool = data.tool;
  const [label, setLabel] = useState(data.label);
  const { updateNodeData } = useReactFlow();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const a = async () => {
      if (!dataFetched) {
        setDataFetched(true);
        setLabel(data.label);

        const res = await getResult(tool);
        // @ts-ignore
        setLabel(res.data.label);
        updateNodeData(id, {
          // @ts-ignore
          label: res.data.label
        });
      }
    };
    a();
  }, [tool, data.label, dataFetched, id, updateNodeData]);

  return (
    <div className={`${baseNodeStyles} bg-purple-500/20 border border-purple-500/50 w-100`}>
      <Handle type="source" position={Position.Bottom} style={{ width: '10px', height: '10px' }} />
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex-shrink-0">🤖</span>
        <div className="whitespace-pre-wrap max-h-48 overflow-y-auto overflow-x-hidden w-full">
          {label.includes('```') || label.includes('#') || label.includes('*') ? (
            <ReactMarkdown>
              {label}
            </ReactMarkdown>
          ) : (
            label
          )}
        </div>
      </div>
    </div>
  );
}

export function DataRetrievalNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-green-500/20 border border-green-500/50`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📊</span>
        {data.label}
      </div>
    </div>
  );
}

export function AnalysisNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-yellow-500/20 border border-yellow-500/50`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📈</span>
        {data.label}
      </div>
    </div>
  );
}

export function VisualizationNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-red-500/20 border border-red-500/50`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>📊</span>
        {data.label}
      </div>
    </div>
  );
}

export function ActionNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-orange-500/20 border border-orange-500/50`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>📤</span>
        {data.label}
      </div>
    </div>
  );
}

interface NodeData {
  label: string;
  tool: {
    args: {
      query?: string;
      startDate?: string;
      endDate?: string;
      period?: number;
      timeframe?: string;
    };
    result?: any;
  };
  status?: 'idle' | 'processing' | 'completed' | 'error';
}

export function HistoricalDataPlotNode({ data, isConnectable }: NodeProps<NodeData>) {
  const { label = '', tool } = data;

  return (
    <div className="bg-[#2a2b36] rounded-lg p-4 shadow-lg border border-gray-700">
      <div className="flex items-center gap-2">
        <span>📈</span>
        {/* Add null check for tool and args */}
        {`${label}${tool?.args?.query ? ` for ${tool.args.query}` : ''}`}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export function CalculateAverageNode({ data }: { data: string }) {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodesData = useNodesData<Node>(connections[0]?.source)?.data || null;

  let average = 0;
  if (nodesData !== null) {
    const prices = Object.entries(nodesData?.prices || {});
    average = prices.reduce((sum, [_, price]) => sum + price.close, 0) / prices.length;
    average = Math.floor(average * 100) / 100;
  }

  return (
    <div className={`${baseNodeStyles} bg-white-500/20 border border-white-500/50`}>
      <Handle type="target" position={Position.Top} style={{ width: '10px', height: '10px' }} />
      <div className="flex items-center gap-2">
        <span>📈</span>
        Average price: {average}
      </div>
    </div>
  )
}
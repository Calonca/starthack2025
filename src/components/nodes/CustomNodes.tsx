import { Handle, Position, useNodeConnections, useNodesData, useReactFlow, 
  type NodeProps,
  type Node,} from '@xyflow/react';
import { useEffect } from 'react';

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

export function AIAgentNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeStyles} bg-purple-500/20 border border-purple-500/50`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center gap-2">
        <span>🤖</span>
        {data.label}
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

type HistoricalDataPlotNode = Node<{ name: string, prices: Array<object> }>
function isHistoricalDataPlotNode(
  node: any,
): node is HistoricalDataPlotNode | undefined {
  return !node ? false : node.type === 'text' || node.type === 'uppercase';
}
export function HistoricalDataPlotNode({ id, data }: 
  NodeProps<HistoricalDataPlotNode> ) {
  // Plots the candle chart for the historical price of a stock
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    updateNodeData(id, {
      prices: data.prices
    })
  }, [])

  return (
    <div className={`${baseNodeStyles} bg-white-500/20 border border-white-500/50`}>
      <div className="flex items-center gap-2">
        <span>📈</span>
        Historical prices for {data.name}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
} 

export function CalculateAverageNode({ data } : { data : string }) {
  // Calculates the average on the prices and outputs the number
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodesData = useNodesData<Node>(connections[0]?.source)?.data || null;
  // const historicalDataPlotNode = isHistoricalDataPlotNode(nodesData) ? nodesData : null;
  // console.log(historicalDataPlotNode)

  let average = 0  
  if(nodesData !== null) {
    for(let key of Object.keys(nodesData?.prices)){
      average += nodesData.prices[key].close
    }
    average /= Object.keys(nodesData?.prices).length
    average *= 100
    average = Math.floor(average)
    average /= 100
  }

  return (
    <div className={`${baseNodeStyles} bg-white-500/20 border border-white-500/50`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>📈</span>
        Average price: {average}
      </div>
    </div>
  )
}

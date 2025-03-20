import { Handle, Position, useNodeConnections, useNodesData, useReactFlow, 
  type NodeProps,
  type Node,} from '@xyflow/react';
import { useEffect } from 'react';
import { baseNodeStyles } from './CustomNodes';

export function CandleChartNode({ data }: { data: { prices: any } }) {
const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodesData = useNodesData<Node>(connections[0]?.source)?.data || null;
  // console.log(historicalDataPlotNode)

  let average = 0  
  if(nodesData !== null) {
    data.prices = nodesData?.prices
    
    for(let key of Object.keys(nodesData?.prices)){
      average += nodesData.prices[key].close
    }
    average /= Object.keys(nodesData?.prices).length
    average *= 100
    average = Math.floor(average)
    average /= 100
  }

  console.log("hey", average)

  return (
    <div className={`${baseNodeStyles} bg-blue-500/20 border border-blue-500/50`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>👤fsf</span>
        {data.label}
        CandleChartNode
      </div>
    </div>
  );
}

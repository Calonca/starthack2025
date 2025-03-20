import { Handle, Position } from '@xyflow/react';

const baseNodeStyles = "px-4 py-2 rounded-lg text-sm font-medium";

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

export function HistoricalDataPlotNode({ data }: { data: { name: string, prices: Array<object> } }) {
  // Plots the candle chart for the historical price of a stock
  return (
    <div className={`${baseNodeStyles} bg-white-500/20 border border-white-500/50`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>📈</span>
        Historical prices for {data.name}
      </div>
    </div>
  );
} 

export function CalculateAverageNode({ data } : { data : { prices: Array<object> }}) {
  // Calculates the average on the prices and outputs the number
  let average = 0
  for(let item of data.prices){
    debugger;
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
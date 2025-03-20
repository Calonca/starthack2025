import { Handle, Position, useNodeConnections, useNodesData, useReactFlow, type Node } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { baseNodeStyles } from './CustomNodes';

function calculateVariance(prices) {
  const closePrices = Object.values(prices).map(priceData => priceData.close);
  const mean = closePrices.reduce((sum, price) => sum + price, 0) / closePrices.length;
  const variance = closePrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / closePrices.length;
  return variance;
}

export function RiskAssessmentNode({ data }) {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({ handleType: 'target' });
  const nodesData = useNodesData<Node>(connections[0]?.source)?.data || null;

  const [rating, setRating] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [emoticon, setEmoticon] = useState('');

  useEffect(() => {
    if (nodesData !== null) {
      const variance = calculateVariance(nodesData.prices);
      if (variance < 0.2) {
        setRating('S&P rating: AAA');
        setBorderColor('border-green-500');
        setEmoticon('😊');
      } else {
        setRating('S&P rating: BB');
        setBorderColor('border-orange-500');
        setEmoticon('😐');
      }
    } else {
        setRating('S&P rating: not available');
        setBorderColor('border-white-500');
        setEmoticon('😐');
    }
  }, [nodesData]);

  return (
    <div className={`${baseNodeStyles} bg-blue-500/20 border ${borderColor}`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span>{emoticon}</span>
        {rating}
      </div>
    </div>
  );
}

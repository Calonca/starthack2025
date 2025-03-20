import { Node } from '@xyflow/react';
import { NodeData } from '@/components/WorkflowGraph';

export async function processNode(node: Node<NodeData>) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  switch (node.type) {
    case 'user_input':
      return { query: 'Sample user query' };
    case 'ai_agent':
      return { response: 'AI analysis complete' };
    case 'data_retrieval':
      return { data: { btc: 50000, eth: 3000 } };
    case 'analysis':
      return { insights: ['Trend is bullish', 'Volume increasing'] };
    case 'visualization':
      return { chart: 'chart_data_url' };
    case 'action':
      return { status: 'Report sent successfully' };
    default:
      throw new Error('Unknown node type');
  }
} 
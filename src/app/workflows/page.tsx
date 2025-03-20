import { WorkflowCard } from '@/components/WorkflowCard';
import Link from 'next/link';

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Workflows</h1>
          <p className="text-gray-400">Manage your AI workflows</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WorkflowCard
          workflow={{
            id: '1',
            name: 'Financial Analysis',
            description: 'Analyze financial data and generate reports',
            status: 'active',
            lastRun: '2h ago',
            assignee: 'AI Assistant',
            prompt: 'Analyze the latest financial data...',
            chatHistory: []
          }}
        />
        {/* Add more workflow cards */}
      </div>
    </div>
  );
} 
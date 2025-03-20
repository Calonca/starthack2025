'use client'
import { Workflow } from '@/types/workflow';
import { useRouter } from 'next/navigation';

type WorkflowCardProps = {
  workflow: Workflow;
};

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const router = useRouter();

  return (
    <div className="bg-[#2a2b36] rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
          <p className="text-gray-400 text-sm">{workflow.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${workflow.status === 'active' ? 'bg-green-500/20 text-green-400' :
            workflow.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-500/20 text-gray-400'
          }`}>
          {workflow.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <span>⏱️</span> Last run: {workflow.lastRun}
        </div>
        <div className="flex items-center gap-1">
          <span>👤</span> {workflow.assignee}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-2">Progress</div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: `${workflow.progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="text-gray-400 hover:text-white px-4 py-2 rounded-lg bg-[#1a1b23]"
          onClick={() => router.push(`/workflow/${workflow.id}`)}
        >
          View Details
        </button>
        <button className="text-gray-400 hover:text-white px-4 py-2">
          Share
        </button>
      </div>
    </div>
  );
} 
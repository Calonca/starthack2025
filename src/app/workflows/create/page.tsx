'use client';

import { WorkflowDetail } from '@/components/WorkflowDetail';
import { Workflow } from '@/types/workflow';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import WorkflowDetail with no SSR
const WorkflowDetailClient = dynamic(
  () => import('@/components/WorkflowDetail').then(mod => mod.WorkflowDetail),
  { ssr: false }
);

const emptyWorkflow: Workflow = {
  id: 'new',
  name: 'New Workflow',
  description: 'Create a new workflow by entering a prompt below',
  status: 'idle',
  lastRun: 'Never',
  assignee: 'AI Assistant',
  prompt: '',
  chatHistory: [],
  progress: 0
};

export default function CreateWorkflowPage() {
  const [workflow, setWorkflow] = useState<Workflow>(emptyWorkflow);

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white p-8">
      <WorkflowDetailClient workflow={workflow} setWorkflow={setWorkflow} />
    </div>
  );
}
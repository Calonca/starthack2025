'use client';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { WorkflowDetail } from '@/components/WorkflowDetail';
import { initialWorkflows } from '@/data/workflows';
import { useParams } from 'next/navigation';

export default function WorkflowPage() {
  const { id } = useParams();
  const workflow = initialWorkflows.find(w => w.id === id);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <main className="p-8">
          <WorkflowDetail workflow={workflow} />
        </main>
      </div>
    </div>
  );
} 
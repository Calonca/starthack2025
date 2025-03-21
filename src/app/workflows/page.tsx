"use client"
import { Toaster } from 'react-hot-toast';
import { WorkflowCard } from '@/components/WorkflowCard';
import { Workflow } from '@/types/workflow';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ImportModalProps {
  data: any; // Replace with proper type if known
  onClose: () => void;
}

interface ImportWorkflowCardProps {
  importWorkflow: () => void;
}

function ImportModal({ data, onClose }: ImportModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1b23] rounded-lg w-[800px] max-h-[80vh] overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Import workflow</h2>
              <p className="text-gray-400"></p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="bg-[#2a2b36] p-4 rounded-lg">
            <textarea
              className="w-full h-64 p-2 bg-[#1a1b23] text-white border border-gray-600 rounded-lg"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
                fontSize: '14px',
              }}
              placeholder="Enter your text here..."
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-[#2a2b36] hover:bg-[#32333e] rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              onClick={() => {
                // Add any action you want
                onClose();
              }}
            >
              Import Workflow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImportWorkflowCard({ importWorkflow }: ImportWorkflowCardProps) {
  return (
    <div className="bg-[#2a2b36] rounded-lg p-6 h-100 cursor-pointer">
      <button
        className="text-white text-lg flex cursor-pointer items-center justify-center w-full h-full"
        onClick={importWorkflow}
      >
        📥 Import
      </button>
    </div>
  );
}

export default function WorkflowsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

  function shareWorkflow(workflow: Workflow) {
    const json = JSON.stringify(workflow, null, 2);

    // Check if the Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      // Use the Clipboard API
      navigator.clipboard.writeText(json).then(
        () => {
          toast.success('Copied to clipboard');
        },
        (err) => {
          console.error('Failed to copy: ', err);
          toast.error('Failed to copy');
        }
      );
    } else {
      // Clipboard API not available or not secure context
      // Fallback to older method if needed
      console.warn('Clipboard API not available');
      toast.error('Clipboard API not available');
    }
  }

  const theWorkflow: Workflow = {
    id: '1',
    name: 'Financial Analysis',
    description: 'Analyze financial data and generate reports',
    status: 'active',
    lastRun: '2h ago',
    assignee: 'AI Assistant',
    prompt: 'Analyze financial data and generate reports',
    chatHistory: [],
    progress: 0 // Add missing progress field
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Workflows</h1>
          <p className="text-gray-400">Manage your AI workflows</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={"cursor-pointer"}>
          <ImportWorkflowCard
            importWorkflow={() => {
              setShowModal(true)
            }}
          />
        </div>

        <WorkflowCard
          workflow={theWorkflow}
          onShare={shareWorkflow}
        />

        {showWorkflow && <WorkflowCard
          workflow={theWorkflow}
          onShare={shareWorkflow}
        />}
        {/* Add more workflow cards */}
      </div>

      <div>
        {
          showModal && <ImportModal data={null} onClose={() => {
            setShowModal(false)
            setShowWorkflow(true)
            toast.success("Workflow imported successfully")
          }} />
        }
      </div>

      <Toaster />
    </div>
  );
} 
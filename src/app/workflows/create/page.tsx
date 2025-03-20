'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Node, Edge } from '@xyflow/react';
import { createWorkflowFromPrompt, getCompanyDescription } from '@/lib/automationLLM';
import { processNode } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  flowComponent?: {
    nodeId: string;
    connectedTo?: string;
  };
}

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
}

export default function CreateWorkflowPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [workflow, setWorkflow] = useState<WorkflowState>({ nodes: [], edges: [] });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to create a new workflow node
  const createWorkflowNode = (type: string, label: string, index: number): Node => {
    return {
      id: `node-${index}`,
      type,
      position: {
        x: 100 + (index * 200),
        y: 100
      },
      data: { label, status: 'idle' }
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    try {
      setIsGenerating(true);

      // Add user message
      const userMessage: Message = {
        role: 'user',
        content: prompt,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);

      // If it's a simple company query, handle it differently
      if (prompt.toLowerCase().startsWith('what is') || prompt.toLowerCase().startsWith('who is')) {
        const companyName = prompt.split(' ').slice(2).join(' ');
        const description = await getCompanyDescription(companyName);

        const assistantMessage: Message = {
          role: 'assistant',
          content: description,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle workflow creation as before
        const workflowPlan = await createWorkflowFromPrompt(prompt);

        // Create nodes and edges from the workflow plan
        const nodes: Node[] = workflowPlan.steps.map((step, index) =>
          createWorkflowNode(step.type, step.input, index)
        );

        const edges: Edge[] = workflowPlan.steps.flatMap((step, index) => {
          if (!step.dependencies?.length) return [];
          return step.dependencies.map(depIndex => ({
            id: `edge-${depIndex}-${index}`,
            source: `node-${depIndex}`,
            target: `node-${index}`,
            type: 'smoothstep'
          }));
        });

        // Update workflow state
        setWorkflow({ nodes, edges });

        // Add assistant message
        const assistantMessage: Message = {
          role: 'assistant',
          content: workflowPlan.description,
          timestamp: Date.now(),
          flowComponent: {
            nodeId: nodes[0].id
          }
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

      // Clear input
      setPrompt('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                  ? 'bg-purple-600/20 text-purple-200'
                  : 'bg-[#2a2b36] text-gray-200'
                  }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.flowComponent && (
                  <div className="mt-2 text-xs text-purple-400">
                    Added workflow component: {message.flowComponent.nodeId}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-[#2a2b36] rounded-lg p-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed prompt input at bottom */}
      <div className="border-t border-gray-800 bg-[#1f2027] p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#2a2b36] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-lg resize-none min-h-[60px] max-h-[150px]"
              placeholder="What kind of financial insights are you looking for?"
              disabled={isGenerating}
              rows={1}
              required
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-500">
              Press Enter to submit
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`px-6 py-3 rounded-lg text-lg shrink-0 transition-colors ${isGenerating || !prompt.trim()
              ? 'bg-purple-600/50 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            {isGenerating ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
} 
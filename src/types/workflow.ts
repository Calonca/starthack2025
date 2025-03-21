export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
};

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'scheduled' | 'completed' | 'error' | 'idle';
  lastRun: string;
  assignee: string;
  prompt: string;
  chatHistory: ChatMessage[];
  progress: number;
} 

export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
};

export type Workflow = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'scheduled' | 'completed';
  progress: number;
  lastRun: string;
  assignee: string;
  chatHistory: ChatMessage[];
  prompt: string;
}; 
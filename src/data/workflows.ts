import { Workflow } from '@/types/workflow';

export const initialWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Bitcoin Analysis',
    description: 'Real-time BTC price analysis with technical indicators',
    status: 'active',
    progress: 75,
    lastRun: '2h ago',
    assignee: 'AI Assistant',
    prompt: 'Create a workflow that analyzes Bitcoin price movements and generates trading signals',
    chatHistory: [
      {
        id: '1',
        content: 'Create a workflow for Bitcoin price analysis',
        role: 'user',
        timestamp: '2024-03-15T10:00:00Z'
      },
      {
        id: '2',
        content: "I'll help you create a workflow for Bitcoin price analysis. What indicators would you like to include?",
        role: 'assistant',
        timestamp: '2024-03-15T10:00:05Z'
      },
      {
        id: '3',
        content: "Let's use RSI, MACD, and Moving Averages",
        role: 'user',
        timestamp: '2024-03-15T10:00:30Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Portfolio Risk Assessment',
    description: 'Multi-asset risk analysis and portfolio optimization',
    status: 'scheduled',
    progress: 30,
    lastRun: '1d ago',
    assignee: 'John Doe',
    prompt: 'Create a workflow that analyzes portfolio risk and optimizes asset allocation',
    chatHistory: [
      {
        id: '1',
        content: 'Create a workflow for portfolio risk assessment',
        role: 'user',
        timestamp: '2024-03-15T10:00:00Z'
      },
      {
        id: '2',
        content: "I'll help you create a workflow for portfolio risk assessment. What is the risk tolerance for this portfolio?",
        role: 'assistant',
        timestamp: '2024-03-15T10:00:05Z'
      },
      {
        id: '3',
        content: "Let's use the Modern Portfolio Theory (MPT) to optimize the portfolio",
        role: 'user',
        timestamp: '2024-03-15T10:00:30Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Market Sentiment',
    description: 'Social media and news sentiment analysis for crypto',
    status: 'completed',
    progress: 100,
    lastRun: '3h ago',
    assignee: 'AI Assistant',
    prompt: 'Create a workflow that analyzes social media and news sentiment for crypto',
    chatHistory: [
      {
        id: '1',
        content: 'Create a workflow for market sentiment analysis',
        role: 'user',
        timestamp: '2024-03-15T10:00:00Z'
      },
      {
        id: '2',
        content: "I'll help you create a workflow for market sentiment analysis. What specific social media platforms and news sources would you like to include?",
        role: 'assistant',
        timestamp: '2024-03-15T10:00:05Z'
      },
      {
        id: '3',
        content: "Let's include Twitter, Reddit, and major news outlets",
        role: 'user',
        timestamp: '2024-03-15T10:00:30Z'
      }
    ]
  }
]; 

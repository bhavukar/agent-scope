export type SpanType = 'user_prompt' | 'llm_reasoning' | 'tool_call' | 'tool_result' | 'agent_output' | 'error';
export type SpanStatus = 'pending' | 'running' | 'success' | 'failed';

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface TraceSpan {
  id: string;
  parentId?: string;
  traceId: string;
  name: string;
  type: SpanType;
  status: SpanStatus;
  startTime: number;
  endTime?: number;
  durationMs?: number;
  input?: Record<string, any> | string;
  output?: Record<string, any> | string;
  error?: string;
  tokens?: TokenUsage;
  metadata?: Record<string, any>;
}

export interface DAGNode {
  id: string;
  label: string;
  type: SpanType;
  status: SpanStatus;
  durationMs?: number;
  tokens?: TokenUsage;
  span: TraceSpan;
}

export interface DAGEdge {
  from: string;
  to: string;
  type: 'causal' | 'data_flow' | 'subagent_delegation';
}

export interface DAGGraph {
  traceId: string;
  nodes: DAGNode[];
  edges: DAGEdge[];
  totalDurationMs: number;
  totalTokens: TokenUsage;
}

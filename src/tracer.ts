import { TraceSpan, DAGGraph, DAGNode, DAGEdge, TokenUsage } from './types.js';

export class AgentTracer {
  private spans: Map<string, TraceSpan> = new Map();
  private traceListeners: Set<(span: TraceSpan) => void> = new Set();

  public onSpanUpdate(listener: (span: TraceSpan) => void): () => void {
    this.traceListeners.add(listener);
    return () => this.traceListeners.delete(listener);
  }

  public startSpan(spanData: Omit<TraceSpan, 'id' | 'startTime' | 'status'> & { id?: string }): TraceSpan {
    const span: TraceSpan = {
      id: spanData.id || `span_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      startTime: Date.now(),
      status: 'running',
      ...spanData
    };
    this.spans.set(span.id, span);
    this.notify(span);
    return span;
  }

  public endSpan(
    spanId: string,
    result?: { output?: any; error?: string; status?: 'success' | 'failed'; tokens?: TokenUsage }
  ): TraceSpan | undefined {
    const span = this.spans.get(spanId);
    if (!span) return undefined;

    span.endTime = Date.now();
    span.durationMs = span.endTime - span.startTime;
    span.status = result?.error ? 'failed' : (result?.status || 'success');
    if (result?.output !== undefined) span.output = result.output;
    if (result?.error !== undefined) span.error = result.error;
    if (result?.tokens !== undefined) span.tokens = result.tokens;

    this.notify(span);
    return span;
  }

  public getTrace(traceId: string): DAGGraph {
    const relevantSpans = Array.from(this.spans.values()).filter((s) => s.traceId === traceId);
    const nodes: DAGNode[] = relevantSpans.map((s) => ({
      id: s.id,
      label: s.name,
      type: s.type,
      status: s.status,
      durationMs: s.durationMs,
      tokens: s.tokens,
      span: s
    }));

    const edges: DAGEdge[] = [];
    for (const s of relevantSpans) {
      if (s.parentId && this.spans.has(s.parentId)) {
        edges.push({
          from: s.parentId,
          to: s.id,
          type: s.type === 'tool_call' ? 'data_flow' : 'causal'
        });
      }
    }

    const totalDuration = relevantSpans.reduce((acc, curr) => acc + (curr.durationMs || 0), 0);
    const totalTokens = relevantSpans.reduce(
      (acc, curr) => ({
        promptTokens: acc.promptTokens + (curr.tokens?.promptTokens || 0),
        completionTokens: acc.completionTokens + (curr.tokens?.completionTokens || 0),
        totalTokens: acc.totalTokens + (curr.tokens?.totalTokens || 0)
      }),
      { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    );

    return {
      traceId,
      nodes,
      edges,
      totalDurationMs: totalDuration,
      totalTokens
    };
  }

  public getAllSpans(): TraceSpan[] {
    return Array.from(this.spans.values());
  }

  private notify(span: TraceSpan): void {
    for (const listener of this.traceListeners) {
      try {
        listener(span);
      } catch (err) {
        console.error('[AgentTracer] Error in span listener:', err);
      }
    }
  }
}

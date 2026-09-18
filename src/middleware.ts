import { AgentTracer } from './tracer.js';

export function createScopeTracerMiddleware(tracer: AgentTracer) {
  return {
    wrapToolCall: async <T>(
      traceId: string,
      toolName: string,
      args: any,
      fn: () => Promise<T>,
      parentId?: string
    ): Promise<T> => {
      const span = tracer.startSpan({
        traceId,
        parentId,
        name: `tool:${toolName}`,
        type: 'tool_call',
        input: args
      });

      try {
        const result = await fn();
        tracer.endSpan(span.id, {
          output: result,
          status: 'success'
        });
        return result;
      } catch (error: any) {
        tracer.endSpan(span.id, {
          error: error?.message || String(error),
          status: 'failed'
        });
        throw error;
      }
    }
  };
}

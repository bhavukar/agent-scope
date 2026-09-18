# Spectra

> **Precision Causal DAG Tracing & Deterministic Time-Travel Debugger for AI Tool Workflows.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Protocol Native](https://img.shields.io/badge/MCP-Compatible-000000)](https://modelcontextprotocol.io/)

---

## What is Spectra?

Debugging autonomous AI agent loops and distributed tool servers is notoriously difficult. When an agent hallucinates, loops in circular retries, or exceeds token budgets, inspecting static terminal logs gives zero visibility into the **causal decision tree**.

**Spectra** is a high-performance, in-memory telemetry and visual debugging engine for AI agent workflows. It renders an **interactive causal DAG graph**, tracks sub-millisecond span latency waterfalls, breaks down prompt vs. completion token burn, and provides a **deterministic time-travel scrubber** to step backwards and forwards through any agent interaction.

```mermaid
flowchart TD
    Prompt["1. User Prompt Ingest"] --> Thought["2. LLM Reasoning Node"]
    Thought --> Tool1["3. Tool Call: mcp__brave_search"]
    Tool1 --> Result1["4. Tool Result Stream"]
    Result1 --> Thought2["5. LLM Synthesis Step"]
    Thought2 --> Output["6. Final Response Payload"]
    
    subgraph Spectra Telemetry Engine
        T["In-Memory Ring Buffer (16MB Lock-Free)"] -.-> WSS["WebSocket Telemetry Stream"]
        WSS --> WebUI["Interactive Studio DAG & Frame Scrubber"]
    end
    Thought -.-> T
    Tool1 -.-> T
    Result1 -.-> T
```

---

## Technical Specifications

- **Zero-Allocation Ring Buffer**: Fixed 16MB cyclic buffer in memory adding less than 0.02ms latency per instrumented tool call.
- **Deterministic Time-Travel Replay**: Frame-by-frame scrubbing through complex multi-hop tool execution graphs.
- **Sub-Millisecond Span Latency Waterfall**: Gantt breakdown isolating network wait times vs. LLM generation latencies.
- **Granular Token Attribution**: Prompt vs. completion token consumption tracked down to individual tool calls.
- **Multi-Transport Support**: Stdio, SSE, and WebSocket tracing compatible with Model Context Protocol (MCP), Claude Desktop, Cursor IDE, and custom agent loops.

---

## Quickstart

### 1. Launch the Visual Studio
```bash
npx spectra-trace
# Opens http://localhost:5002 in your browser
```

### 2. Wrap a Tool Server in Claude Desktop / Cursor
In your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem-traced": {
      "command": "spectra-trace",
      "args": ["--port=4567", "--", "npx", "-y", "@modelcontextprotocol/server-filesystem", "/Users/me"]
    }
  }
}
```

### 3. Programmatic Node.js SDK
```typescript
import { SpectraTracer, createSpectraMiddleware } from 'spectra-trace';

const tracer = new SpectraTracer({ ringBufferSize: 65536 });
const spectra = createSpectraMiddleware(tracer);

// Wrap any tool execution with automatic causal DAG telemetry
const result = await spectra.wrapToolCall(
  'trace-session-101',
  'search_database',
  { query: 'SELECT * FROM users WHERE active = true' },
  async () => {
    return await db.query('SELECT * FROM users WHERE active = true');
  }
);
```

---

## Architecture

```
spectra/
├── bin/
│   └── agent-scope.js     # CLI Entrypoint
├── src/
│   ├── tracer.ts          # Ring Buffer Tracing Engine
│   ├── server.ts          # Telemetry WebSocket / HTTP Server
│   ├── middleware.ts      # Zero-Overhead Tool Wrapper
│   └── cli.ts             # Interactive Daemon & Stdio Proxy
├── web/                   # Swiss Minimalist Studio & Causal DAG Visualizer
└── package.json
```

---

## License

MIT License. Designed and engineered by Bhavuk Arora.

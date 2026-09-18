// Spectra Precision Telemetry Engine — Live Studio Controller

const SCENARIOS = {
  research: {
    title: "Multi-Hop Deep Research",
    totalTime: "412ms",
    promptTokens: "1,750",
    compTokens: "1,090",
    causalDepth: "4 Levels",
    status: "SUCCESS",
    nodes: [
      {
        id: "res_1",
        label: "User Prompt Ingest",
        type: "prompt",
        step: 1,
        x: 15,
        y: 25,
        status: "200 OK",
        duration: "0ms",
        tokens: { prompt: 140, completion: 0, total: 140 },
        parent: "root",
        input: { prompt: "Compare Sonnet 3.7 vs GPT-4.5 tool calling accuracy on MCP benchmarks" },
        output: { parsedIntent: "benchmark_search", entities: ["Claude 3.7 Sonnet", "GPT-4.5", "MCP Benchmarks"] }
      },
      {
        id: "res_2",
        label: "LLM Planning Node",
        type: "thought",
        step: 2,
        x: 45,
        y: 25,
        status: "200 OK",
        duration: "180ms",
        tokens: { prompt: 520, completion: 280, total: 800 },
        parent: "res_1",
        input: { context: "Analyze comparison requirements and formulate tool search query" },
        output: { thought: "Query web search for Q3 eval tables, then scrape the top comparison benchmark.", selectedTool: "mcp__brave_search" }
      },
      {
        id: "res_3",
        label: "mcp__brave_search",
        type: "tool",
        step: 3,
        x: 75,
        y: 25,
        status: "200 OK",
        duration: "142ms",
        tokens: { prompt: 800, completion: 420, total: 1220 },
        parent: "res_2",
        input: { query: "Claude 3.7 Sonnet vs GPT 4.5 agentic benchmark 2026", count: 3 },
        output: {
          results: [
            { title: "2026 Agentic Benchmark: Claude 3.7 vs GPT-4.5", score: "Sonnet 84.2%, GPT-4.5 81.6%" },
            { title: "MCP Tool Accuracy in Complex Refactors", score: "Sonnet leading in schema adherence" }
          ]
        }
      },
      {
        id: "res_4",
        label: "Synthesize Report",
        type: "output",
        step: 4,
        x: 45,
        y: 75,
        status: "200 OK",
        duration: "90ms",
        tokens: { prompt: 290, completion: 390, total: 680 },
        parent: "res_3",
        input: { searchData: "Sonnet 84.2% vs GPT-4.5 81.6% across 500 multi-hop agent tasks" },
        output: { finalAnswer: "Sonnet scored 84.2% on multi-hop tool execution vs GPT-4.5 at 81.6%, showing superior adherence to strict schemas." }
      }
    ]
  },
  refactor: {
    title: "AST Codebase Refactor Loop",
    totalTime: "680ms",
    promptTokens: "2,310",
    compTokens: "1,640",
    causalDepth: "5 Levels",
    status: "SUCCESS",
    nodes: [
      {
        id: "ref_1",
        label: "User Refactor Task",
        type: "prompt",
        step: 1,
        x: 15,
        y: 20,
        status: "200 OK",
        duration: "0ms",
        tokens: { prompt: 180, completion: 0, total: 180 },
        parent: "root",
        input: { prompt: "Migrate all legacy callbacks to async/await in auth.service.ts" },
        output: { targetFile: "src/services/auth.service.ts" }
      },
      {
        id: "ref_2",
        label: "AST Grep Scanner",
        type: "tool",
        step: 2,
        x: 45,
        y: 20,
        status: "200 OK",
        duration: "115ms",
        tokens: { prompt: 410, completion: 240, total: 650 },
        parent: "ref_1",
        input: { pattern: "function(err, res)", path: "src/services/auth.service.ts" },
        output: { matchesFound: 4, lines: [42, 88, 114, 156] }
      },
      {
        id: "ref_3",
        label: "Aegis Policy Interceptor",
        type: "tool",
        step: 3,
        x: 75,
        y: 20,
        status: "200 OK",
        duration: "18ms",
        tokens: { prompt: 150, completion: 50, total: 200 },
        parent: "ref_2",
        input: { action: "write_file", path: "src/services/auth.service.ts" },
        output: { verdict: "ALLOW", secretsRedacted: 0, reason: "Target file is within permitted source directory." }
      },
      {
        id: "ref_4",
        label: "Patch File AST",
        type: "tool",
        step: 4,
        x: 30,
        y: 75,
        status: "200 OK",
        duration: "210ms",
        tokens: { prompt: 1100, completion: 700, total: 1800 },
        parent: "ref_3",
        input: { file: "src/services/auth.service.ts", diffChunks: 4 },
        output: { status: "written", bytesModified: 2430 }
      },
      {
        id: "ref_5",
        label: "Execute Test Suite",
        type: "output",
        step: 5,
        x: 70,
        y: 75,
        status: "200 OK",
        duration: "337ms",
        tokens: { prompt: 470, completion: 650, total: 1120 },
        parent: "ref_4",
        input: { command: "npm test -- auth.service.test.ts" },
        output: { passed: 12, failed: 0, coverage: "98.4%" }
      }
    ]
  },
  resilience: {
    title: "Cascade Recovery Fallback",
    totalTime: "890ms",
    promptTokens: "2,020",
    compTokens: "1,100",
    causalDepth: "4 Levels",
    status: "504 RECOVERED",
    nodes: [
      {
        id: "cas_1",
        label: "Query Primary DB",
        type: "tool",
        step: 1,
        x: 15,
        y: 30,
        status: "TIMEOUT 504",
        duration: "500ms",
        tokens: { prompt: 420, completion: 80, total: 500 },
        parent: "root",
        input: { query: "SELECT * FROM active_subscriptions WHERE org_id = 'org_99'" },
        output: { error: "ETIMEDOUT: Connection pool exhausted on primary db host 10.0.4.12:5432" }
      },
      {
        id: "cas_2",
        label: "Catch & Strategy Switch",
        type: "thought",
        step: 2,
        x: 45,
        y: 30,
        status: "200 OK",
        duration: "140ms",
        tokens: { prompt: 600, completion: 240, total: 840 },
        parent: "cas_1",
        input: { error: "ETIMEDOUT", retryCount: 1 },
        output: { decision: "Primary timed out after 500ms. Rerouting read query to read-replica-02.us-east.internal" }
      },
      {
        id: "cas_3",
        label: "Query Read Replica",
        type: "tool",
        step: 3,
        x: 75,
        y: 30,
        status: "200 OK",
        duration: "45ms",
        tokens: { prompt: 420, completion: 380, total: 800 },
        parent: "cas_2",
        input: { host: "read-replica-02", query: "SELECT * FROM active_subscriptions WHERE org_id = 'org_99'" },
        output: { rowCount: 1, plan: "Enterprise Annual", seats: 250, active: true }
      },
      {
        id: "cas_4",
        label: "Deliver Resilient Response",
        type: "output",
        step: 4,
        x: 45,
        y: 75,
        status: "200 OK",
        duration: "205ms",
        tokens: { prompt: 580, completion: 400, total: 980 },
        parent: "cas_3",
        input: { subscription: "Enterprise Annual", seats: 250 },
        output: { response: "Successfully retrieved enterprise account data with zero downtime via secondary replica." }
      }
    ]
  }
};

let currentScenarioKey = 'research';
let currentStep = 4;
let activeNodeId = 'res_4';
let isPlaying = false;
let playInterval = null;
let activeView = 'dag';

document.addEventListener('DOMContentLoaded', () => {
  setupViewTabs();
  setupScenarioCards();
  setupScrubber();
  setupPlayback();
  setupMatrixTabs();
  renderCurrentState();
});

// View Switcher (DAG, Frames, Waterfall, Events)
function setupViewTabs() {
  const tabs = document.querySelectorAll('.view-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeView = tab.dataset.view;

      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(`view-${activeView}`);
      if (targetPanel) targetPanel.classList.add('active');

      const viewLabels = {
        dag: 'DAG Topology',
        frames: 'Step Frames',
        waterfall: 'Flame Waterfall',
        events: 'Event Bus'
      };
      document.getElementById('active-view-breadcrumb').textContent = viewLabels[activeView] || 'DAG Topology';

      if (activeView === 'dag') {
        const scenario = SCENARIOS[currentScenarioKey];
        drawConnectors(scenario);
      }
    });
  });
}

// Scenario Selection
function setupScenarioCards() {
  const cards = document.querySelectorAll('.scenario-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentScenarioKey = card.dataset.scenario;
      const scenario = SCENARIOS[currentScenarioKey];
      currentStep = scenario.nodes.length;
      activeNodeId = scenario.nodes[scenario.nodes.length - 1].id;

      const slider = document.getElementById('time-slider');
      slider.max = scenario.nodes.length;
      slider.value = currentStep;

      document.getElementById('active-scenario-breadcrumb').textContent = scenario.title;
      document.getElementById('scenario-meta-tag').textContent = `${scenario.nodes.length} SPANS`;

      renderCurrentState();
    });
  });
}

// Scrubber Controls
function setupScrubber() {
  const slider = document.getElementById('time-slider');
  slider.addEventListener('input', (e) => {
    currentStep = parseInt(e.target.value, 10);
    updateStepState();
  });
}

// Playback Deck
function setupPlayback() {
  const playBtn = document.getElementById('btn-play-pause');
  const prevBtn = document.getElementById('btn-step-prev');
  const nextBtn = document.getElementById('btn-step-next');
  const resetBtn = document.getElementById('btn-reset');

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  });

  prevBtn.addEventListener('click', () => {
    pausePlayback();
    if (currentStep > 1) {
      currentStep--;
      document.getElementById('time-slider').value = currentStep;
      updateStepState();
    }
  });

  nextBtn.addEventListener('click', () => {
    pausePlayback();
    const maxSteps = SCENARIOS[currentScenarioKey].nodes.length;
    if (currentStep < maxSteps) {
      currentStep++;
      document.getElementById('time-slider').value = currentStep;
      updateStepState();
    }
  });

  resetBtn.addEventListener('click', () => {
    pausePlayback();
    currentStep = 1;
    document.getElementById('time-slider').value = currentStep;
    updateStepState();
  });
}

function startPlayback() {
  isPlaying = true;
  document.getElementById('btn-play-pause').textContent = 'Pause';
  const maxSteps = SCENARIOS[currentScenarioKey].nodes.length;
  if (currentStep >= maxSteps) currentStep = 0;

  playInterval = setInterval(() => {
    if (currentStep < maxSteps) {
      currentStep++;
      document.getElementById('time-slider').value = currentStep;
      updateStepState();
    } else {
      pausePlayback();
    }
  }, 1200);
}

function pausePlayback() {
  isPlaying = false;
  document.getElementById('btn-play-pause').textContent = 'Play';
  if (playInterval) clearInterval(playInterval);
}

function renderCurrentState() {
  const scenario = SCENARIOS[currentScenarioKey];

  // Update session ledger
  document.getElementById('stat-total-time').textContent = scenario.totalTime;
  document.getElementById('stat-prompt-tokens').textContent = scenario.promptTokens;
  document.getElementById('stat-comp-tokens').textContent = scenario.compTokens;
  document.getElementById('stat-causal-depth').textContent = scenario.causalDepth;
  document.getElementById('step-count-text').textContent = `FRAME ${currentStep} / ${scenario.nodes.length}`;

  renderDAG(scenario);
  renderFrames(scenario);
  renderWaterfall(scenario);

  const activeNode = scenario.nodes.find(n => n.id === activeNodeId) || scenario.nodes[0];
  updateInspector(activeNode);
}

function updateStepState() {
  const scenario = SCENARIOS[currentScenarioKey];
  const activeNodes = scenario.nodes.filter(n => n.step <= currentStep);
  if (activeNodes.length > 0) {
    activeNodeId = activeNodes[activeNodes.length - 1].id;
  }
  document.getElementById('step-count-text').textContent = `FRAME ${currentStep} / ${scenario.nodes.length}`;

  // Update node classes in DAG
  document.querySelectorAll('.dag-node').forEach(el => {
    const id = el.dataset.id;
    const node = scenario.nodes.find(n => n.id === id);
    if (node) {
      if (node.step > currentStep) {
        el.classList.add('dimmed');
      } else {
        el.classList.remove('dimmed');
      }

      if (node.id === activeNodeId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  drawConnectors(scenario);
  renderFrames(scenario);
  const activeNode = scenario.nodes.find(n => n.id === activeNodeId);
  if (activeNode) updateInspector(activeNode);
}

function renderDAG(scenario) {
  const container = document.getElementById('dag-nodes-layer');
  container.innerHTML = '';

  scenario.nodes.forEach(node => {
    const el = document.createElement('div');
    el.className = `dag-node ${node.id === activeNodeId ? 'active' : ''} ${node.step > currentStep ? 'dimmed' : ''}`;
    el.style.left = `${node.x}%`;
    el.style.top = `${node.y}%`;
    el.dataset.id = node.id;

    const isErr = node.status.includes('504');
    el.innerHTML = `
      <div class="node-top">
        <span class="node-type-tag">${node.type.toUpperCase()}</span>
        <span class="node-status-tag ${isErr ? 'err' : 'ok'}">${node.status}</span>
      </div>
      <div class="node-title">${node.label}</div>
      <div class="node-footer">
        <span class="node-dur">${node.duration}</span>
        <span class="node-tok">${node.tokens.total} tok</span>
      </div>
    `;

    el.addEventListener('click', () => {
      activeNodeId = node.id;
      document.querySelectorAll('.dag-node').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
      updateInspector(node);
    });

    container.appendChild(el);
  });

  setTimeout(() => drawConnectors(scenario), 50);
}

function drawConnectors(scenario) {
  const svg = document.getElementById('dag-svg-layer');
  if (!svg) return;
  svg.innerHTML = '';
  const width = svg.clientWidth || 800;
  const height = svg.clientHeight || 480;

  const nodeMap = new Map(scenario.nodes.map(n => [n.id, n]));

  scenario.nodes.forEach(node => {
    if (node.parent && node.parent !== 'root') {
      const parent = nodeMap.get(node.parent);
      if (parent) {
        const x1 = (parent.x / 100) * width + 110;
        const y1 = (parent.y / 100) * height + 35;
        const x2 = (node.x / 100) * width + 110;
        const y2 = (node.y / 100) * height + 35;

        const isDimmed = node.step > currentStep;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const cx1 = x1 + (x2 - x1) * 0.5;
        const cy1 = y1;
        const cx2 = x1 + (x2 - x1) * 0.5;
        const cy2 = y2;

        path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
        path.setAttribute('stroke', isDimmed ? '#e4e4e7' : '#09090b');
        path.setAttribute('stroke-width', isDimmed ? '1.5' : '2');
        path.setAttribute('fill', 'none');
        if (isDimmed) path.setAttribute('stroke-dasharray', '4 4');

        svg.appendChild(path);
      }
    }
  });
}

function renderFrames(scenario) {
  const container = document.getElementById('frames-feed');
  if (!container) return;
  container.innerHTML = '';

  const visibleNodes = scenario.nodes.filter(n => n.step <= currentStep);

  visibleNodes.forEach(node => {
    const card = document.createElement('div');
    card.className = 'frame-card';
    card.innerHTML = `
      <div class="frame-header">
        <span class="frame-step">FRAME 0${node.step} / ${node.label}</span>
        <span class="frame-dur">${node.duration} | ${node.tokens.total} tokens</span>
      </div>
      <div class="frame-reasoning">Span ID: <code>${node.id}</code> (Parent: <code>${node.parent}</code>)</div>
      <pre class="frame-raw-box"><code>${JSON.stringify(node.output, null, 2)}</code></pre>
    `;
    container.appendChild(card);
  });
}

function renderWaterfall(scenario) {
  const container = document.getElementById('waterfall-rows');
  if (!container) return;
  container.innerHTML = '';

  const maxDur = 500;

  scenario.nodes.forEach(node => {
    const durNum = parseInt(node.duration.replace('ms', ''), 10) || 15;
    const widthPct = Math.min(100, Math.max(10, (durNum / maxDur) * 100));
    const isErr = node.status.includes('504');

    const row = document.createElement('div');
    row.className = 'wf-row';
    row.innerHTML = `
      <span class="wf-name">${node.label}</span>
      <div class="wf-track">
        <div class="wf-fill ${isErr ? 'err' : ''}" style="width: ${widthPct}%;"></div>
      </div>
      <span class="wf-tokens">${node.tokens.prompt} in / ${node.tokens.completion} out</span>
    `;
    container.appendChild(row);
  });
}

function updateInspector(node) {
  if (!node) return;
  document.getElementById('insp-type-badge').textContent = node.type.toUpperCase();
  document.getElementById('insp-node-name').textContent = node.label;
  document.getElementById('insp-status-badge').textContent = node.status;
  document.getElementById('insp-duration').textContent = node.duration;

  document.getElementById('insp-input-json').textContent = JSON.stringify(node.input, null, 2);
  document.getElementById('insp-output-json').textContent = JSON.stringify(node.output, null, 2);
}

// Event Bus Injector Mock
let eventCounter = 1;
window.emitMockEvent = function(type) {
  const stream = document.getElementById('event-bus-stream');
  if (!stream) return;

  const now = new Date();
  const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')}`;

  const item = document.createElement('div');
  if (type === 'tool_call') {
    item.className = 'event-item tool';
    item.innerHTML = `<span class="ev-time">[${timeStr}]</span> <span class="ev-type">TOOL_CALL</span> <span class="ev-msg">Span #${eventCounter++} tools/call: mcp__database_query ({ host: "replica-02", rows: 1 }) -> 200 OK (22ms)</span>`;
  } else if (type === 'latency_spike') {
    item.className = 'event-item warn';
    item.innerHTML = `<span class="ev-time">[${timeStr}]</span> <span class="ev-type">LATENCY_WARN</span> <span class="ev-msg">Network transport delay detected on socket #4. RTT spiked to 1420ms (Threshold: 500ms)</span>`;
  } else if (type === 'context_surge') {
    item.className = 'event-item err';
    item.innerHTML = `<span class="ev-time">[${timeStr}]</span> <span class="ev-type">CONTEXT_SURGE</span> <span class="ev-msg">Prompt payload exceeded 14,000 tokens in subagent recursion frame #3. Token rate throttled.</span>`;
  }

  stream.appendChild(item);
  stream.scrollTop = stream.scrollHeight;
};

window.clearEventLog = function() {
  const stream = document.getElementById('event-bus-stream');
  if (stream) {
    stream.innerHTML = '<div class="event-item info"><span class="ev-time">[00:00.00]</span> <span class="ev-type">FLUSH</span> <span class="ev-msg">Event bus cleared. Listening for incoming JSON-RPC telemetry spans...</span></div>';
  }
};

// Protocol Integration Tabs
function setupMatrixTabs() {
  const tabs = document.querySelectorAll('.matrix-tab');
  const title = document.getElementById('matrix-code-title');
  const codeBox = document.getElementById('matrix-code-body');

  const configs = {
    cli: {
      title: 'CLI Quickstart',
      code: `# Launch telemetry proxy directly
npx spectra-trace

# Wrap a running MCP server on port 4567
npx spectra-trace --port 4567 --wrap "npx @modelcontextprotocol/server-postgres"`
    },
    claude: {
      title: 'Claude Desktop Integration',
      code: `// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "filesystem-scoped": {
      "command": "spectra-trace",
      "args": ["--port=4567", "--", "npx", "-y", "@modelcontextprotocol/server-filesystem", "/Users/me"]
    }
  }
}`
    },
    cursor: {
      title: 'Cursor IDE Tracing',
      code: `// .cursor/mcp.json
{
  "mcpServers": {
    "git-scoped": {
      "command": "spectra-trace",
      "args": ["--port=4567", "--", "npx", "-y", "@modelcontextprotocol/server-git", "."]
    }
  }
}`
    },
    sdk: {
      title: 'Node.js SDK',
      code: `import { SpectraTracer, createSpectraMiddleware } from 'spectra-trace';

const tracer = new SpectraTracer({ ringBufferSize: 65536 });
const spectra = createSpectraMiddleware(tracer);

// Wrap any tool execution with automatic causal DAG telemetry
const result = await spectra.wrapToolCall('session_99', 'execute_sql', { query: 'SELECT 1' }, async () => {
  return await db.query('SELECT 1');
});`
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cfg = configs[tab.dataset.cfg] || configs.cli;
      title.textContent = cfg.title;
      codeBox.textContent = cfg.code;
    });
  });
}

window.copyCli = function() {
  navigator.clipboard.writeText('npx spectra-trace').then(() => {
    alert('Copied "npx spectra-trace" to clipboard.');
  });
};

window.copyMatrixCode = function() {
  const code = document.getElementById('matrix-code-body').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert('Configuration copied to clipboard.');
  });
};

window.copyActivePayload = function(type) {
  const scenario = SCENARIOS[currentScenarioKey];
  const node = scenario.nodes.find(n => n.id === activeNodeId);
  if (node) {
    const data = type === 'input' ? node.input : node.output;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      alert(`Copied ${type} payload to clipboard.`);
    });
  }
};


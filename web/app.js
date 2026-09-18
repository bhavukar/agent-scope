// Agent-Scope Live DAG & Time-Travel State Machine

const SCENARIOS = {
  research: {
    title: "Multi-Hop Deep Research Agent",
    totalTime: "412ms",
    totalTokens: "2,840",
    status: "SUCCESS",
    nodes: [
      {
        id: "step_1",
        label: "User Prompt",
        type: "prompt",
        step: 1,
        x: 18,
        y: 20,
        status: "200 OK",
        duration: "0ms",
        tokens: { prompt: 140, completion: 0, total: 140 },
        parent: "root",
        input: {
          prompt: "Find the latest Q3 benchmark comparing Claude 3.7 Sonnet vs GPT-4.5 for tool-use agents"
        },
        output: {
          parsedIntent: "benchmark_search",
          entities: ["Claude 3.7 Sonnet", "GPT-4.5", "MCP Tool-Use"]
        }
      },
      {
        id: "step_2",
        label: "LLM Reasoning Plan",
        type: "thought",
        step: 2,
        x: 50,
        y: 20,
        status: "200 OK",
        duration: "180ms",
        tokens: { prompt: 210, completion: 320, total: 530 },
        parent: "step_1",
        input: {
          context: "Analyze comparison requirements and formulate tool search query"
        },
        output: {
          thought: "I need to query web search for recent benchmarks and then scrape the top comparison table.",
          selectedTool: "mcp__brave_search",
          query: "Claude 3.7 Sonnet vs GPT 4.5 agentic benchmark 2026"
        }
      },
      {
        id: "step_3",
        label: "mcp__brave_search",
        type: "tool",
        step: 3,
        x: 82,
        y: 20,
        status: "200 OK",
        duration: "142ms",
        tokens: { prompt: 580, completion: 420, total: 1000 },
        parent: "step_2",
        input: {
          query: "Claude 3.7 Sonnet vs GPT 4.5 agentic benchmark 2026",
          count: 3
        },
        output: {
          results: [
            { title: "2026 Agentic Benchmark: Claude 3.7 vs GPT-4.5", score: "Sonnet 84.2%, GPT-4.5 81.6%", url: "https://evals.ai/q3" },
            { title: "MCP Tool Accuracy in Complex Refactors", score: "Sonnet leading in deterministic tool calling" }
          ]
        }
      },
      {
        id: "step_4",
        label: "Synthesize Report",
        type: "output",
        step: 4,
        x: 50,
        y: 75,
        status: "200 OK",
        duration: "90ms",
        tokens: { prompt: 820, completion: 350, total: 1170 },
        parent: "step_3",
        input: {
          searchData: "Sonnet 84.2% vs GPT-4.5 81.6% across 500 multi-hop agent tasks"
        },
        output: {
          finalAnswer: "According to Q3 benchmarks, Claude 3.7 Sonnet scored 84.2% on multi-hop tool execution vs GPT-4.5 at 81.6%, showing superior adherence to strict MCP schemas."
        }
      }
    ]
  },
  refactor: {
    title: "Codebase Refactor Loop",
    totalTime: "680ms",
    totalTokens: "3,950",
    status: "SUCCESS",
    nodes: [
      {
        id: "ref_1",
        label: "User Request",
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
        tokens: { prompt: 310, completion: 240, total: 550 },
        parent: "ref_1",
        input: { pattern: "function(err, res)", path: "src/services/auth.service.ts" },
        output: { matchesFound: 4, lines: [42, 88, 114, 156] }
      },
      {
        id: "ref_3",
        label: "Policy Firewall (mcp-shield)",
        type: "tool",
        step: 3,
        x: 78,
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
        tokens: { prompt: 1200, completion: 600, total: 1800 },
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
        tokens: { prompt: 620, completion: 600, total: 1220 },
        parent: "ref_4",
        input: { command: "npm test -- auth.service.test.ts" },
        output: { passed: 12, failed: 0, coverage: "98.4%" }
      }
    ]
  },
  resilience: {
    title: "Resilient API Recovery",
    totalTime: "890ms",
    totalTokens: "3,120",
    status: "RECOVERED",
    nodes: [
      {
        id: "res_1",
        label: "Query Primary DB",
        type: "tool",
        step: 1,
        x: 18,
        y: 35,
        status: "TIMEOUT 504",
        duration: "500ms",
        tokens: { prompt: 420, completion: 80, total: 500 },
        parent: "root",
        input: { query: "SELECT * FROM active_subscriptions WHERE org_id = 'org_99'" },
        output: { error: "ETIMEDOUT: Connection pool exhausted on primary db host 10.0.4.12:5432" }
      },
      {
        id: "res_2",
        label: "Catch & Strategy Switch",
        type: "thought",
        step: 2,
        x: 50,
        y: 35,
        status: "200 OK",
        duration: "140ms",
        tokens: { prompt: 600, completion: 240, total: 840 },
        parent: "res_1",
        input: { error: "ETIMEDOUT", retryCount: 1 },
        output: {
          decision: "Primary timed out after 500ms. Rerouting read query to read-replica-02.us-east.internal"
        }
      },
      {
        id: "res_3",
        label: "Query Read Replica",
        type: "tool",
        step: 3,
        x: 82,
        y: 35,
        status: "200 OK",
        duration: "45ms",
        tokens: { prompt: 420, completion: 380, total: 800 },
        parent: "res_2",
        input: { host: "read-replica-02", query: "SELECT * FROM active_subscriptions WHERE org_id = 'org_99'" },
        output: { rowCount: 1, plan: "Enterprise Annual", seats: 250, active: true }
      },
      {
        id: "res_4",
        label: "Deliver Resilient Response",
        type: "output",
        step: 4,
        x: 50,
        y: 80,
        status: "200 OK",
        duration: "205ms",
        tokens: { prompt: 580, completion: 400, total: 980 },
        parent: "res_3",
        input: { subscription: "Enterprise Annual", seats: 250 },
        output: { response: "Successfully retrieved enterprise account data with zero downtime via secondary replica." }
      }
    ]
  }
};

let currentScenarioKey = 'research';
let currentStep = 4;
let activeNodeId = null;
let isPlaying = false;
let playInterval = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupScenarioTabs();
  setupScrubber();
  setupPlayback();
  setupConfigTabs();
  renderScenario(currentScenarioKey);
});

function setupScenarioTabs() {
  const tabs = document.querySelectorAll('.scenario-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentScenarioKey = tab.dataset.scenario;
      const scenario = SCENARIOS[currentScenarioKey];
      currentStep = scenario.nodes.length;
      document.getElementById('time-slider').max = currentStep;
      document.getElementById('time-slider').value = currentStep;
      renderScenario(currentScenarioKey);
    });
  });
}

function setupScrubber() {
  const slider = document.getElementById('time-slider');
  slider.addEventListener('input', (e) => {
    currentStep = parseInt(e.target.value, 10);
    updateTimelineState();
  });
}

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
      updateTimelineState();
    }
  });

  nextBtn.addEventListener('click', () => {
    pausePlayback();
    const maxSteps = SCENARIOS[currentScenarioKey].nodes.length;
    if (currentStep < maxSteps) {
      currentStep++;
      document.getElementById('time-slider').value = currentStep;
      updateTimelineState();
    }
  });

  resetBtn.addEventListener('click', () => {
    pausePlayback();
    currentStep = 1;
    document.getElementById('time-slider').value = currentStep;
    updateTimelineState();
  });
}

function startPlayback() {
  isPlaying = true;
  document.getElementById('play-icon').textContent = 'Pause';
  const maxSteps = SCENARIOS[currentScenarioKey].nodes.length;
  if (currentStep >= maxSteps) currentStep = 0;

  playInterval = setInterval(() => {
    if (currentStep < maxSteps) {
      currentStep++;
      document.getElementById('time-slider').value = currentStep;
      updateTimelineState();
    } else {
      pausePlayback();
    }
  }, 1200);
}

function pausePlayback() {
  isPlaying = false;
  document.getElementById('play-icon').textContent = 'Play';
  if (playInterval) clearInterval(playInterval);
}

function renderScenario(key) {
  const scenario = SCENARIOS[key];
  document.getElementById('stat-total-time').textContent = scenario.totalTime;
  document.getElementById('stat-total-tokens').textContent = scenario.totalTokens;
  document.getElementById('stat-overall-status').textContent = scenario.status;

  const slider = document.getElementById('time-slider');
  slider.max = scenario.nodes.length;
  slider.value = currentStep;

  // Default active node to the last active node
  const activeNodes = scenario.nodes.filter(n => n.step <= currentStep);
  activeNodeId = activeNodes[activeNodes.length - 1]?.id || scenario.nodes[0].id;

  renderDAGGraph(scenario);
  updateInspector(scenario.nodes.find(n => n.id === activeNodeId));
  renderWaterfall(scenario);
  updateTimelineLabel();
}

function renderDAGGraph(scenario) {
  const nodesContainer = document.getElementById('dag-nodes-layer');
  const svgLayer = document.getElementById('dag-svg-layer');
  nodesContainer.innerHTML = '';
  svgLayer.innerHTML = '';

  const nodes = scenario.nodes;

  // Render Nodes
  nodes.forEach(node => {
    const el = document.createElement('div');
    el.className = `dag-node ${node.id === activeNodeId ? 'active' : ''} ${node.step > currentStep ? 'dimmed' : ''}`;
    el.style.left = `${node.x}%`;
    el.style.top = `${node.y}%`;
    el.dataset.id = node.id;

    let tagClass = 'node-type-tool';
    if (node.type === 'prompt') tagClass = 'node-type-prompt';
    if (node.type === 'thought') tagClass = 'node-type-thought';
    if (node.type === 'error' || node.status.includes('504')) tagClass = 'node-type-error';
    if (node.type === 'output') tagClass = 'node-type-output';

    el.innerHTML = `
      <div class="dag-node-header">
        <span class="node-type-tag ${tagClass}">${node.type}</span>
        <span class="node-status-dot ${node.status.includes('504') ? 'error' : ''}"></span>
      </div>
      <div class="node-label" title="${node.label}">${node.label}</div>
      <div class="node-meta">
        <span>${node.duration}</span>
        <span>${node.tokens.total} tok</span>
      </div>
    `;

    el.addEventListener('click', () => {
      activeNodeId = node.id;
      document.querySelectorAll('.dag-node').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
      updateInspector(node);
    });

    nodesContainer.appendChild(el);
  });

  // Render SVG Connectors
  drawConnectors(scenario);
}

function drawConnectors(scenario) {
  const svgLayer = document.getElementById('dag-svg-layer');
  const nodesMap = new Map(scenario.nodes.map(n => [n.id, n]));
  const canvas = document.getElementById('dag-canvas');
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  scenario.nodes.forEach(node => {
    if (node.parent && node.parent !== 'root') {
      const parentNode = nodesMap.get(node.parent);
      if (parentNode) {
        const x1 = (parentNode.x / 100) * width;
        const y1 = (parentNode.y / 100) * height;
        const x2 = (node.x / 100) * width;
        const y2 = (node.y / 100) * height;

        const isDimmed = node.step > currentStep;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const cx1 = x1 + (x2 - x1) * 0.5;
        const cy1 = y1;
        const cx2 = x1 + (x2 - x1) * 0.5;
        const cy2 = y2;

        path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
        path.setAttribute('stroke', isDimmed ? '#e4e4e7' : '#18181b');
        path.setAttribute('stroke-width', isDimmed ? '1.5' : '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', isDimmed ? '4 4' : 'none');

        svgLayer.appendChild(path);
      }
    }
  });
}

function updateTimelineState() {
  const scenario = SCENARIOS[currentScenarioKey];
  const activeNodes = scenario.nodes.filter(n => n.step <= currentStep);
  if (activeNodes.length > 0) {
    activeNodeId = activeNodes[activeNodes.length - 1].id;
  }

  // Update node classes
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
  const activeNode = scenario.nodes.find(n => n.id === activeNodeId);
  if (activeNode) updateInspector(activeNode);
  updateTimelineLabel();
}

function updateTimelineLabel() {
  const max = SCENARIOS[currentScenarioKey].nodes.length;
  const label = document.getElementById('step-indicator');
  if (currentStep === max) {
    label.textContent = `Step ${currentStep} / ${max} (Complete)`;
  } else {
    label.textContent = `Step ${currentStep} / ${max} (Replaying...)`;
  }
}

function updateInspector(node) {
  if (!node) return;
  document.getElementById('insp-type-badge').textContent = node.type.toUpperCase();
  document.getElementById('insp-node-name').textContent = node.label;
  document.getElementById('insp-status-badge').textContent = node.status;
  document.getElementById('insp-duration').textContent = node.duration;
  document.getElementById('insp-tokens').textContent = `${node.tokens.total.toLocaleString()} (${node.tokens.prompt} in / ${node.tokens.completion} out)`;
  document.getElementById('insp-parent').textContent = node.parent;

  document.getElementById('insp-input-json').textContent = JSON.stringify(node.input, null, 2);
  document.getElementById('insp-output-json').textContent = JSON.stringify(node.output, null, 2);
}

function renderWaterfall(scenario) {
  const container = document.getElementById('waterfall-bars');
  container.innerHTML = '';

  const maxDuration = 500; // ms baseline

  scenario.nodes.forEach(node => {
    const durNum = parseInt(node.duration.replace('ms', ''), 10) || 10;
    const widthPct = Math.min(100, Math.max(8, (durNum / maxDuration) * 100));

    const row = document.createElement('div');
    row.className = 'waterfall-row';
    row.innerHTML = `
      <span class="waterfall-row-name" title="${node.label}">${node.label}</span>
      <div class="waterfall-track">
        <div class="waterfall-fill" style="width: ${widthPct}%; background: ${node.status.includes('504') ? '#ef4444' : '#18181b'};"></div>
      </div>
      <span class="waterfall-row-time">${node.duration}</span>
    `;
    container.appendChild(row);
  });
}

function setupConfigTabs() {
  const tabs = document.querySelectorAll('.config-tab');
  const codeBox = document.getElementById('config-code-content');

  const configs = {
    cli: `# 1. Install or launch directly via npx
npx spectra-trace

# 2. Or attach to a running tool server on custom port
npx spectra-trace --port 4567 --wrap "npx @modelcontextprotocol/server-postgres"`,
    claude: `// claude_desktop_config.json
{
  "mcpServers": {
    "filesystem-scoped": {
      "command": "spectra-trace",
      "args": ["--port=4567", "--", "npx", "-y", "@modelcontextprotocol/server-filesystem", "/Users/me/Documents"]
    }
  }
} `,
    cursor: `// .cursor/mcp.json
{
  "mcpServers": {
    "git-scoped": {
      "command": "spectra-trace",
      "args": ["--port=4567", "--", "npx", "-y", "@modelcontextprotocol/server-git", "."]
    }
  }
} `,
    sdk: `import { SpectraTracer, createSpectraMiddleware } from 'spectra-trace';

const tracer = new SpectraTracer();
const scope = createSpectraMiddleware(tracer);

// Wrap any tool execution with automatic DAG span telemetry
const result = await scope.wrapToolCall('trace-session-101', 'execute_sql', { query: 'SELECT * FROM users' }, async () => {
  return await db.query('SELECT * FROM users');
});`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      codeBox.textContent = configs[tab.dataset.tab] || '';
    });
  });
}

window.copyCli = function() {
  navigator.clipboard.writeText('npx spectra-trace').then(() => {
    alert('Copied "npx spectra-trace" to clipboard.');
  });
};

window.copyConfigCode = function() {
  const code = document.getElementById('config-code-content').textContent;
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
      alert(`Copied ${type} JSON to clipboard.`);
    });
  }
};

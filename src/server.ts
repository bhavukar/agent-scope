import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { AgentTracer } from './tracer.js';

export interface ServerOptions {
  port?: number;
  tracer?: AgentTracer;
}

export function startScopeServer(options: ServerOptions = {}) {
  const port = options.port || 4567;
  const tracer = options.tracer || new AgentTracer();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const webDir = path.resolve(__dirname, '../web');

  const server = http.createServer((req, res) => {
    let filePath = path.join(webDir, req.url === '/' ? 'index.html' : req.url || 'index.html');
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png'
    };

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`500 Internal Error: ${err.message}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      }
    });
  });

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    // Send initial history
    ws.send(JSON.stringify({ type: 'init', spans: tracer.getAllSpans() }));

    // Listen for client commands (e.g. inject simulated traces)
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'span:start') {
          tracer.startSpan(msg.payload);
        } else if (msg.type === 'span:end') {
          tracer.endSpan(msg.payload.id, msg.payload.result);
        }
      } catch (err) {
        console.error('[ScopeServer] Invalid WS message:', err);
      }
    });
  });

  // Stream updates to connected web clients
  tracer.onSpanUpdate((span) => {
    const payload = JSON.stringify({ type: 'span_update', span });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  });

  server.listen(port, () => {
    console.log(`\x1b[32m[Agent-Scope]\x1b[0m Visual Debugger Live at \x1b[36mhttp://localhost:${port}\x1b[0m`);
  });

  return { server, wss, tracer };
}

#!/usr/bin/env node
import { startScopeServer } from './server.js';

const port = parseInt(process.env.PORT || '4567', 10);
startScopeServer({ port });

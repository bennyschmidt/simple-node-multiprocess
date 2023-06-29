/**
 * A super simple Node.js multi-process API setup:
 * - Parallelize your API
 * - Simple boilerplate to get started
 * - Deploy 1 app over a single port
 */

const { availableParallelism } = require('node:os');
const process = require('node:process');
const cluster = require('node:cluster');
const http = require('node:http');

const HOST = 'http://localhost';
const PORT = 8000;

/**
 * Config
 */

const numCPUs = availableParallelism();

const onCluster = require('./events/cluster');
const onWorker = require('./events/worker');

/**
 * Main
 * A primary instance that serves as the load balancer
 * and manages child lifecycle events
 */

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    onWorker(cluster.fork());
  }

  onCluster(cluster);
} else {
  const ApiGateway = require('./api');

  /**
   * Server
   * A server instance for each CPU core
   */

  const server = http.createServer(ApiGateway(cluster));

  server.listen(PORT);
}

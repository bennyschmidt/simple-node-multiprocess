/**
 * API Gateway
 * Handles incoming HTTP requests
 */

const Routes = {
  GET: {
    '/v1/todos': require('./get/todos')
  },
  POST: {
    '/v1/create': require('./post/create')
  }
};

module.exports = cluster => (req, res) => {
  console.log(`Request handled by Worker #${cluster.worker.id}`);

  try {
    Routes[req.method]?.[req.url]?.(req, res);
  } catch (error) {
    console.log('API error:', error);
  }
};

/**
 * API Gateway
 * Handles incoming HTTP requests
 */

const getTodos = require('./get/todos');
const postCreate = require('./post/create');

module.exports = cluster => (req, res) => {
  console.log(`Request handled by Worker #${cluster.worker.id}`);

  // /v1/todos : GET

  if (req.url === '/v1/todos' && req.method === 'GET') {
    return getTodos(req, res);
  }

  // /v1/create : POST

  if (req.url === '/v1/create' && req.method === 'POST') {
    return postCreate(req, res);
  }
};

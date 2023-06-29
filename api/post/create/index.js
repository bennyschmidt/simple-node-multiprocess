module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  return res.end(JSON.stringify({
    success: true
  }));
};

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify({
    todos: [
      {
        foo: 'bar',
        isCompleted: false
      },
      {
        baz: 'qux',
        isCompleted: true
      }
    ]
  }));
};

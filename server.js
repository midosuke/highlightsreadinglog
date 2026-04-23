const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5175;
const DIR = __dirname;

http.createServer((req, res) => {
  const filePath = path.join(DIR, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : 'text/plain';
    res.writeHead(200, { 'Content-Type': type + '; charset=utf-8' });
    res.end(data);
  });
}).listen(PORT, () => console.log('Highlights server running on port ' + PORT));

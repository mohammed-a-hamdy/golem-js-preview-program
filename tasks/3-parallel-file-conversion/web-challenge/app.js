import http from 'http';
import fs from 'fs';
process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  fs.createReadStream('index.html').pipe(res);
});

server.listen(3000, () => console.log('Server listening at http://localhost:3000'));

const http = require('http');
const fs = require('fs');
const url = require('url');
const PORT = 5000;

http.createServer((req, res)=>{
    const pathName = url.parse(req.url).pathname;
    if (req.method === 'POST' && pathName === '/calculate') {
        const x = parseInt(req.headers['x-value-x'], 10);
        const y = parseInt(req.headers['y-value-y'], 10);

        if (isNaN(x) || isNaN(y)) {
            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf8' });
            res.end("<h2>Invalid Input</h2>");
            return;
        }

        const resultSum = x + y;

        res.setHeader('x-value-z', resultSum.toString());
        res.writeHead(200, { 'Content-Type': `text/html; charset=utf8` });
        res.end("<h2>Correct</h2>");
    } else if (pathName === '/') {
        const html = fs.readFileSync("./WEB5A.html", 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("<h2>Not found page</h2>");
    }
}).listen(PORT, ()=>{
    console.log(`Useing PORT: ${PORT}`);
})
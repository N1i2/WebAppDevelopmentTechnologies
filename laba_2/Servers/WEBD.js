const http = require('http');
const fs = require('fs');
const url = require('url');
const PORT = 5002;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (req.method === 'POST' && pathName === '/calculate') {
        const x = parseInt(req.headers['x-value-x'], 10);
        const y = parseInt(req.headers['y-value-y'], 10);

        if (isNaN(x) || isNaN(y)) {
            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf8' });
            res.end("<h2>Invalid Input</h2>");
            return;
        }
        
        setTimeout(() => {
            const resultSum = x + y;
            res.setHeader('x-value-z', resultSum.toString());
            res.writeHead(200, { 'Content-Type': `text/html; charset=utf8` });
            res.end("<h2>Correct</h2>");
        }, 10000);
    } else if (req.method === 'POST' && pathName === '/random') {
        const n = parseInt(req.headers['x-rand-n'], 10);

        if (isNaN(n)) {
            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf8' });
            res.end("<h2>Invalid number</h2>");
        }

        setTimeout(() => {
            const randCount = getRandomInt(5, 10);
            const randArr = [];
            
            for (let i = 0; i < randCount; i++) {
                const randNum = getRandomInt(-n, n);
                randArr.push(randNum);
            }
        
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
            res.end(JSON.stringify({ randArr }));
        }, 1000);
        
    } else if (pathName === '/') {
        const html = fs.readFileSync("./WEBD.html", 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("<h2>Not found page</h2>");
    }
}).listen(PORT, () => {
    console.log(`Useing PORT: ${PORT}`);
});
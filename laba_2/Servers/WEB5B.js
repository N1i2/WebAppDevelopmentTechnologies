const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 5001;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (req.method === 'POST' && pathName === '/random') {
        const n = parseInt(req.headers['x-rand-n'], 10);

        if (isNaN(n)) {
            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf8' });
            res.end("<h2>Invalid number</h2>");
        }

        const randCount = getRandomInt(5, 10);
        const randArr = [];

        for (let i = 0; i < randCount; i++) {
            const randNum = getRandomInt(-n, n);
            randArr.push(randNum);
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
        res.end(JSON.stringify({ randArr }));
    } else if (pathName === '/') {
        const html = fs.readFileSync('./WEB5B.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("<h2>Not found page</h2>");
    }
}).listen(PORT, () => {
    console.log(`Useing PORT:${PORT}`);
});
const http = require('http');
const cookie = require('cookie');
const url = require('url');
const PORT = 5000;

let requestCounter = 0;
let flag = true;

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (req.method === 'POST' && pathName === '/calc') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { x, y } = JSON.parse(body);
            const cookies = cookie.parse(req.headers.cookie || '');

            let sx = parseInt(cookies.sx || 0, 10);
            let sy = parseInt(cookies.sy || 0, 10);

            
            if (requestCounter % 5 === 0) {
                sx = x;
                sy = y;
                requestCounter = 0;
            }
            else {
                sx += x;
                sy += y;
            }
            if(flag){
                flag = !flag;
                sx = x;
                sy = y;
            }
            requestCounter++;
            res.setHeader('Set-Cookie', [
                cookie.serialize('sx', String(sx), { path: '/' }),
                cookie.serialize('sy', String(sy), { path: '/' }),
            ]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ sx, sy }));

            console.log(`{\"${x}\", \"${y}\"} --> {\"${sx}\", \"${sy}\"}`);
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Error: Server not found</h1>');
    }
}).listen(PORT, ()=>{
    console.log(`Using PORT: ${PORT}`);
})
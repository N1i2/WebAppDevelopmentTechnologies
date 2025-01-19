const express = require('express');
const path = require('path');
const expires = new Date(Date.now() + 30 * 1000).toUTCString();
const fs = require('fs');
const PORT = 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`Using PORT: ${PORT}`);
});

app.get('/image', (req, res) => {
    const cacheOption = req.query.cache_parm;
    //const imagePath = path.resolve(__dirname, 'image1.jpg');
    const imagePath = path.resolve(__dirname, 'image2.png');
    const fileStats = fs.statSync(imagePath);
    const lastModified = fileStats.mtime.toUTCString();

    switch (cacheOption) {
        case 'no-store':
            res.set('Cache-Control', 'no-store');
            break;
        case 'max-age':
            res.set('Cache-Control', 'max-age=3600');
            break;
        case 'last-modified':
            res.set('Last-Modified', lastModified);
            break;
        case 'etag':
            const etagValue = `${fileStats.size}-${fileStats.mtimeMs}`;
            res.set('ETag', etagValue);
            if (req.headers['if-none-match'] === etagValue) {
                return res.status(304).end();
            }
            break;
            case 'expired':
                res.set('Expires', expires);
            break;
        default:
            res.set('Cache-Control', 'no-cache');
    }

    res.set('Content-Type', 'image/png');
    res.status(200).sendFile(imagePath);
});

app.get('/imageTest', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send(
        //'<img width=800 src="http://localhost:3000/image?cache_parm=max-age" alt="Image with Cache Control">'
        '<img width=800 src="http://localhost:3000/image?cache_parm=no-cach" alt="Image with Cache Control">'
    );
});

app.get('/script', (req, res) => {
    const cacheOption = req.query.cache_parm;
    const scriptContent = 'console.log(`Hello world!`);';

    switch (cacheOption) {
        case 'no-store':
            res.set('Cache-Control', 'no-store');
            break;
        case 'max-age':
            res.set('Cache-Control', 'max-age=3600');
            break;
        case 'etag':
            const etagValue = `${Buffer.from(scriptContent).length}`;
            res.set('ETag', etagValue);
            if (req.headers['if-none-match'] === etagValue) {
                return res.status(304).end();
            }
            break;
            case 'expired':
            res.set('Expires', expires);
            break;
        default:
            res.set('Cache-Control', 'no-cache');
    }

    res.set('Content-Type', 'application/javascript');
    
    res.send(scriptContent);
});

app.get('/scriptTest', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).end(
        `<html>
            <head>
            </head>
            <body>
            </body>
            <script src="http://localhost:3000/script?cache_parm=no-store"></script>
        </html>`
    );
});

app.get('/style', (req, res) => {
    const cacheOption = req.query.cache_parm;
    const cssContent = `body { background-color: #fac; }`;

    switch (cacheOption) {
        case 'no-store':
            res.set('Cache-Control', 'no-store');
            break;
        case 'max-age':
            res.set('Cache-Control', 'max-age=3600');
            break;
        case 'etag':
            const etagValue = `${Buffer.from(cssContent).length}`;
            res.set('ETag', etagValue);
            if (req.headers['if-none-match'] === etagValue) {
                return res.status(304).end();
            }
            break;
            case 'expired':
            res.set('Expires', expires);
            break;
        default:
            res.set('Cache-Control', 'no-cache');
    }

    res.set('Content-Type', 'text/css');
    res.send(cssContent);
});

app.get('/styleTest', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).end(
        '<link rel="stylesheet" href="http://localhost:3000/style?cache_parm=max-age">'
    );
});

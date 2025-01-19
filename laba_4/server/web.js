const express = require('express');
const session = require('express-session');

const server = express();
const PORT = 5000;

server.use(express.json())

server.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true
}));

server.use('/calc', (request, response) => {
    const { x, y } = request.body;
    
    if (typeof (x) !== 'number' || typeof (y) !== 'number' || x <= 0 || y <= 0) {
        return response.status(400).send({ error: 'Invalid value' });
    }
    
    if (request.session.sx == null || request.session.sy == null) {
        request.session.sx = 0;
        request.session.sy = 0;
        request.session.requestCount = 0;
    }
    
    if (request.session.requestCount % 5 === 0) {
        request.session.sx = 0;
        request.session.sy = 0;
    }
    
    request.session.sx += x;
    request.session.sy += y;
    request.session.requestCount++;
    
    const responseData = { sx: request.session.sx, sy: request.session.sy }
    console.log(`x = ${request.session.sx}, y = ${request.session.sy}`)

    response.json(responseData)
});

server.listen(PORT, () => {
    console.log(`Using PORT: ${PORT}`);
});
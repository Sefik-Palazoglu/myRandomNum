const path = require('path');
const http = require('http');
const fs = require('fs');

// directory which my resources are located
const dir = path.join(__dirname, 'public');

const hostname = "127.0.0.1";
const port = 3000;

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'text/javascript',
    woff: 'font/woff',
    woff2: 'font/woff2'
}

const nums = {
    sharedNum: '0'
};

const server = http.createServer((req, res) => {
    // take the part of the url before '?' that is the path of the file we want
    const reqPath = req.url.toString().split('?')[0];

    console.log(reqPath);

    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method not implemented');
        return;
    }

    const file = decodeURI(path.join(dir, reqPath.replace(/\/$/, '/index.html')));

    // if request wants something not inside the dir (public directory)
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Forbidden');
        return;
    }
    
    // figure out what kind of file we are dealing with
    const type = mime[path.extname(file).slice(1)] || 'text/plain';
    // if mime doesn't have the file type it returns undefined which is falsy,
    // in this case || operator falls onto second operator and returns text/plain
    // if we have the file type in our lookup object, || operator returns it

    if (reqPath === '/randomNum') {
        res.statusCode = 200;
        res.setHeader('Content-Type', type);
        res.end(getNumber().toString());
        return;
    }

    // now we will read the data in the file and pipe it to the response
    const s = fs.createReadStream(file);
    s.on('open', () => {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    })
    s.on('error', () => {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Error: not found');
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getNumber() {
    return Math.floor(Math.random() * 100);
}
// content of index.js
const fs = require('fs')
const http = require('http')
const path = require('path')
const port = 3000

const fileGet = (request, response, mimeType) => {
    var fpath = path.join(__dirname, request.url);
    var stat = fs.statSync(fpath);
    response.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': stat.size
    });
    let stream = fs.createReadStream(fpath);
    stream.pipe(response);
}

const indexGet = (request, response) => {
    fileGet({ url: 'index.html' }, response, 'text/html')
}

const cssGet = (request, response) => {
    fileGet(request, response, 'text/css')
}

const imagesGet = (request, response) => {
    fileGet(request, response, 'image/png')
}

const jsGet = (request, response) => {
    fileGet(request, response, 'text/script')
}

const requestHandler = (request, response) => {
    if (request.method === 'GET') {
        if (request.url === '/') {
            indexGet(request, response);
        } else if (request.url.indexOf('.css') > 0) {
            cssGet(request, response);
        } else if (request.url.indexOf('.png') > 0) {
            imagesGet(request, response);
        } else if (request.url.indexOf('.js') > 0) {
            jsGet(request, response);
        } else {
            response.writeHead(404);
            response.end();
        }
    }
    console.log(request.url, request.method)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
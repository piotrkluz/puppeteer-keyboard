const http = require('http');
const fs = require('fs');
const getPort = require('get-port');

var server;
async function start() {
    const port = await getPort(9000);
    server = http.createServer(function (request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const content = fs.readFileSync( __dirname + "/test.html");
        response.end(content);
    
    }).listen(port);

    return port;
}

function stop() {
    server.close();
}

module.exports = {
    start, stop
}
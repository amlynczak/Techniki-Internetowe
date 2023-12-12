var http = require('http');
var server = http.createServer(function (request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
}).listen(7009);
console.log('Server running at http://127.0.0.1:7009/');
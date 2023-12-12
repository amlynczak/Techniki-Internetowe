var http = require('http');
var express = require('express');
var app = express();
var routes = require('./routes')(app);
http.createServer(app).listen(7009, function(){
                console.log('Express server listening on port ' + 7009);
});
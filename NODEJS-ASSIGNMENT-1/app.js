const http = require('http');
const routes = require('./routes');

http.createServer(routes).listen(8080);
var https = require('https');

var server;

function startServer() {

	console.log('starting server');

	server = https.createServer(function (req, res) {
		console.log('we have a request');
		res.writeHead(200, {'Content-Type': 'application/json'});
		if (req.method === 'GET') {
			switch(req.url) {
				case '/service/oOW2G2kwDaaXJVNaaPgpx/stats/all':
					res.end('{hourly:{SJC2:{requests:3,pass:0,body_size:5647,hits:0,miss:3,header_size:1454}}}');
					console.log('we served');
					break;
				default:
					console.log('Unhandled API stub.');
					res.end('{}');
			}
		}
	}).listen(2001, "0.0.0.0");

}

function stopServer() {
	server.stop();
}

module.exports = {
	start: startServer,
	stop: stopServer
}
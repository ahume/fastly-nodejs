var https = require('https');

function Conn() {
	this.options = {
		hostname: 'api.fastly.com',
		headers: {
			'Accept': 'application/json'
		}
	}
}

Conn.prototype.setApiKey = function(apiKey) {
	this.options.headers['X-Fastly-Key'] = apiKey;
}

Conn.prototype.request = function(method, url, cb) {
	this.options['method'] = method;
	this.options['path'] = url;

	var req = https.request(this.options, function(response) {
		var str = '';
	  	response.on('data', function (chunk) {
	    	str += chunk;
	  	});

	  	response.on('end', function () {
	    	cb(str);
	  	});
	});

	req.end();

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message)
	})

}


module.exports = Conn
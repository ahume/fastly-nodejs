var https = require('https');

function AuthenticationError(message) {
	this.name = "AuthenticationError";
	this.message = message;
}

function Conn() {
	this.options = {
		hostname: 'api.fastly.com',
		headers: {
			'Accept': 'application/json'
		}
	}
	this.authenticationSet = false;
}

Conn.prototype.setApiKey = function(apiKey) {
	this.options.headers['X-Fastly-Key'] = apiKey;
	this.authenticationSet = true;
}

Conn.prototype.request = function(method, url, cb) {
	if (!this.authenticationSet) {
		throw new AuthenticationError('No authentication method set.');
	}
	this.options['method'] = method;
	this.options['path'] = url;

	var req = https.request(this.options, function(response) {
		if (response.statusCode !== 200) {
			if (response.statusCode === 403) {
				throw new AuthenticationError("The method of authentication failed.");
			}
		}

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
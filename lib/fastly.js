var Conn = require('./connection');

function fastlyAPI() {
	this.conn = new Conn();
}

fastlyAPI.prototype.authenticateByKey = function(apiKey) {
	this.conn.setApiKey(apiKey);
}

fastlyAPI.prototype.purgeURL = function(hostname, url, cb) {
	this.conn.options.headers['Host'] = hostname;
	this.conn.request('PURGE', url, function(result) {
		cb(result);
	});
}

fastlyAPI.prototype.getBackends = function(serviceId, version, cb) {
	var url = '/service/' + encodeURIComponent(serviceId) + '/version/' + version;
	this.conn.request('GET', url, function(result) {
		cb(JSON.parse(result));
	})
}

fastlyAPI.prototype.getBackend = function(serviceId, version, name, cb) {
	var url = '/service/' + encodeURIComponent(serviceId) + '/version/' + version + '/backend/' + encodeURIComponent(name);
	this.conn.request('GET', url, function(result) {
		cb(JSON.parse(result));
	})
}

fastlyAPI.prototype.backendH = function(serviceId, version, name, cb) {
	var url = '/service/' + encodeURIComponent(serviceId) + '/version/' + version + '/backend/' + encodeURIComponent(name);
	this.conn.request('GET', url, function(result) {
		cb(JSON.parse(result));
	})
}

fastlyAPI.prototype.getStats = function(serviceId, type, cb) {
	var url = '/service/' + encodeURIComponent(serviceId) + '/stats/' + type;
	this.conn.request('GET', url, function(result) {
		cb(JSON.parse(result));
	})
}



module.exports = {
	fastlyAPI: fastlyAPI
}
var fastly = require('../lib/fastly');
var stubs  = require('./stubs');

stubs.createStubs();

api = new fastly.fastlyAPI();
api.authenticateByKey('6ea7c6ed310d436339bc6cfe92265f54');


exports.testGetStats = function(test) {
	var start = new Date(2013, 0, 1);
	var end = new Date(2013, 0, 2);
	api.getStats("oOW2G2kwDaaXJVNaaPgpx", "summary", start, end, function(result) {
		test.equal(result.stats.LON.hits, 3);
		test.equal(result.stats.ASH.hits, 1);
		test.done();
	});
}

exports.testGetBackends = function(test) {
	api.getBackends('oOW2G2kwDaaXJVNaaPgpx', 1, function(result) {
		test.equal(result.number, 1);
		test.equal(result.locked, true);
		test.done();
	});
}

exports.testGetBackend = function(test) {
	api.getBackend('oOW2G2kwDaaXJVNaaPgpx', 1, 'addr andyhume.net.s3-website-us-east-1.amazonaws.com', function(result) {
		test.equal(result.hostname, 'andyhume.net.s3-website-us-east-1.amazonaws.com');
		test.equal(result.port, 80);
		test.done();
	});
}

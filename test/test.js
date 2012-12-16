var fastly = require('../lib/fastly');
var server = require('./server');

api = new fastly.fastlyAPI();

module.exports = {

	// setUp: function() {
	// 	server.start();
	// },

	// tearDown: function() {
	// 	server.stop();
	// },

	testGetStats:  function(test) {
		server.start();
		api.conn.options.hostname = "0.0.0.0:2001";
		console.log('testing');
		api.getStats("oOW2G2kwDaaXJVNaaPgpx", "all", function(result) {
			console.log(result);
			test.equal(result.hourly.SJC2.request, 3);
			test.done();
		});
	}


}

// exports['testGetStats2'] = function(test) {
// 	console.log('run');
// 	test.done()
// }


// api = new fastly.fastlyAPI();
// api.authenticateByKey("6ea7c6ed310d436339bc6cfe92265f54");

// api.purgeURL("andyhume.net", "/about/", function(result) {
// 	console.log(result);
// })

// api.getBackends("oOW2G2kwDaaXJVNaaPgpx", 1, function(result) {
// 	console.log(result);
// })

// api.getBackend("oOW2G2kwDaaXJVNaaPgpx", 1, "addr andyhume.net.s3-website-us-east-1.amazonaws.com", function(result) {
// 	console.log(result);
// })

// var api = new fastly.fastlyAPI();
// api.authenticateByKey("6ea7c6ed310d436339bc6cfe92265f54");

// api.getStats("oOW2G2kwDaaXJVNaaPgpx", "all", function(result) {
// 	console.log(result);
// })

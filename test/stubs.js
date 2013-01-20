var nock   = require('nock');

function createStubs() {

	var goodAuthApi = nock('https://api.fastly.com').matchHeader('X-Fastly-Key', '6ea7c6ed310d436339bc6cfe92265f54')

				// testBackendHealthCheck
				.get('/service/oOW2G2kwDaaXJVNaaPgpx/version/1/backend/check_all')
				.reply(200, [{
						'backend': {
							'hostname': 'andyhume.net.s3-website-us-east-1.amazonaws.com'
						},
						'healthcheck': {
							'url': 'http://andyhume.net.s3-website-us-east-1.amazonaws.com:80/'
						},
						'status': 'success'
					}
				])

				// testGetBackends
                .get('/service/oOW2G2kwDaaXJVNaaPgpx/version/1')
                .reply(200, {'number': 1, 'locked': true})

                // testGetBackend
                .get('/service/oOW2G2kwDaaXJVNaaPgpx/version/1/backend/addr%20andyhume.net.s3-website-us-east-1.amazonaws.com')
                .reply(200, {'hostname': 'andyhume.net.s3-website-us-east-1.amazonaws.com', 'port': 80})

                // testStatsSummary
                .get('/service/oOW2G2kwDaaXJVNaaPgpx/stats/summary?start_time=1356998400&end_time=1357084800')
                .reply(200, {'stats': {
                		'LON': {
                			'hits': 3
                		},
                		'ASH': {
                			'hits': 1
                		}
                	}
               	})

                // testPurgeUrl
               	.intercept('/about/', 'PURGE')
               	.reply(200, {'status': 'ok'})

                ;
}


module.exports = {
	createStubs: createStubs
}
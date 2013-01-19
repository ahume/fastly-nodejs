var nock   = require('nock');

function createStubs() {
	console.log('creating stubs');
	var fastly_api = nock('https://api.fastly.com')
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

                ;
}


module.exports = {
	createStubs: createStubs
}
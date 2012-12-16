# Fastly nodejs Client


## Build this

var fastly = require("fastly");



var api = new fastly.FastlyAPI();	
api.authenticateByKey("123");
api.purgeUrl("andyhume.net", "/about");
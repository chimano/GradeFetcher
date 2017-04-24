var express = require('express')
var app = express();
var fetcher = require('./fetcher');


app.get('/api/twilio', function(req, res) {
	console.log("Message has been received.")
	fetcher.getGrade(fetcher.sendGrade, res);

	
});


app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});


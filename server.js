var express = require('express');
var app = express();
var fetcher = require('./fetcher');
var bodyParser = require('body-parser');
var twilio = require('twilio');

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/twilio', function(req, res) {

	var body = req.body.Body;
	console.log("Message has been received.");
	console.log("Message: " + req.body.Body);
	if (body == 'Grades') {
		console.log('fetching grades');
		fetcher.getGrade(fetcher.sendMessage);
		res.send('Message was sent.');
	} else if (body == 'Num'){
		console.log('Sending number');
		fetcher.sendMessage(req.body.From);
		res.send('Message was sent');
	} else if (body == 'Help') {
		console.log('Sending Help');
		fetcher.sendMessage('Grades, Num, Help');
		res.send('Message was sent');
	} else {
		console.log('Received invalid command');
		fetcher.sendMessage("You have sent an invalid command.");
	}
	
	

});


app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});


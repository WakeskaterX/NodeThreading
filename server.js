var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	http = require('http'),
	bodyParser = require('body-parser'),
	fibProcess = require('./app/controllers/fibProcess');

var app = express();
var port = 3030;
var wpOptions = {
	maxThreads: 4
};


router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//middleware to use for all requests
router.use(function(req,res,next){
	//console.log('Router Accessed!');
	try{
		//console.log('Incoming Request from: '+req.headers.host);
		//console.log("Request from: " + req.connection.remoteAddress);
	} catch (e) {
		console.dir(e);
	}
	next();
});

//Fibonnaci Sequencer
router.route('/fib').get(function(req,res){
		//console.dir(req);
		var fib = new fibProcess.fibonacciSequencer(req,res);
		fib.process();
	});


app.use('/',router);

//Launch Server 
app.listen(port, function() {
	console.log('Server Started:  Listening on port '+port);
});
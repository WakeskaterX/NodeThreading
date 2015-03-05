/* Long Running Process */



//Request to /fib should look like /fib?num=30
var url = require('url');


function fibonacciSequencer(req, res){
	var request 		= req,
		response 		= res;

	var number = Number (request.query.num);
	//var useThreads = Boolean(request.query.useThreads);

	function finish(err, result){
		if (err){
			response.writeHead('500',{'Content-Type':'text/plain'});
			response.end('Server Error!');
		} else {
			response.writeHead('200',{'Content-Type':'text/plain'});
			response.end(result.toString());
		}
	}

	//Our fibonacci sequence function
	function fibo(n){
		return n > 1 ? fibo(n-1) + fibo (n-2) : 1;
	}

	//Start with no threads:
	this.process = function(){	
		var num = fibo(number);
		finish(null, num);
	};

}	

module.exports.fibonacciSequencer = fibonacciSequencer;

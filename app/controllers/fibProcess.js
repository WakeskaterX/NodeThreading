/* Long Running Process */



//Request to /fib should look like /fib?num=30
var url = require('url');
var Worker = require('webworker-threads').Worker;


function fibonacciSequencer(req, res){
	var request 		= req,
		response 		= res;

	var number = Number (request.query.num);

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
		try{
			//NO THREAD TEST
			/*
			var num = fibo(number);
			finish(null, num);*/
			//NO THREAD END

			//WEB WORKER TEST
			var worker = new Worker(function(){
				function fibo(n){
					return n > 1 ? fibo(n-1) + fibo (n-2) : 1;
				}

				this.onmessage = function(event){
					var num = fibo(Number(event.data));
					postMessage(num);
					self.close();
				};
			});

			worker.onmessage = function(event){
				//console.log(event.data);
				finish(null,event.data);
			};

			worker.postMessage(number);
			//WEB WORKER TEST END
		}
		catch(e){
			finish(e, null);
		}
		
	};




}	

module.exports.fibonacciSequencer = fibonacciSequencer;
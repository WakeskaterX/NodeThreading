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
			
			//NO THREAD TEST
			/*
			var num = fibo(number);
			finish(null, num);*/
			//NO THREAD END
			/*if (!useThreads){
				var num = fibo(number);
				finish(null, num);
			} else {
				var num = fibo(number);
				finish(null, num);
				//WEB WORKER TEST
				/*this.worker = new Worker(function(){
					function fibo(n){
						return n > 1 ? fibo(n-1) + fibo (n-2) : 1;
					}

					this.onmessage = function(event){
						var num = fibo(Number(event.data));
						postMessage(num);
					};
				});

				this.worker.onmessage = function(event){
					//console.log(event.data);
					finish(null,event.data);
				};

				this.worker.postMessage(number);
				
				var workItem = {
					work: function(){
						return function(){
							function fibo(n){
								return n > 1 ? fibo(n-1) + fibo (n-2) : 1;
							}

							this.onmessage = function(event){
								var num = fibo(Number(event.data));
								postMessage(num);
							};
						};
					},
					finish: function(){
						return function(){
							finish(null,event.data);
						};
					},
					number: num
				};

				wpQueue.enqueue(workItem);
			}*/
			//WEB WORKER TEST END
	};


	//QUEUE UP OBJECT:  {work: function(){}, finish: function(){}}

}	

module.exports.fibonacciSequencer = fibonacciSequencer;

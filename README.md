# NodeThreading

Testing threading in NodeJS/Express Applications &amp; LoadTesting 

This Project is created to test the differences in NodeJS for CPU Intensive Tasks against high concurrency requests for a single threaded application vs a multi threaded application as well as the feasibility of using multithreaded applications in NodeJS.

**Dependencies:**

NodeJS, NPM, loadtest, express, request

Install loadtest to perform the load testing and swap between the two branches:  hostedVM and hostedVM_multicore

Use the command:  

    loadtest -t 20 -c 100 http://localhost:3030/fib?num=25  

to test a concurrency of 100 requests over 20 seconds, on a CPU intensive task of generating a fibonnaci sequence depth 25.

On a system with 2 GB of Ram and 4 processors the following results were attained:

(Simplified Results, full results in a spreadsheet i have / will post blog on this)
Fibo - Sequence of 25:
---------------------

* **No Threads:**   `-t 20 -c 32`   :   8297 requests, average latency: 70, max latency: 244, Requests Per Second: 447

* **4 Threads:**   `-t 20 -c 32`   :   15196 requests, average latency: 40, max Latency: 305, Requests Per Second: 760

_______________________________________

* **No Threads:**   `-t 20 -c 200`  :   8110 requests, average latency: 480, max latency: 7364, Requests Per Second: 405

* **4 Threads:**   `-t 20 -c 200`  :   14498 requests, average latency: 330, max latency: 1062, Requests Per Second: 596

_________________________________________

* **No Threads:**  `-t 20 -c 1000` :   8178 requests, average latency: 2510, max latency: 16256, Requests Per Second: 2510

* **4 Threads:**    `-t 20 -c 1000` :   14923 requests, average latency: 1350, max latency: 7641, Requests Per Second: 718


Overall, 4 threads (probably wasn't using all 4 to be honest, it was on a VM) increased the throughput of the program by about 45%, and reduced the average and max latency by varying significant amounts.

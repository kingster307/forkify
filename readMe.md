# Deployment Branch of Forkify 

* node server built solely on native node modules.
* usage of stream operations vs readFile for memory optimizations (readFile can have a lot of memory overhead with the buffer)
* Dynamically able to find the needed content type header of response based off the request headers 
* solid 404 & error handling (would love some suggestions of potential vulnerabilities & best practices to fix them!)
* lightweight & optimized 

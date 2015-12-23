var currentTime = 0;
var longtouchStart = function(e){

	currentTime = (new Date()).getTime();
	console.log(currentTime);
}
var longtouchMove = function(e){
	
}
var longtouchEnd = function(e){
	console.log("touchend");
}

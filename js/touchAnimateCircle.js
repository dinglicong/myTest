var startCircleX = 0,
    startCircleY = 0;
    marginCircle = 0;
var pages = null;
var currentPage = 0;
var pageCircleWidth = 0;
var lineHeight = 0, secHeight = 0;
var targetElement = null;
var scrollPrevent = false, movePrevent = false, touchDown = false;
var canCircle = true,
	canPre = false,
	canNext = true;

function ontouchCicleStart(e){
	if(movePrevent == true){
    	console.log("movePrevent true");
        event.preventDefault();
        return false;
    }
    touchDown = true;
     // 起始点，页面位置
    startCircleX = e.pageX;
    startCircleY = e.pageY;
//  marginCircle = parseInt($(".page-item-list").css("-webkit-transform").split("translateY(")[1].split("p")[0]);
}
function ontouchCicleMove(e){
    if(movePrevent == true || touchDown != true){
        event.preventDefault();
        return false;
    }
    event.preventDefault();
}
function ontouchCicleEnd(e){
	if(movePrevent == true){
        event.preventDefault();
        return false;
    }
    touchDown = false;
    if( scrollPrevent==false ){
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;
        // swip 事件默认大于一半才会触发，小于这个就将页面归回
        if( Math.abs(endX-startCircleX)<=(pageCircleWidth/5)) {
        	console.log(Math.abs(endX-startCircleX));
//          animateCirclePage(currentPage);
        }else{
        	if(endX>startCircleX){
        		prevCirclePage();
        	}else{
        		nextCirclePage();
        	}
        }
    }
}
function prevCirclePage(){
	canNext = true;
    var newPage = currentPage - 1;
    if(newPage<0){
        newPage = 0;
        canPre = false;
    }
    currentPage = newPage;
    console.log("pre page");
//  animateCirclePage(newPage);
	console.log($($(".position-1")[($(".position-1").length-1)]));
    if(canCircle&&canPre){
		canCircle = false;
	    
	    console.log("pre page");
	    $($(".position-1")[($(".position-1").length-2)]).removeClass("position-hidden");
	    $($(".position-1")[($(".position-1").length-1)]).addClass("reversecircleMove1");
	    $(".position-2").addClass("reversecircleMove2");
		$(".position-3").addClass("reversecircleMove3");
		$($(".position-4")[0]).addClass("position-hidden");
		$(".position-2").on("webkitAnimationEnd",function(){
			console.log("animate end");
			$(".position-3").removeClass("position-3 reversecircleMove3").addClass("position-4");
			$(".position-2").removeClass("position-2 reversecircleMove2").addClass("position-3");
			$($(".position-1")[($(".position-1").length-1)]).removeClass("position-1 reversecircleMove1").addClass("position-2");
			canCircle = true;
			canNext = true;
			$(".position-3").off("webkitAnimationEnd");
		});
	}
}
function nextCirclePage(){
	var newPage = currentPage + 1;
	console.log(newPage);
    if(newPage>$(".page-photo-item").length-1){
        newPage = $(".page-photo-item").length-1;
        canNext = false;
    }
    currentPage = newPage;
	if(canCircle&&canNext){
		canCircle = false;
	    
	    console.log("next page");
	    $($(".position-1")[($(".position-1").length-1)]).addClass("position-hidden");
	    $(".position-2").addClass("circleMove2");
		$(".position-3").addClass("circleMove3");
		$($(".position-4")[0]).addClass("circleMove4");
		$($(".position-4")[1]).removeClass("position-hidden");
		$(".position-2").on("webkitAnimationEnd",function(){
			console.log("animate end");
			$(".position-2").removeClass("position-2 circleMove2").addClass("position-1");
			$(".position-3").removeClass("position-3 circleMove3").addClass("position-2");
			$($(".position-4")[0]).removeClass("position-4 circleMove4").addClass("position-3");
			canCircle = true;
			canPre = true;
			$(".position-1").off("webkitAnimationEnd");
		});
	}
    
//  animateCirclePage(newPage);
}
//function animateCirclePage(newPage){
//	if(newPage<0){
//      newPage = 0;
//  }
//  if(newPage>$(".page-photo-item").length-1){
//      newPage = $(".page-photo-item").length-1;
//  }
//	currentPage = newPage;
//}

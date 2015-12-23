(function(){
	$.fn.carousel = function(currentTime){
		var $slider = $(this),
			$items = $(this).find("li"),
			totalWidth = 0,
			firstTranslate = 0,
			lastTranslate = 0,
			currentTime = currentTime?parseInt(currentTime):800,
			styles=document.getElementsByTagName("head")[0].style,
			screenWidth = $(window).width(),
			supportedCSS,
			toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
		for (var a=0;a<toCheck.length;a++){
			if (styles[toCheck[a]] !== undefined) 
			supportedCSS = toCheck[a];
		}
			
//		$items.filter(":last").after($items.filter(":first").clone().addClass("cloned"));
		$slider.append($items.clone().addClass("cloned"));
//		$slider.append($($items[1]).clone().addClass("cloned"));
			
		$items = $slider.find("li");
		
		for(var i=0,sl=$items.length;i<sl;i++){
			console.log($($items[i]).width()+30)
			totalWidth += $($items[i]).width() + 30;
		}
		
		var $time = totalWidth/100*currentTime;
		
		$slider.width(totalWidth);
		
		var cloneItems = $(".cloned");
		for (var i=0,tl = cloneItems.length;i<tl;i++) {
			lastTranslate += $(cloneItems[i]).width() + 30;
		}
		
//		lastTranslate = $items.filter(":last").prev().width() + 30 + $items.filter(":last").width() + 30;
		console.log(lastTranslate);
		
		$("#JS_main").append("<span style='color:#f00;'>" + lastTranslate + "</span>");
		console.log($slider[0].style);
//		$slider[0].style[supportedCSS] = 'translateX(-'+ 0 + 'px)';
		
		var styleStr = ['<style type="text/css">',
						'@-webkit-keyframes carousel_an{',
							'from{-webkit-transform:translateX(0)}',
							'to{-webkit-transform:translateX(-'+ (totalWidth - lastTranslate) +'px)}',
						'}',
						'@keyframes carousel_an{',
							'from{transform:translateX(0)}',
							'to{transform:translateX(-'+ (totalWidth - lastTranslate) +'px)}',
						'}',
						'</style>'
						].join("");
		
		$("head").append(styleStr);
		setTimeout(function(){$slider.css("animation","carousel_an " + $time + "ms linear infinite");},100);
		 
		console.log($slider[0].style["cssText"]);
	}
})(jQuery)

(function(){
	$.fn.dlazyLoad = function(Element){
		var ImgList = [];
		if(Element){
			ImgList = $(Element).find("img");
		}else{
			ImgList = $("img");
		}
		lazyLoad();
		$(window).scroll(function(){
			lazyLoad();
		});
		$(window).resize(function(){
			lazyLoad();
		});
		function lazyLoad(){
			var scrollTop = $(window).scrollTop(),	
				clientHeight = $(window).height() + scrollTop,
				//loadList = getLoaded(),
				unLoadList = getUnloaded(),
				currentTop = 0,
				currentBottom = 0;
				for(var i=0;i<unLoadList.length;i++ ){
					currentTop = unLoadList[i].offsetTop;
					currentBottom = currentTop + unLoadList[i].offsetHeight;
					if((currentTop>scrollTop&&currentTop<clientHeight)||(currentBottom>screenTop && currentBottom<clientHeight)){
						console.log("加载图片");
						$(unLoadList[i]).attr("src",$(unLoadList[i]).attr("data-src"));
						$(unLoadList[i]).addClass("loaded");
					}
				}
		}
		
		function getLoaded(){
			return $("img.loaded");
		}
		function getUnloaded(){
			return ImgList.not($(".loaded"));
		}
	}
})(Zepto||jQuery)

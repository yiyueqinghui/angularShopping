	function setRem(){
	   //获取到html文档
		var oHtml = document.querySelector('html');
	   //getBoundingClientRect返回一个对象,取当前设备的屏幕大小
		var width = oHtml.getBoundingClientRect().width;
	    // 限制最大宽度到680
		if(width>680){
		   width = 680;
		}
	    oHtml.style.fontSize = width/16+"px";
	}
	window.onload = function(){
		setRem();
	}
	//一般320px宽的手机屏幕，23.4375px等于1rem
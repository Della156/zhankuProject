## zhankuProject笔记
### CSS3 anmations
	/*###cssreset*/
	html,body{height: 100%;overflow: hidden;}
	html,body,h1,h2,h3,h4,h5,h6,p,ul,li{margin: 0px;padding: 0px;font: 14px "微软雅黑";}
	a{text-decoration: none;display: block;color: white;}
	li{list-style: none;}
	img{display: block;}

	/*common style*/
	/*###清除浮动*/
	.clearfix{*zoom: 1;}
	.clearfix:after{content: "";display: block;clear: both;}

###导航条

	height：60px;
	background:#333;
	
###导航居中显示

	width:980px;
	logo --> margin:16px 20px 0 0;
	nav --> width:90px;height:60px;
	hover上的颜色：#FFCC00
	
###小圆点

	宽高：10px
	right:20px
	
###第二屏

	left--> height:437px;width:837px;
	pic --> margin-left:20px;
	p --> font-size: 18px;
	立即购买--   width: 98px;height: 36px;left: 80px;
	
###踩坑

	/*阻止页面鼠标滚轮冒泡事件*/
	//用firefox变量表示火狐代理
	var firefox = navigator.userAgent.indexOf('Firefox') != -1;
	function MouseWheel(e){ 
	    e = e||window.event;
	    if (e.stopPropagation) { //这是取消冒泡
	        e.stopPropagation();
	    } else{
	        e.cancelBubble = true;
	    };
	}
	
	//要在cartBoxUl内部滚动，而页面不受影响，所以这里获取要滚动的对象cartBoxUl
	//如果是ff就绑定DOMMouseScroll事件，其他浏览器就用onmousewheel事件触发
	firefox ? cartBoxUl.addEventListener('DOMMouseScroll',MouseWheel,false) : (cartBoxUl.onmousewheel = MouseWheel);

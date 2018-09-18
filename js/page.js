
window.onload = function  () {
			var headNode = document.querySelector("#head");
			var LiNodes =  document.querySelectorAll("#head > .headMain > .nav >li");
			

			var container = document.querySelector("#container");
			var cList = document.querySelector("#container > .list");
			var cLiNodes = document.querySelectorAll("#container > .list > li");
			var dotLiNodes = document.querySelectorAll("#container > .dot > li");
			var cartBoxUl = document.querySelector('#container > .cart_box >.cart_pic');
			var cartBoxLi = document.querySelector('#container > .cart_box >.cart_pic li');
			/*添加购物车*/
			
			var cartImg = document.querySelector('#head > .headMain >a img');
			var cart = document.querySelector('#head > .headMain > .cart');
			var cartUl = document.querySelector('#head > .headMain > .cart >ul');
			var cartBox = document.querySelector('#container > .cart_box');
			

			//将点击每屏的index放到全局作用域中
			var now = 0;
			var timer = 0;
			var preIndex = 0;

			/*购物车的下标*/
			var indexCart = 0;
			var imgIndex = 0;
			/*添加商品到购物车*/
			function addCart(){
				//将每个a的小标给图片下标
				imgIndex = this.index;
				indexCart++;			
				var boxImg = document.querySelector('#container > .cart_box >.cart_pic li >img');
				 //创建商品标签的介绍文字的数组 （后期可以通过数据库得到这些数据）
				var pArr = ['望','听','悟','Love','Filial and eros aw','Good Time','绽放2009','绽放2010','绽放2011','栖息','惊蛰','恬静'];
				//创建商品的价格数组（后期可以通过数据库得到这些数据）
				var moneyArr = ['￥2845','￥5489','￥3544','￥9566','￥3845','￥8854','￥1999','￥3649','￥8546','￥3349','￥6645','￥2286','￥7778']
				cartImg.src = 'img/cart/cart.png';
				cart.style.opacity = 1;
				cartUl.innerHTML +=  "<li>"+indexCart+"</li>";	
				cartUl.style.top = -19*(indexCart-1)+'px';
				cartBox.style.top = '60px';

				/*js动态创建
					
					<li>
						<img src="img/img1.png">
						<p>望</p>
						<span>￥2491</span>
						<a href="#" style="opacity: 0;">
							<img src="img/x.png" alt="x">
						</a>
					</li>
				 */
				var liNode = document.createElement("li");
				var imgNode = document.createElement("img");
				var pNode = document.createElement('p');
				var span = document.createElement('span');
				var a = document.createElement('a');
				a.href = '#';
				a.innerHTML = '<img src="img/cart/x.png" alt="x">';
				a.style.opacity = 0;
				pNode.innerHTML = pArr[imgIndex];
				span.innerHTML = moneyArr[imgIndex];
				imgNode.src = `img/products/img${imgIndex+1}.png`;
				liNode.appendChild(imgNode);
				liNode.appendChild(pNode);
				liNode.appendChild(span);
				liNode.appendChild(a);
				a.onclick = removeLi;
				document.querySelector('#container > .cart_box > .cart_pic').appendChild(liNode);	
			}

			//删除加入购物车中的物品
			function removeLi(){
				var liNode = this.parentNode;
				liNode.parentNode.removeChild(liNode);
				indexCart--;
				cartUl.innerHTML +=  "<li>"+indexCart+"</li>";
				cartUl.style.top = -19*(indexCart-1)+'px';
				if(indexCart==0){
					cartImg.src = 'img/cart/cart1.png';
					cart.style.opacity = 0;
					cartBox.style.top = '-400px';
				}
				/*取消浏览器默认行为*/
				return false;
			}


			//遍历所有的a,找到对应的‘立即购买’出现相应的购物车商品
			//document.anchors可以获取所有的带name属性的<a>元素
			//var allA = document.getElementsByTagName('a');
			var allA = document.anchors;
			for (var i = 0;i < allA.length;i++) {
				allA[i].index = i;
				allA[i].onclick = addCart;
			}


			
			
			// 点击购物小车车打开/关闭购物盒子
			cartImg.onclick = function () {
				//出现购物清单
				if (cartBox.style.top !== '60px') {
					cartBox.style.top = '60px';
				}else{
					cartBox.style.top = '-400px';
				}
			}


			/*踩坑：购物车取消冒泡事件*/
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
			
			//要在cartBox内部滚动，而页面不受影响，所以这里获取要滚动的对象cartBox
			//如果是ff就绑定DOMMouseScroll事件，其他浏览器就用onmousewheel事件触发
			firefox ? cartBox.addEventListener('DOMMouseScroll',MouseWheel,false) : (cartBox.onmousewheel = MouseWheel);
			




			/*出入场动画*/
			var anArr = [
				{
				  	inAn:function() {
			            var imgNode = document.querySelector("#container > .list > .home1 > img");
			            setTimeout(function () {
			              imgNode.style.opacity = 1;
			            },1000);
			          },
					outAn:function() {
						    var imgNode = document.querySelector("#container > .list > .home1 > img");
						    setTimeout(function () {
			                imgNode.style.opacity = 0;
			              },1000);
						}
				},
		        {
		          inAn:function() {
		            var li1 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(1)");
		            var li2 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(2)");
		            var li3 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(3)");
		            var right = document.querySelector("#container > .list > .home2 > .right");
		            setTimeout(function () {
		              li1.style.transform = "translateY(0px)";
		            },800);
		            setTimeout(function () {
		              li2.style.transform = "translateY(0px)";
		            },1000);
		            setTimeout(function () {
		              li3.style.transform = "translateY(0px)";
		              right.style.transform = "translateY(0px)";
		            },1200);
		          },
		          outAn:function() {
									var li1 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(1)");
									var li2 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(2)");
									var li3 = document.querySelector("#container > .list > .home2 > .left > .pic >li:nth-child(3)");
									var right = document.querySelector("#container > .list > .home2 > .right");
									setTimeout(function () {
		                li1.style.transform = "translateY(900px)";
		              },800);
									setTimeout(function () {
										li2.style.transform = "translateY(900px)";
									},1000);
									setTimeout(function () {
										li3.style.transform = "translateY(900px)";
										right.style.transform = "translateY(-600px)";
									},1200);
		          }
		        },
		        {
		          inAn:function() {
		            var li2 = document.querySelector("#container > .list > .home3 > .left li:nth-child(2)");
		            var li3 = document.querySelector("#container > .list > .home3 > .left li:nth-child(3)");
		            var right = document.querySelector("#container > .list > .home3 > .right");

		            setTimeout(function () {
		              li2.style.transform = "translateX(0px)";
		              li3.style.transform = "translateX(0px)";
		              right.style.transform = "translateX(0px)";
		            },800);
		          },
		          outAn:function() {
									var li2 = document.querySelector("#container > .list > .home3 > .left li:nth-child(2)");
									var li3 = document.querySelector("#container > .list > .home3 > .left li:nth-child(3)");
			            var right = document.querySelector("#container > .list > .home3 > .right");

		            setTimeout(function () {
										li2.style.transform = "translateX(-279px)";
										li3.style.transform = "translateX(-558px)";
										right.style.transform = "translateX(200px)";
									},800);
		          }
		        },
		        {
		          inAn:function() {
								var li1 = document.querySelector("#container .list > .home4 .left li:nth-child(1)");
								var li2 = document.querySelector("#container .list > .home4 .left li:nth-child(2)");
								var li3 = document.querySelector("#container .list > .home4 .left li:nth-child(3)");
								var right = document.querySelector("#container .list > .home4 .right");
		            li1.style.display = "initial";
		            li2.style.display = "initial";
		            li3.style.display = "initial";

		            li1.style.animation = "move1 2s 0.8s ";
		            li2.style.animation = "move2 2s 0.8s ";
		            li3.style.animation = "move3 2s 0.8s ";

		            setTimeout(function(){
		              li1.style.transform = "translate(0px,0px)";
		              li2.style.transform = "translate(0px,0px)";
		              li3.style.transform = "translate(0px,0px)";
		              right.style.opacity = 1;
		            },2000)
		          },
		          outAn:function() {
		            var li1 = document.querySelector("#container .list > .home4 .left li:nth-child(1)");
		            var li2 = document.querySelector("#container .list > .home4 .left li:nth-child(2)");
		            var li3 = document.querySelector("#container .list > .home4 .left li:nth-child(3)");
		            var right = document.querySelector("#container .list > .home4 .right");
		            li1.style.display = "none";
		            li2.style.display = "none";
		            li3.style.display = "none";
		            li1.style.transform = "translate(330px,-1000px)";
		            li2.style.transform = "translate(0,-1000px)";
		            li3.style.transform = "translate(-330px,-1000px)";
		            right.style.opacity = 0;
		          }
		        },
		        {
		          inAn:function() {
		            var li1 = document.querySelector("#container .list > .home5 .left li:nth-child(1)");
		            var li2 = document.querySelector("#container .list > .home5 .left li:nth-child(2)");
		            var li3 = document.querySelector("#container .list > .home5 .left li:nth-child(3)");
		            var right = document.querySelector("#container .list > .home5 .right");

		            setTimeout(function(){
		              li1.style.transform = "translate3d(0px,0px,0px) rotateX(0deg) ";
		            },800)
		            setTimeout(function(){
		              li2.style.transform = "translate3d(0px,0px,0px) rotateX(0deg) ";
		            },1000)
		            setTimeout(function(){
		              li3.style.transform = "translate3d(0px,0px,0px) rotateX(0deg) ";
		              right.style.opacity = 1;
		            },1200)
		          },
		          outAn:function() {
		            var li1 = document.querySelector("#container .list > .home5 .left li:nth-child(1)");
		            var li2 = document.querySelector("#container .list > .home5 .left li:nth-child(2)");
		            var li3 = document.querySelector("#container .list > .home5 .left li:nth-child(3)");
		            var right = document.querySelector("#container .list > .home5 .right");

		            setTimeout(function(){
		              li1.style.transform = "translate3d(-1000px,-800px,-500px) rotateX(145deg) ";
		            },800)
		            setTimeout(function(){
		              li2.style.transform = "translate3d(-1000px,-800px,-500px) rotateX(145deg) ";
		            },1000)
		            setTimeout(function(){
		              li3.style.transform = "translate3d(-1000px,-800px,-500px) rotateX(145deg) ";
		              right.style.opacity = 0;
		            },1200)
		          }
		        }
			];
		      for(var i=1;i<anArr.length;i++){

		        anArr[i]["outAn"]();

		      };
			/*调整分辨率时只能显示一屏*/
			window.onresize = function() {
			 /*
				 调整分辨率时
				1.视口只能出现一屏 containerBind()
				2.点击后视口只能出现一屏,在1的基础上对每一屏的偏移量进行重新调整
			  */
				containerBind();
				cList.style.top = -now*(document.documentElement.clientHeight - headNode.offsetHeight)+'px';				
			}
			
			/*内容区交互*/						
			containerBind();
			function containerBind() {				
				//鼠标滚轮套路
				if(container.addEventListener) {
					/*让fn逻辑在频繁被触发的时候只会执行一次*/
					container.addEventListener("DOMMouseScroll",function(ev) {
						ev = ev||event;
						clearTimeout(timer);
						//当滑动鼠标时间在200ms之内时会清除上一次滚轮事件
						timer = setTimeout(function() {
							fn(ev);
						}, 200);
					});
				}
				container.onmousewheel=function(ev) {
					ev = ev||event;
					clearTimeout(timer);
					timer = setTimeout(function() {
						fn(ev);
					}, 200);
				};
				var dir ="";
				function fn(ev) {
					if(ev.wheelDelta){
						dir = ev.wheelDelta>0?"up":"down";
					}else if(ev.detail){
						dir = ev.detail<0?"up":"down";
					}
					preIndex = now;
					switch (dir){
						case "up":
							if (now>0){
								now--;
								move(now);	
							}
							break;
						case "down":
							if (now<cLiNodes.length-1){
								now++;
								move(now);	
							}											
							break;
					}				
				}			
				
				/*内容区的高度等于视口高度-头部的高度*/
				/*JS动态获取内容区的高度*/
				container.style.height = document.documentElement.clientHeight - headNode.offsetHeight+'px';
				for (var i = 0; i < cLiNodes.length; i++) {
					cLiNodes[i].style.height = document.documentElement.clientHeight - headNode.offsetHeight+'px';
				}
				for (var i=0;i<dotLiNodes.length;i++) {
					//转绑
					dotLiNodes[i].index = i;//0,1,2,3,4
					dotLiNodes[i].onclick = function() {
						//now 被赋值之前是上一屏的索引
					  preIndex = now;
					  
						move(this.index);
						now = this.index;
					}
				}
			}
			
			
			/*头部交互*/
			headBind();
			function headBind() {
				for(var i =0; i<LiNodes.length; i++) {
						//转绑
						LiNodes[i].index = i;//0,1,2,3,4
						LiNodes[i].onclick = function () {
							//now 赋值之前是上一屏的索引
						  preIndex = now;
						  
							move(this.index);
							//将点击每屏的index放到全局作用域中
							now = this.index;
						}
						
				}				
				
			}
			//动画的核心函数
			function move(index) {
				//导航样式同步
				for(var i=0;i<LiNodes.length;i++){
					LiNodes[i].className = "";
				}
				LiNodes[index].className = "active";
				//小圆点样式同步
				for(var i=0;i<dotLiNodes.length;i++){
					dotLiNodes[i].className = "";
				}
				dotLiNodes[index].className ="active";

		        //出入场动画执行
		        if(anArr[index] && typeof anArr[index]["inAn"] === "function"){
		          anArr[index]["inAn"]();
		        }
		        //出场
		        if(anArr[preIndex] && typeof anArr[preIndex]["outAn"] === "function"){
		          anArr[preIndex]["outAn"]();
		        }

				//将list整体往上移动每屏的高度（视口-头部的高度）
				cList.style.top = -index*(document.documentElement.clientHeight - headNode.offsetHeight)+'px';
			}
			
			
			
		}
	
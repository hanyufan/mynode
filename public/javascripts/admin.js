	//为含有ul的li添加单击事件  
$("li:has(ul)").click(function(e){
	e.stopPropagation();//解决冒泡问题
	// 单击时：如果ul是显示的  就隐藏+     如果是隐藏的就显示  - 
	//$(this).children("ul").css("display") == "none"
	if( $(this).children("ul").is(":hidden") ){ //is方法 表示判断某个元素是否是隐藏的
	}else{
		$(this).children("i").eq(2).addClass("iconfont icon-jianquminus25")
		$(this).children("i").eq(2).removeClass("iconfont icon-jia1")
	}
	$(this).children("ul").toggle(300);
})

	//ajax局部加载
	var button1s = document.getElementsByClassName("button1")
	var button2s = document.getElementsByClassName("button2")
	for( let i = 0 ; i < 2 ; i++){
		button1s[i].onclick = function() {
			$(".content").load("admin_3")
		}
		button2s[i].onclick = function() {
			$(".content").load("admin_2")
		}
	}

		
	

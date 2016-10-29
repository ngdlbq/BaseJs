
// 前台调用
var $ = function(){
	return new Base();
}


// 基础库
function Base(){
	this.elements = [];
}


// 获取 ID 节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id)); 
	return this;
}


// 获取 元素 节点数组
Base.prototype.getTag = function(name){
	var ele = document.getElementsByTagName(name); 
	for (var i = 0; i < ele.length; i++) {
		this.elements.push(ele[i]); 
	};
	return this;
}


// 获取 class节点数组
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else{
		node = document;
	}

	var all = node.getElementsByTagName('*'); 
	for (var i = 0; i < all.length; i++) {
		if(all[i].className == className){
			this.elements.push(all[i]); 
		}
	};
	return this;
}

Base.prototype.eq = function(num){
	var eles = this.elements;
	this.elements = [];
	this.elements.push(eles[num]);
	return this;
}


// 设置/获取 CSS
Base.prototype.css = function(attr,value){
	var eles = this.elements
	for (var i = 0; i < eles.length; i++) {
		if(arguments.length == 1){
			return eles[i].currentStyle?eles[i].currentStyle[attr]:getComputedStyle(eles[i])[attr];
		}
		eles[i].style[attr] = value;
	};
	return this;
}


// 添加 class 样式
Base.prototype.addClass = function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className += ' ' + className;
		}
	};
	return this;
}


// 移除 class 样式
Base.prototype.removeClass = function(className){
	for (var i = 0; i < this.elements.length; i++) {
		var arr = [];
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'\\s|$'))){
			// arr = this.elements[i].className.split(new RegExp('(\\s|^)'+className+'\\s|$'));
			// this.elements[i].className = arr.join(' ');
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'\\s|$'),'');
		}
	};
	return this;
}


// 添加 link 或 style的CSS 样式
Base.prototype.addRule = function(num,selector,cssText,position) {
	var sheet = document.styleSheets[num];        // 获取第 num 个 link(或style)

	if(typeof sheet.inserRule != 'undefined'){   // W3C
		sheet.inserRule(selector+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule != 'undefined'){   //IE
		sheet.addRule(selector,cssText,position);
	}
	return this;
}


// 移除 link 或 style的CSS 样式
Base.prototype.removeRule = function(num,position) {
	var sheet = document.styleSheets[num];        // 获取第 num 个 link(或style)

	if(typeof sheet.deleteRule != 'undefined'){    // W3C
		sheet.deleteRule(position);
	}else if(typeof sheet.removeRule != 'undefined'){      //IE
		sheet.removeRule(position);
	}
	return this;
}





// 设置/获取  HTML
Base.prototype.html = function(str){
	var eles = this.elements
	for (var i = 0; i < eles.length; i++) {
		if(arguments.length == 0){
			return eles[i].innerHTML;
		}
		eles[i].innerHTML = str;
	};
	return this;
}


//添加点击事件
Base.prototype.click = function(fn){
	var eles = this.elements
	for (var i = 0; i < eles.length; i++) {
		eles[i].onclick = fn;
	};
	return this;
}




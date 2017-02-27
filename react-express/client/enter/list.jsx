import React from 'react';
import ReactDOM from 'react-dom';

/*  

	page 入口文件

	在服务端做 首屏渲染   他是 在server的程序里面请求数据  然后将数据放到这里来做渲染不是很好吗？  是

 */

function  clickBtn( e ){
	console.log( this );
	console.log('waibu:', e );
}

class HelloWorld extends React.Component {
	
	clickBtn(e){
		var dada_e = {};
		var dada_this ={};
		for( var key in e ){
			dada_e[key] = e[key];
		};
		
		for( var key in this ){
			dada_this[key] = e[key];
		};
		
		console.log( dada_e , dada_this );
	}
	
	mapComponenter(){
		var  arr = [ 'a', 'b', 'c' , 'd'];
		return arr.map( function(v, k){
			return (
				<div>{k}:{v}</div>
			)
		});
	}
	
 	render(){
 		
	    return (
	    	<div >
	    		<div>hello word</div>
	    		<button  onClick={this.clickBtn.bind(this)}  >click me</button>
	    		<button  onClick={clickBtn}  >click me</button>
	    		{ this.mapComponenter() }
	    	</div>
	    );
	}
}









///
if( typeof window  !== 'undefined' ){

	// 后端程序不需要  scss  ，但是会被  webpack抽离  样式的引入就多了这么一个判断    不过没有关系哈！   我们继续  问题得到了解决  用起来也还行 就不哟啊哦去纠结了
	// 服务端的热替换咋办啊
	require('../styles/app.scss');

	var app = document.getElementById('app');
	ReactDOM.render(
		<HelloWorld />,
		app
	);
}

if(  module.hot ){
	module.hot.accept();
}


module.exports = HelloWorld;
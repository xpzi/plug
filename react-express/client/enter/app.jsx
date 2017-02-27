import React from 'react';
import ReactDOM from 'react-dom';

import CommUser from '../scripts/component/CommUser.jsx';
import Header from '../scripts/component/Header.jsx';
import Table from '../scripts/component/table.jsx';

/*
我应该做什么？
	
	1.  使用react做一个时钟
*/


// import ActionLink from '../scripts/component/ActionLink.jsx';


/*
app 这个入口就在这里咯

*/

///
class Demo extends React.Component {
  render() {
    return (
    	<div>  我是DEMO  这回可以了  ok也说
    		<div>It is {props.date.toLocaleTimeString()}.</div> 
    	</div>
    );
  }
}

///
class HelloWorld extends React.Component {
  render() {
    return (
    	<div >
    		<Header />
    		<Table />
    		<CommUser picList="abcd" />
    		<CommUser  />
    		<CommUser  />
    		<CommUser  picList="abcd"  />
    		<CommUser  />
    		<CommUser  />
    	</div>
    );
  }
}



///
function  ActionLink(){
	
	function handleClick( e ) {
		e.preventDefault();
		console.log( 'The link was ckicked' );
	}

	return (
		<a href="#" oncClick={handleClick} >  Click  me</a>

	)

}


///
// 使用函数定义组件
function Welcome(props) {
  return (
  	<h1>Hello, {props.name} {props.date.toLocaleTimeString()}
  		<ActionLink />
  </h1>);
}
  
// 使用  const 定义简单组件?? 这明明是一个变量
const element = <div>hello yjp && xiaxia</div>;


///
if(  module.hot ){
	module.hot.accept();
}

///
if( typeof window  !== 'undefined' ){
	require('../styles/app.scss');
	var app = document.getElementById('app');

	function tick(){
			ReactDOM.render(
			<HelloWorld />,
			app
		);
	}
	tick();
//	setInterval( tick, 1000 );


}

module.exports = HelloWorld;
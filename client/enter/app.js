import React from 'react';
import ReactDOM from 'react-dom';

/*  将Home 组件为页面的主组件*/
import Home from '../script/home.js'



/*  增加page的时候下面不需要修改  */
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var data;
    if( typeof window  !== 'undefined' ){
      if( window.initData ){
        data = window.initData;
      }
    }else if( typeof global  !== 'undefined' ){
      if( global.initData ){
        data = global.initData;
      }
    }
    return (
        <Home  initData={ data }  />
    )
  }
}


///
if(  module.hot ){
	module.hot.accept();
}


if( typeof window  !== 'undefined' ){
	var app = document.getElementById('app');
	ReactDOM.render(
		<App />,
		app
	)
}


module.exports = App;





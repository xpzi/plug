import React from 'react';
import ReactDOM from 'react-dom';

import Home from '../script/component/home/index.js';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var data = [];
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





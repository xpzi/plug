import React from 'react';
import ReactDOM from 'react-dom';

import Home from '../script/home.js'


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var data = [];
    if( typeof window  !== 'undefined' ){
      if( window.initData ){
        console.log(  window.initData  )
        data = window.initData.chief_list_star.data;
      }
    }else if( typeof global  !== 'undefined' ){
      if( global.initData ){
        data = global.initData.chief_list_star.data;
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





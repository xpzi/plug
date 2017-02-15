'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

require( '../styles/list.scss' );

var List = React.createClass({
    getInitialState: function() {
      return {data: this.props.data};
    },
    componentDidMount: function() {
      var reqwest = require('reqwest');
      var unload = true;
      var that = this;
      document.onscroll = function(){
      	if(document.documentElement.scrollHeight - document.documentElement.clientHeight- document.body.scrollTop <=0 && unload){
      		console.log(document.body.scrollTop);
			var reqData = {
				"city_code": "bj",
				"offset": "2",
				"count": "20",
				"listorder": "1",
				"unique_cart": "000000"
			};
			reqwest({
				url: '/m.7gzapi/Chief/get_chief_list',
				method: 'post',
				data: reqData,
				success: function (resp) {
					console.log(unload);
				 	unload = false;
				 	that.setState({data: that.state.data.concat( resp.data )});
				}
			});
      	}
      };
    },
	render: function() {
		return (
			<div>
	          <ul>
	            {this.state.data.map(function(result, i){
	              return <li key={i} >{ result }</li>;
	            })}
	          </ul>
			</div>
		);
	}

});


///

var  initData = {data: ['浏览器好了', 'yjp', 'xuxia']};
if ( typeof window !== 'undefined' ) {
    // ReactDOM.render(
    // 	<div>hello word!
    // 		<div	>浏览器端  运行成功</div>
    // 	</div>,
    // 	document.getElementById( 'app' )
    // );
    console.log( initData );
    ReactDOM.render(
    	React.createElement(List, initData , 'wenzi'),
    	document.getElementById( 'app' )
    );
}

///
module.exports = List;






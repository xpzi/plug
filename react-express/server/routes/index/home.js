import React from 'react';
import ReactDOMServer from 'react-dom/server';
var myfetch = require('../../utils/myfetch.js');
var async = require('async');
var page = require('../../utils/enter.js');
var url = require('../../utils/url.js');

module.exports = function(req, res, next) {

	async.parallel({
		chief_list_star(callback){
          	myfetch.postJson( url.mqgz +'Index/apiindex', callback);
		}

	},function(err, data){
		if( err ){
			res.render('error');
		} else{
			global.initData = data;
			var App = React.createFactory( page.home );
			var initHTML  = ReactDOMServer.renderToString( App() );
			
			// render这里面的东西是要 模版需要的数据
			res.render('home', { 
				title: '抢工长m站', 
				data: initHTML,
				initData: JSON.stringify( data) ,
				isDev: global.isDev
			});


		}
	})
}
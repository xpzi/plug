import React from 'react';
import ReactDOMServer from 'react-dom/server';
var myfetch = require('../../utils/myfetch.js');
var async = require('async');
var page = require('../../utils/enter.js');
var url = require('../../utils/url.js');


module.exports =  function( req, res, next ){
	

	async.parallel({
		chieflist(callback){
			var params = {
				isajax: 1,
				p: 1,
				sort: 1,
				label: ''
			}
          	myfetch.getJson( url.mqgz +'Index/chieflist', params ,callback);
		}

	},function(err, data){

		if( err ){
			res.render('error');
		} else{
			
			
			global.initData = data;
			var App = React.createFactory( page.zxcase );
			var initHTML  = ReactDOMServer.renderToString( App() );

			res.render('zxcase', { 
				title: '工长案例', 
				data: initHTML,
				initData: JSON.stringify( data) ,
				isDev: global.isDev
			});
		}
	})
}

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
			var App = React.createFactory( page.chieflist );
			var initHTML  = ReactDOMServer.renderToString( App() );

			res.render('chieflist', { 
				title: '工长列表', 
				data: initHTML,
				initData: JSON.stringify( data) ,
				isDev: global.isDev
			});
		}
	})
}

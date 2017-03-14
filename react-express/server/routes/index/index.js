import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import Html from './html.js';


var myfetch = require('../../utils/myfetch.js');
var async = require('async');
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
	console.log( global._development_ );

	if (global._development_)
	{
		webpack_isomorphic_tools.refresh()
	}

	async.parallel({
		chief_list_star(callback){
			var reqData = {
	            "method": "api_search_gz",
	            "project": "gz_chief",
	            "condition": { 
	                "city": 'bj',
	                "star_type": 2
	            },   
	            "pagesize": 10
          	};
          	myfetch.postJson('http://search.7gz.com/Api',reqData, callback);
		},
	},function(err, data){
		if( err ){
			res.render('error');
		} else{

			data.assets = webpack_isomorphic_tools.assets();
			global.initData = data;
			var App = React.createFactory( require('../../../client/enter/app.js') );
			var initHTML  = ReactDOMServer.renderToString( App() );
			res.render('index', { 
				title: 'Express', 
				initData: JSON.stringify( data) , 
				data: initHTML,
				name: 'gggggggggggg'
			});
		}
	})

	
	// res.render('index', { title: 'Express', name: '这里的是速度呢  深刻的粉红色开户费' });
});

module.exports = router;

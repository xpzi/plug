var http = require('../util/http.js');
var express = require('express'),
    router = express.Router();


var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ListConnper = require( '../../src/scripts/list.js' );


router.get('/', function(req, res) {
    res.render('page1');
});


router.get('/list' , function(req, res){
	var reqData = {
        "city_code": "bj",
        "offset": "1",
        "count": "20",
        "listorder": "1",
        "unique_cart": "000000"
    };
    var requrl = 'http://m.7gz.com/Chief/get_chief_list'; // 接口地址
    http.post(requrl, reqData, function(json){
        try {
          json = JSON.parse(json);
          // 数据拿到了  ok
          
        } catch (error) {
        	res.send( '接口调用出错' );
          return;
        }

        // 创建一个 react 工厂
        var List = React.createFactory(ListConnper);
        var initHTML  = ReactDOMServer.renderToString( List(json) );
        res.send( initHTML );

	});




	// res.render('list');




});

module.exports = router;
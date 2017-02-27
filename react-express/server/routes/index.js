import React from 'react';
import ReactDOMServer from 'react-dom/server';

var fs = require('fs');
var express = require('express');
var router = express.Router();
var reload = require('reload');




router.get( '/lib/:name', function( req, res , next ){
	
	var options = {
	    root: __dirname + '/../../dist/lib/'
	};
	
	console.log( options.root );
	
	  var fileName = req.params.name;
	  res.sendFile(fileName, options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent:', fileName);
	    }
	  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
var App = React.createFactory( require('../../client/enter/app.jsx') );
	var initHTML  = ReactDOMServer.renderToString( App({name: 'nonono!   love  love love !'}) );
	res.render('index', {data: initHTML});

//	res.send( ' genhxing  test ' );
});

/* GET home page. */
router.get('/list', function(req, res, next) {
  var List = React.createFactory( require('../../client/enter/list.jsx') );
	 var initHTML  = ReactDOMServer.renderToString( List({name: 'nonono!   love  love love !'}) );
	res.render('list', {data: initHTML});
});

router.get('/ok', function(req, res, next) {
	res.send('ok');
});

module.exports = router;

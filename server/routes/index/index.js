import React from 'react';
import ReactDOMServer from 'react-dom/server';

var myfetch = require('../../utils/myfetch.js');
var async = require('async');
var express = require('express');
var router = express.Router();
var page = require('../../utils/enter.js');
var url = require('../../utils/url.js');

// if (global._development_)
// {
// 	webpack_isomorphic_tools.refresh()
// }
// data.assets = webpack_isomorphic_tools.assets();


/* GET home page. */
router.get('/', require('./home.js'));

router.get('/chieflist', require('./chieflist.js'));

router.get('/zxcase', require('./zxcase.js'));


router.get('/apiindex', function(req, res, next){

	res.send('还没有开始')
})

module.exports = router;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var proxy = require('express-http-proxy');
var template = require('art-template');
global.isDev = process.env.NODE_ENV == 'development' &&  process.env.PRODU != 'production';

var app = express();

//配置服务器代理 解决跨域问题
app.use('/7gzapi', proxy('www.7gz.com'));
app.use('/search.7gzapi', proxy('search.7gz.com'));
app.use('/m.7gzapi', proxy('m.7gz.com'));

/* 配置模版引擎为 artTemplate */
template.config("escape", false);
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');



// 是开发模式
if( isDev ){
	app.set('views', __dirname + '/client/html');
	require('./webpackMiddleware.config.js')(app);
	require('./server/routes/index.js')(app);
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'dist', 'lib')));
}else{
	app.set('views', __dirname + '/server/views');
	require('./server/routes/index.js')(app);
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'dist')));
	app.use(express.static(path.join(__dirname, 'dist', 'lib')));
}

// console.log('--->app:' ,process.env.NODE_ENV );
// console.log('--->PRODU:' ,process.env.PRODU );
module.exports = app;

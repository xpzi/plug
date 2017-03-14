var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var proxy = require('express-http-proxy');
var template = require('art-template');





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
app.set('views', __dirname + '/server/views');

require('./webpackMiddleware.config.js')(app);
require('./server/routes/index.js')(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist', 'static')));





module.exports = app;

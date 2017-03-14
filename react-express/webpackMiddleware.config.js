var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.js');

var middleware = function( app ){
	var compiler = webpack(  webpackConfig );

	app.use( webpackDevMiddleware( compiler, {
		publicPath: webpackConfig.output.publicPath,
		noInfo: true,
        stats: {
            colors: true
        }
	}));
	
	app.use( webpackHotMiddleware( compiler ) );
}

module.exports = middleware;
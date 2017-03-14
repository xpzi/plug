var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
	require('./webpack-isomorphic-tools-config.js')).development();

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var extractSass = new ExtractTextPlugin({
    filename: "css/[name].css"
});


module.exports = {
	context: path.resolve(__dirname),
	entry: {
		app: ['./client/enter/app.js', hotMiddlewareScript]
	},

	output: {
		filename: 'js/[name].js',
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: publicPath
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use:  extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }],
	                fallback: "style-loader"
	            })
			},
			{
		        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
		        use: ['url-loader?limit=10240&name=images/[name].[ext]?[hash]']
		    }
		]
	},
	
	plugins: [
		/*  配置公共js */
		// new webpack.optimize.CommonsChunkPlugin({
  //           name: 'vendors'
  //       }),


        /* css 抽离插件 */
        extractSass,
        /* 用于文件抽离 */
        webpack_isomorphic_tools_plugin,

		/* 压缩js 插件   不能再开发过程中使用   */
		// new webpack.optimize.UglifyJsPlugin({
		//     compress: {
		// 	    warnings: false,
		// 	    drop_console: false,
		//     }
		// }),

        /*  html抽离   抽离出来独立运行  不能再开发过程中使用 */
       	// new HtmlWebpackPlugin({
       	// 	template: path.join(__dirname, './client/html/index.html'),
       	// 	filename: path.join(__dirname, './server/views/demo.html'),
       	// }),


		/* 热更新需要的 */
		new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/vendor-manifest.json')
	    }),
	    /* 用于文件抽离 */
        webpack_isomorphic_tools_plugin

	]


}
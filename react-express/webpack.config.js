var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin') ;
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
	require('./webpack-isomorphic-tools-config.js')).development();
var isDev = process.env.NODE_ENV == 'development';
var publicPath = 'http://yangjinp.vicp.cc/';//'http://localhost:3000/';
var extractSass = new ExtractTextPlugin({
    filename:  isDev ? "css/[name].css" : "css/[name]-[contenthash].css"
});



console.log('------->initPlugins:' ,process.env.NODE_ENV );
function initPlugins(){	
	switch(process.env.NODE_ENV){
		case 'development': 
			return devPlugins();
			break;
		case 'build': 
			return buildPlugin();
			break;
	}
	return [];
}


function pacgEnter( enter ){
	var hotMiddlewareScript =  'webpack-hot-middleware/client?reload=true';
	if( process.env.NODE_ENV != 'build' ){
		for( var name in enter ){
			enter[name].push(hotMiddlewareScript);
		}
	}
	return enter;
}


module.exports = {
	context: path.resolve(__dirname),
	entry: pacgEnter({
		app: ['./client/enter/app.js'],
		home: ['./client/enter/home.js']
	}),

	output: {
		filename: isDev ? 'js/[name].js' : 'js/[name]-[chunkhash].js',
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: publicPath
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use:  extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }],
	                fallback: "style-loader"
	            })
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
		        use: ['url-loader?limit=10240&name=images/[name]-[hash].[ext]']
		    }
		]
	},	
	plugins: initPlugins()

}



function devPlugins(){
	return [
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendors'
	    }),

		/* 文件抽离 样式，图片等 */
        extractSass,
        webpack_isomorphic_tools_plugin,
        new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),

		/* dll库方法使用案例 */
		new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/lib/vendor-manifest.json')
	    }),
	    new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/lib/plugin-manifest.json')
	    })
	];
}


function buildPlugin(){
	return [
		new DashboardPlugin(),
		new webpack.NamedModulesPlugin(),
		/* dll库方法使用案例 */
		new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/lib/vendor-manifest.json')
	    }),
	    new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/lib/plugin-manifest.json')
	    }),
		/*  抽离公共部分的js  可以多个 */
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendors',
            chunks: ['app', 'home'],
            minChunks: 2
	    }),
		/* 文件抽离 样式，图片等 */
        extractSass,
        new OptimizeCssAssetsPlugin(),
        webpack_isomorphic_tools_plugin,
        /* 打包html可以多个 */
	   	new HtmlWebpackPlugin({
	   		template: path.join(__dirname, './client/html/index.html'),
	   		filename: path.join(__dirname, './server/views/index.html'),
	   		chunks: ['vendors','app']
	   	}),
	   	new HtmlWebpackPlugin({
	   		template: path.join(__dirname, './client/html/home.html'),
	   		filename: path.join(__dirname, './server/views/home.html'),
	   		chunks: ['vendors','home']
	   	}),
	    /* 压缩js  */
		new webpack.DefinePlugin({
      		'process.env': {
	        	NODE_ENV: JSON.stringify('production')
	    	}
	    }),
	  	new webpack.optimize.UglifyJsPlugin()	
	];
}
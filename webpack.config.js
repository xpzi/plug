var fs = require("fs");
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
var Enter = require('./config/config.js');

// 中间件访问的地址
var publicPath = 'http://127.0.0.1:1314/';  //'http://yangjinp.vicp.cc/';//'http://localhost:3000/';



var webpackConfig={
	context: path.resolve(__dirname),
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
				use:  ExtractTextPlugin.extract({
	                use: [{
	                    loader: "css-loader"
	                }],
	                fallback: "style-loader"
	            })
			},
			{
				test: /\.scss$/,
				use:  ExtractTextPlugin.extract({
	                use: [{
	                    loader: "css-loader"
	                },{
	                	// 使用autoperfixer 做样式自动兼容
	                	loader: 'autoprefixer-loader?{browsers:["ios >= 7", "android >= 4.2"]}',
	                },{
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
}

webpackConfig['entry'] = Enter.pageEnter( process.env.NODE_ENV != 'build' );
webpackConfig['plugins'] = isDev ? devPlugins() : buildPlugin();



/*  开发时候的 插件  */
function devPlugins(){
	return getDll([
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendors'
	    }),
		/* 文件抽离 样式，图片等 */
        new ExtractTextPlugin({
		    filename:  isDev ? "css/[name].css" : "css/[name]-[contenthash].css"
		}),
        webpack_isomorphic_tools_plugin,
        new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]);
}

/*  编译时候的 插件  */
function buildPlugin(){
	return getHtmlPlugin(getDll([
		new DashboardPlugin(),
		new webpack.NamedModulesPlugin(),
		/*  抽离公共部分的js  可以多个 */
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendors'
            // chunks: ['app', 'home'],
            // minChunks: 2
	    }),
		/* 文件抽离 样式，图片等 */
        new ExtractTextPlugin({
		    filename:  isDev ? "css/[name].css" : "css/[name]-[contenthash].css"
		}),
        new OptimizeCssAssetsPlugin({
        	cssProcessorOptions: {
        		autoprefixer:{
        			// 防止兼容样式被删除
					remove: false
	        	}
        	}
        }),
        webpack_isomorphic_tools_plugin,
	    /* 压缩js  */
		new webpack.DefinePlugin({
      		'process.env': {
	        	NODE_ENV: JSON.stringify('production')
	    	}
	    }),
	  	new webpack.optimize.UglifyJsPlugin()	
	]));
}

/*  根据dll配置文件生成 dll的使用插件 */
function getDll(plugin){
	var dllEnter = Enter.dll;
	for(var  key in dllEnter){
		/* dll库方法使用案例 */
		plugin.push(new webpack.DllReferencePlugin({
	    	context: __dirname,
	    	manifest: require('./dist/lib/'+key+'-manifest.json')
	    }));
	}
	return plugin;
}

/*  根据html目录下的文件 自动配置Htmlwebpackplugin */
function getHtmlPlugin( plugin ){
	var tplHtml = Enter.tpl.html;
	var enter = Enter.tpl.enterPath;
	var output = Enter.tpl.outputPath;
	for( var name in tplHtml ){
		plugin.push(new HtmlWebpackPlugin({
	   		template: path.join(__dirname, enter+tplHtml[name]),
	   		filename: path.join(__dirname, output+tplHtml[name]),
	   		chunks: ['vendors',name]
	   	}))
	}
	return plugin;
}

module.exports = webpackConfig;
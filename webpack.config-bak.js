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
var Enter = require('./config/enter-config.js');

// 中间件访问的地址
var publicPath = 'http://127.0.0.1:1314/';  //'http://yangjinp.vicp.cc/';//'http://localhost:3000/';
// css 插件的配置
var extractSass = new ExtractTextPlugin({
    filename:  isDev ? "css/[name].css" : "css/[name]-[contenthash].css"
});


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
	                },{
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

webpackConfig['entry'] = pacgEnter( entryList('./client/enter/'));
webpackConfig['plugins'] = initPlugins();



/*  入口文件自动获取不需要再配置  */
function entryList(url) {
	url = path.resolve( url);
	var filesPath = {};
	var FolderRecursive = function( ){
		var files = [];
		//判断给定的路径是否存在
		if( fs.existsSync(url) ) {
			//返回文件和子目录的数组
			files = fs.readdirSync(url);
			files.forEach(function(file,index){
				var curPath = path.join(url,file);
				var name = file.split('.');
				name.length = name.length - 1;
      			name = name.join('.');

				if(fs.statSync(curPath).isDirectory()) { 
					FolderRecursive(curPath);
				} else {
					if(name){
						filesPath[name] = [curPath];
					}
				}
			});
		}else{
			console.log("给定的路径不存在，请给出正确的路径");
		}
	}
	FolderRecursive();
	return filesPath;
};



/*  在开发时怎建热更新功能，生产时则不需要  */
function pacgEnter( enter ){
	var hotMiddlewareScript =  'webpack-hot-middleware/client?reload=true';
	if( process.env.NODE_ENV != 'build' ){
		for( var name in enter ){
			enter[name].push(hotMiddlewareScript);
		}
	}
	return enter;
}

/*  通过传入的变脸使用对应的插件 */
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

/*  开发时候的 插件  */
function devPlugins(){
	return getDll([
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendors'
	    }),

		/* 文件抽离 样式，图片等 */
        extractSass,
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
        extractSass,
        new OptimizeCssAssetsPlugin({
        	cssProcessorOptions: {
        		autoprefixer:{
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
	]), './client/html', './server/views');
}

/*  根据dll配置文件生成 dll的使用插件 */
function getDll(plugin){
	var dllEnter = require('./config/dll-config.js');
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
function getHtmlPlugin( plugin, url, out ){
	var FolderRecursive = function( ){
		var files = [];
		//判断给定的路径是否存在
		if( fs.existsSync(url) ) {
			//返回文件和子目录的数组
			files = fs.readdirSync(url);
			files.forEach(function(file,index){
				var curPath = url + '/'+ file;
				if(fs.statSync(curPath).isDirectory()) { 
					FolderRecursive(curPath);
				} else {
					var name = file.split('.');
					name.length = name.length - 1;
	      			name = name.join('.');
					if(name){
						plugin.push(new HtmlWebpackPlugin({
					   		template: path.join(__dirname, curPath),
					   		filename: path.join(__dirname, curPath.replace(url, out)),
					   		chunks: ['vendors',name]
					   	}))
					}
				}
			});
		}else{
			console.log("给定的路径不存在，请给出正确的路径");
		}
	}
	FolderRecursive();
	return plugin;
}





module.exports = webpackConfig;
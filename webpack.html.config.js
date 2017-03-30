var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin') ;
var path = require('path');

module.exports = [

	/* 压缩js  */
	new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  new webpack.optimize.UglifyJsPlugin(),

	/*  抽离公共部分的js  可以多个 */
	new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors'
    }),

	/* 打包html可以多个 */
   	new HtmlWebpackPlugin({
   		template: path.join(__dirname, './client/html/index.html'),
   		filename: path.join(__dirname, './server/views/index.html'),
   	}),
   	new HtmlWebpackPlugin({
   		template: path.join(__dirname, './client/html/demo.html'),
   		filename: path.join(__dirname, './server/views/demo.html'),
   	}),

]
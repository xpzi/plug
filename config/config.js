var fs = require("fs");
var path = require('path');


module.exports = {
	/* 开发的时候，只调式指定页面 */
	debugAll: true,

	/* 页面打包配置，  配置需要打包的入口  */
	enter:{
		// app: ["./client/enter/app.js"],
		// chieflist: ["./client/enter/chieflist.js"],
		home: ["./client/enter/home.js"],
		// zxcase: ["./client/enter/zxcase.js"],
	},

	/*  模版打包配置  */
	tpl: {
		html:{
			// layout: "layout.html",
			// error: "error.html",
			// index: "index.html",
			// demo: "demo.html",
			// home: "home.html",
			// chieflist: "chieflist.html",
			// zxcase: "zxcase.html",
		},
		enterPath:'./client/html/',
		outputPath: './server/views/'
	},

	/*  公共库打包配置 */
	dll: {
		vendor: ['react', 'react-dom'],
	    plugin: ['swiper']
	},



	/*  在开发时怎建热更新功能，生产时则不需要  */
	pageEnter: function( noBuild ){
		var enter = this.enter;
		if( noBuild ){
			var hotMiddlewareScript =  'webpack-hot-middleware/client?reload=true';
			if(this.debugAll){
				enter = this.entryList('./client/enter/');
			}
			for( var name in enter ){
				enter[name].push(hotMiddlewareScript);
			}
		}
		return enter;
	},
	/*  入口文件自动获取不需要再配置  */
	entryList: function(url) {
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
	}
}
# react服务器渲染


## 运行方法
	
npm install
npm install nodemon -g
npm start


## 在浏览器查看

http://localhist:3000


## 命令

npm run start    	启动开发模式
npm run build    	打包程序文件
npm run dll			打包公共库
npm run pro		生产模式
npm run public		部署文件	


## 使用

- 目录结构
	
```
|---project
	|---server		// 服务端代码
	|---client		// 客户端代码
	|---dist		// 打包后的目录
	|---bin			// 启动配置
	...  			// 更多配置文件
```





	

- 公共库的打包

	在webpack.dll.config.js中配置依赖库的名字
	```
		entry: {
		    react: ['react', 'react-dom'],
		    pulgin: ['swiper','iscroll']
		}
	```

	在页面中使用依赖库
	```
		<script src="react.dll.js"></script>
		<script src="pulgin.dll.js"></script>
	```

- 项目文件编译打包
	npm run build
	js、css、图片打包到dist目录中
	html模版 打包到 server/view目录下用做模版
	
	html模版在client中编写
	html模版打包配置在webpack.html.config.js中


- 启动成产环境
	npm run pro

	server端运行react的方式与开发模式一样
		react的服务端渲染用的是clientjs源代码不是打包后的代码
	不同：
		1. 没有热更新功能(reload，webpack_hmr)
		2. 前端代码为静态资源(dist目录)










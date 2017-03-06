# react-express Demo

react服务端渲染，解决前后端分离seo优化问题。

### 使用

	- 安装依赖

		cnpm i

	- 安装nodemon服务端热启动工具

		cnpm i nodemon -g

	- 运行项目

		npm run mon

	- 在浏览器访问  

		http://localhost:3030




###  目录说明
	react-express
		|-bin   	启动脚本
		|-dist		发布目录
			|-js		js文件
			|-css		css文件

		|-client 	客户端源文件
			|-enter		入口文件
			|-script	js文件
			|-style		scss文件

		|-server	服务端源文件
			|-router	路由配置目录
			|-util		服务器文件
			|-views		模版目录
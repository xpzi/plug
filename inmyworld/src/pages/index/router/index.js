import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Config from 'src/config'

Vue.use(Router)


// 路由切换后  回到顶部
var jumpScrollTop = function( route ){
	for(let i = 0; i< route.length ; i++){
		route[i].beforeEnter = getBeforeEnter(route[i].beforeEnter);
	}
	function getBeforeEnter( func ){
		return function(to, from, next){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			if( func instanceof Function ){
				func(to, from, next);
			}else{
				next();
			}
		}
	}
}


jumpScrollTop(routes);



const router = new Router({
  base: '/',

  mode: 'hash',
  
  routes
})

router.beforeEach((to, from, next) => {
  let pathName = window.location.pathname
  if( pathName === '/admin' ){
    window.location.href = Config.APIHOST + 'admin';
    return;
  }
  // 如果没有匹配的路由, 说明可能路由名字输入错误, 默认给重定向到首页
  if (to.matched.length) {
    next()
  } else {
    next('/home')
  }
})


router.afterEach((to, from, next) => {
    // 主动发送百度统计
    _hmt && _hmt.push(['_trackPageview', '/#'+to.path]);
})

export default router
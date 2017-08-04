import 'common/less/base'               // 引入公共css样式
import 'babel-polyfill'

import $common from 'utils/common'
// import loading from 'components/loading'
import Vue from 'vue'
import vueProtoMix from './vueProtoMix'
import S from 'service'
import { userPromise, userStore, USER_MUTATION_TYPES } from 'comModules/user'


/* 全局修改 title的指令 */
Vue.directive('title', {
  inserted: function (el, binding) {
     document.title = binding.value;
  }
})

// 开始loading
// loading.show('entry')

// Vue配置文件
Vue.config.productionTip = false

// 注册Vue.prototype的混合
vueProtoMix(Vue)

const defaultOpts = {
  /**
   * 默认为null, 需要VueRouter的实例对象
   */
  router: null,

  /**
   * 默认为null, 需要Vuex.Store的实例对象
   */
  store: null,
  beforeInstance: $common.noop
}

const entry = (App, Options) => {
  Options = Object.assign(defaultOpts, Options)
  const { router, store } = Options

  // 初始化
  window.__vm__ = new Vue({
    el: '#app',
    
    data: {},
    
    store,
    
    router,

    components: { App },

    /**
     * 第一步 会进入路由中的各个routerEntry
     *    1) 不需要用户信息的路由, 没有该钩子函数, 不需要阻塞
     *    2) 需要用户信息的路由, 在routerEntry这个函数中通过 userPromise 进行阻塞, 直到执行then中的回调函数
     *      2.1) 已登录, 直接next()
     *      2.2) 未登录 next('/login)
     * 
     * 第二部会进入 beforeCreate, 在store中创建 User 
     * 
     * 第三步: 进入路由对用的 .vue 组件中
     */
    beforeCreate () {
      // console.log('new Vue options beforeCreated')
      // 注册 User 模块到vuex store
      this.$store.registerModule('User', userStore)

      userPromise.then((data) => {
        // 提交用户信息 到 User 模块
          if( data.code == 100){
              this.$store.commit(USER_MUTATION_TYPES.UPDATE_USER_INFO, data.data)
          }
      })
    },

    mounted () {
      // 结束loading
      // loading.hide('entry')
    },

    render (h) {
      // return <div>hello</div>
      return <app />
    }
  })
}

export default entry
import config from './config'
import srcConfig from 'src/config'
import * as utils from './utils'
import mocks from 'mocks'
import $common from 'utils/common'
import Vue from 'vue'
import VueResource from 'vue-resource'
import Service from './service'

// 注册 VueResource
Vue.use(VueResource)

// vue-resource 跨域的配置, 需要服务端配置, 不写也没啥事, 还是写上吧
Object.assign(Vue.http.options, {
  xhr: { 
    withCredentials: true   
  },
  crossOrigin: true,
  credentials: true,  // 跨越带 cookie
  emulateHTTP: true
})

/** 返回api集合
 * import S from 'service'
 * S.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 */

const service = new Service({
  isMock: srcConfig.build.IS_MOCK,
  mocks,
  
  beforeSend ({ serviceParams, data }) {
    
  },

  afterSend ({ serviceName, data }) {

  },

  success () {

  },

  fail () {

  }
})

// 初始化service类型
service.setReqInstance('VueResource'.toUpperCase(), Vue.http)

Object.defineProperties(Service, {
  $service: {
    ...config.definePropertySet,
    value: service
  },
  $extend: {
    ...config.definePropertySet,
    value: function $extend (obj) {
      if (obj && obj.constructor === Object) {
        return Object.assign(this, service.getApiCollection(obj))
      }
      return this
    }
  }
})



export default Service
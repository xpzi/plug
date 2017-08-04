/**
 * pages 业务层配置信息
 * @author libx@inke
 * @date 2017-05-23
 */
import build from './build'

const IS_DEV = build.IS_DEV
const HOST = location.host
const ORIGIN = location.origin

const prodRootMap = {
  // 线上
  'www.inmyworld.cn': 'https://api.inmyworld.cn/',
  // 测试
  'trunk.inmyworld.cn': 'https://trunk.ppe.inmyworld.cn/',

  // 开发
  'abc.com:8081': 'http://abc.com/',
  'ccc.com:8081': 'http://ccc.com/'
  // 'betaact.inke.cn': 'betaactapi.busi.inke.cn'
}

var webHOST = prodRootMap[Object.keys(prodRootMap).find((key) => HOST.indexOf(key) === 0)];
var APIHOST = webHOST ;

var PROD = {
  APIS: {
    root: APIHOST + 'webapi/'
  }
}

const DEV = {
  APIS: {
    root: APIHOST + 'webapi/'
  }
}

export default {
  IS_DEV,
  build,
  APIHOST,
  HOST:webHOST,

  /**
   * 模拟用户登录
   */
  simulateLogin: false,

  ...IS_DEV ? DEV : PROD
}
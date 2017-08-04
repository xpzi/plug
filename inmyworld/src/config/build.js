/**
 * build 层配置信息
 * 注意: build层是基于node的, 不能用import等语法, 不能对讲exports出去的对象给pages进行计算, 不能有window等对象,
 * @author libx@inke
 * @date 2017-05-23
 */
const IS_DEV = process && process.env.NODE_ENV === 'development'

const PROD_CONF = {
  BUILD: {
    /**
     * 资源文件根路径
     */
    assetsPublicPath: '/'
  }
}

const DEV_CONF = {
  
}

const CONFIG = {
  IS_DEV,

  DEV: DEV_CONF,
  
  PROD: PROD_CONF,

  /**
   * 项目标识
   */
  SCHEME: 'inmyworld.cn',

  /**
   * 项目名称
   */
  PROJECT_NAME: '映天下',

  /**
   * 是否mock
   */
  IS_MOCK: true,
  
  /**
   * 别名
   */
  ALIAS: {

  },

  /**
   * 跨域代理
   */
  PROXY_TABLE: {
    // '/goddess/*': 'actapi.busi.inke.cn',
    // '/app/*': 'actapi.busi.inke.cn',
    // '/webapi/*': 'https://trunk.ppe.inmyworld.cn'
  },

  /**
   * 端口
   */
  PORT: 8081
  
}

module.exports = CONFIG

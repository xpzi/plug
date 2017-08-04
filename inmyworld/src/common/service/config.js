export default {
  /**
   * 请求类型
   * @type {Object}
   */
  REQ_TYPE: {
    POST: 'post',
    GET: 'get',
    JSONP: 'jsonp',
    DELETE: 'delete',
    HEAD: 'head',
    PUT: 'put',
    PATCH: 'patch'
  },

  /**
   * 两个参数的请求数组
   */
  SHORT_PARAMS_LIST: ['get', 'head', 'delete', 'jsonp'],

  definePropertySet: {
    // 不可遍历
    enumerable: false,
    // 不能删除
    configurable: false,
    // 不能赋值
    writable: false
  },

  urlCurrySettings: {

    /**
     * 错误弹窗
     */
    errToast: true,

    /**
     * 自动显示loading
     */
    autoLoading: true,


    // // *** cors 跨域处理 ** //
    // mode: 'cors',
    // credentials: 'omit'
    
  },

  xFormOptions: {
    // 以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
    emulateJSON: true,
    headres: {
      'Content-Type': 'multipart/form-data'
    }
  }
}
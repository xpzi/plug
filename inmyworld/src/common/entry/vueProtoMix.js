
/*
* 
* 
* 
*/


import $loading from 'components/loading'     // 加载组件
import $Message from 'iview-ui/Message'       // 消息框
import $Modal from 'iview-ui/Modal'           // 模态框
import $Notice from 'iview-ui/Notice'         // 通知
// loadingbar 不太常用
// import LoadingBar from 'iview-ui/LoadingBar' // 加载进度条  [不太常用]

import S from 'service'                       // 接口访问方法
import $common from 'utils/common'            // 公共方法
import $user from 'user'                      // 用户访问
import $log from 'utils/log'                  //  

const staicMixMap = {
  // 基础必备ui组件们
  $loading,
  $Message,
  $Modal,
  $Notice,

  // 数据通信层
  $S: S,

  // 通用工具方法
  $common: $common,

  // 用户信息
  $user

  // 埋点统计
  // $log: $log
}

export default (Vue, more = {}) => { 
  const mixMap = {
    ...staicMixMap
  }

  const mix = (source, key, val) => {
    if (source[key]) {
      mix(source, `_${key}`, val)
    } else {
      source[key] = val
    }
  }

  Object.keys(mixMap).map((key) => {
    let val = mixMap[key]
    mix(Vue, key, val)
    mix(Vue.prototype, key, val)
  })
}
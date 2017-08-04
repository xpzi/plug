import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true

// export const WX_GET_SHARE_CONFIG = postRootXForm('app/wx_share_config', {}, {
//   autoLoading
// })

// 退出登录
export const EXTINFO = postRootXForm('cptuser/exitinfo', {}, {
  autoLoading
})

// // 发送验证码
// export const SEND_PHONE_CODE = postRootXForm('user/phone',{},{
// 	autoLoading
// })

// // 手机号注册没有检验
// export const PHONE_VERIF = postRootXForm('user/info',{},{
// 	autoLoading
// })

// // 手机号注册
// export const PHONE_REGIST = postRootXForm('user/regist',{},{
// 	autoLoading
// })
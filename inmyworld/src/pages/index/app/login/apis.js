import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true

// export const WX_GET_SHARE_CONFIG = postRootXForm('app/wx_share_config', {}, {
//   autoLoading
// })


// 登录
export const LOGIN = postRootXForm('user/login', {}, {
  autoLoading
})

// 手机号注册没有检验
export const PHONE_VERIF = postRootXForm('user/info',{},{
	autoLoading
})

// 手机号注册
export const PHONE_REGIST = postRootXForm('user/regist',{},{
	autoLoading
})



// 发送短信验证码  快速登录
export const SEND_PHONE_CODE = postRootXForm('user/phone',{},{
    autoLoading
})

// 发送短信验证码  找回密码
export const SEND_MSG_CODE = postRootXForm('forgetpass/sendmns',{},{
    autoLoading
})

// 获取图片验证码
export const GET_PIC_CODE = getRoot('forgetpass/getcaptchasrc',{},{
    autoLoading
})



// 短信 验证码验证
export const VERIFY_CODE = postRootXForm('',{},{
    autoLoading
})
// 短信 验证码验证  找回密码
export const VERIFY_MSG_CODE = postRootXForm('forgetpass/step2',{},{
    autoLoading
})

// 验证手机号码 和 图片验证码
export const VERIFY_PHONE_CODE = postRootXForm('forgetpass/step1',{},{
    autoLoading
})


// 重置密码
export const RESET_PASSWORD = postRootXForm('forgetpass/step3',{},{
    autoLoading
})


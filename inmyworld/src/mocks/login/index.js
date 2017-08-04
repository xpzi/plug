
const LOGIN = {
  url: /\/user\/login/,
  type: 'post',
  template: {
    data: {
      phone: '13888769283',
      recharge: 166456.46,	//充值总金额，单位/元，精确到小数点后2位
      balance: 165.22,  	//余额，单位/元，如上
      freeze: 13.5,  //冻结金额，单位/元，如上
      realname: '酬瓷本chsiben',  //姓名
      email: '1564@qq.com',  //邮箱
    },
    code: 100,
    msg : "登录成功"
  }
}

const USER_INFO = {
  url: /\/cptuser\/info/,
  type: 'post',
  template: {
    data: {
      phone: '13888769283',
      recharge: 166456.46,	//充值总金额，单位/元，精确到小数点后2位
      balance: 165.22,  	//余额，单位/元，如上
      freeze: 13.5,  //冻结金额，单位/元，如上
      realname: '酬瓷本chsiben',  //姓名
      email: '1564@qq.com',  //邮箱
    },
    code: 100,
    msg: '获取成功'
  }
}

export default {
  // LOGIN,
  // USER_INFO
}
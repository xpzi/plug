import $common from 'utils/common'
import srcConfig from 'src/config'
import userStore from './store'
import S from 'service'

import * as types from './mutation-types'
import * as apis from './apis'

import store from 'utils/store.js';

S.$extend(apis)

const userInfoMock = {
  phone: '13888769283',
  // 充值总金额，单位/元，精确到小数点后2位
  recharge: 166456.46,
  // 余额，单位/元，如上
  balance: 165.22,
  // 冻结金额，单位/元，如上
  freeze: 13.5,
  // 姓名
  realname: '酬瓷本chsiben',  
  // 邮箱
  email: '1564@qq.com'
}

let userPromise = new Promise((resolve, reject) => {
  // let user_info = store.get('user');
  // if( user_info ){
  //     resolve( {data:user_info, code: 100});
  //     return;
  // }
  if ( srcConfig.IS_DEV && srcConfig.simulateLogin) {
    setTimeout(() => {
      resolve(userInfoMock)
    }, 200)
  } else {
    S.USER_INFO()
    .then((data) => {
      resolve( data)
    }, reject)
  }
})

const _setUserPromiseState = function ({ userInfo, isLogin }) {
  if (isLogin) {
    userPromise = new Promise(resolve => resolve(userInfo))
  } else {
    userPromise = new Promise((resolve, reject) => reject())
  }
}

export { userPromise, types as USER_MUTATION_TYPES, userStore, _setUserPromiseState }

export default {
  userPromise,

  USER_MUTATION_TYPES: types,

  userStore,

  _setUserPromiseState
}
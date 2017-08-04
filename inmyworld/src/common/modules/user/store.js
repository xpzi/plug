import * as types from './mutation-types'

const state = {
  MUTATION_TYPES: types,
  info: {
    // phone: '',
    // // 充值总金额，单位/元，精确到小数点后2位
    // recharge: 0,
    // // 余额，单位/元，如上
    // balance: 0,
    // // 冻结金额，单位/元，如上
    // freeze: 0,
    // // 姓名
    // realname: '',  
    // // 邮箱
    // email: ''
  },
  isLogin: false
}

const getters = {
  [types.USER_INFO] (state, getters, rootState) {
    return state.info
  },

  [types.USER_ISLOGIN] (state, getters, rootState) {
    return state.isLogin
  }
}

const actions = {
  [types.UPDATE_USER_INFO] ({ commit, state, rootState }, payload) {
    commit(types.UPDATE_USER_INFO, payload)
  }
}

const mutations = {
  [types.UPDATE_USER_INFO] (state, payload) {
    if (payload && typeof payload === 'object' && payload.phone) {
      state.info = payload
      state.isLogin = true
    } else {
      state.info = {}
      state.isLogin = false
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
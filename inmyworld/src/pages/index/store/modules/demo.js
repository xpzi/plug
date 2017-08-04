import * as types from '../mutation-types'

/**
 * 单一状态树, 用一个对象就包含了全部的应用层级状态。至此它便作为一个唯一数据源
 * @type {Object}
 */
const state = {
    MUTATION_TYPES:types,
    bannerData: null,
    currentStep: 0,
    loginJump: null,
}

/**
 * state 的计算属性
 * @type {Object}
 */
const getters = {
    bannerData : ( state) => {  return state.bannerData },
    currentStep: (state) => { return state.currentStep },
    loginJump: (state) => { return state.loginJump }
}

/**
 * 事件分发
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 接收与 store 实例具有相同方法和属性的 context 对象
 * @type {Object}
 */
const actions = {
    BANNER_DATA : ({commit, state}, payload) => {
        commit(types.BANNER_DATA, payload)
    },
    CURRENT_STRP: ({commit, state}, payload) => {
        commit(types.CURRENT_STRP, payload)
    },
    LOGIN_JUMP: ({commit, state}, payload) => {
        commit(types.LOGIN_JUMP, payload)
    }
}

/**
 * 类似事件
 * 每个 mutation 都有一个字符串事件类型 (type) 和 一个 回调函数 (handler), state是第一个参数
 * 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法
 * @type {Object}
 */
const mutations = {
    [types.BANNER_DATA](state, payload){
        state.bannerData = payload;
    },
    [types.CURRENT_STRP](state, payload){
        state.currentStep = payload;
    },
    [types.LOGIN_JUMP](state, payload){
        state.loginJump = payload;
    }
}

export default ({
  state,
  getters,
  actions,
  mutations
})
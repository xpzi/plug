import Vuex from 'vuex'
import Vue from 'vue'
import * as state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

import demo from './modules/demo'
import Order from './modules/order'
import Promote from './modules/promote'


// external 之后 不用use
// Vue.use(Vuex)

const NODE_ENV = process.env.NODE_ENV

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    demo,
    Order,
    Promote
  },
  strict: NODE_ENV !== 'production',
  plugins: NODE_ENV !== 'production' 
    ? []
    : []
})
import Vue from 'vue'
import Vuex from 'vuex'
var pkg = require('../package.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      pkg,
      userInfo: {},
      clintInfo: {}
    }
  },
  mutations: {
    SET_USER: (state, user) => { state.app.userInfo = user }
  },
  actions: {
    setUserInfo: ({ commit, state }, user) => { commit('SET_USER', user) }
  },
  getters: {
    UserInfo: state => state.app.userInfo
  }
})

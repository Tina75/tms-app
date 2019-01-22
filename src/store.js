import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/libs/server'
var pkg = require('../package.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      pkg,
      userInfo: {},
      clintInfo: {},
      userConfig: {}
    }
  },
  mutations: {
    SET_USER: (state, user) => { state.app.userInfo = user },
    SET_CONFIG: (state, config) => { state.app.userConfig = config }
  },
  actions: {
    setUserInfo: ({ commit, state }, user) => { commit('SET_USER', user) },
    setUserConfig: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        return server({
          method: 'GET',
          url: 'set/commonSettingInfo'
        }).then((response) => {
          commit('SET_CONFIG', response.data.data)
          resolve()
        })
      })
    }
  },
  getters: {
    UserInfo: state => state.app.userInfo,
    UserConfig: state => state.app.userConfig
  }
})

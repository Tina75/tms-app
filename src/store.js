import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo: {},
    // dictionary: [] // 字典
  },
  mutations: {
    // setUserInfo (state, payload) {
    //   state.userInfo = { ...payload }
    // }
  },
  actions: {
    // setUserInfo ({ commit }) {
    //   Server({
    //     url: '/seed/userInfo',
    //     method: 'get',
    //     mock: true
    //   }).then(({ code, data, msg }) => {
    //     commit('setUserInfo', data)
    //   })
    // }
  },
  getters: {
    // UserInfo: (state) => state.userInfo
  }
})

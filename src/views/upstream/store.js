import * as API from './libs/api'

export default {
  state: {
    // 全部
    allList: []
  },
  mutations: {
    GET_LIST(state, payload) {
      state.allList = payload.list
    }
  },
  actions: {
    getList: ({ commit }) => {
      API.initList().then((response) => {
        commit('GET_LIST', response.data.data)
      })
    }
  },
  getters: {
    allList (state) {
      return state.allList
    }
  }
}

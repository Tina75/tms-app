import * as API from './libs/api'

export default {
  state: {
    // 全部
    statusUpstreamCntObj: {
      waitAccept: 0,
      rejected: 0,
      accepted: 0
    }
  },
  mutations: {
    GET_STATUS_CNT(state, payload) {
      for (let i in state.statusUpstreamCntObj) {
        state.statusUpstreamCntObj[i] = payload[i]
      }
    }
  },
  actions: {
    getUpstreamStatusCnt: ({ commit }) => {
      API.getStatusCnt()
        .then((response) => {
          commit('GET_STATUS_CNT', response.data.data)
        })
    }
  },
  getters: {
    statusCnt (state) {
      return state.statusUpstreamCntObj
    }
  }
}

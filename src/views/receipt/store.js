import { getSatatusNum } from './libs/api'

export default {
  state: {
    statuNum: {
      waiting_sign: 0, // 待签收
      waiting_recovery: 0, // 待回收
      waiting_return_factory: 0, // 待返厂
      already_returned_factory: 0 // 已返厂
    }
  },
  mutations: {
    GET_STATUS_NUM (state, payload) {
      console.log(payload)
      // state.statuNum = payload
    }
  },
  actions: {
    getCnt ({ commit }) {
      getSatatusNum()
        .then(res => {
          commit('GET_STATUS_NUM')
        })
    }
  },
  getters: {
    statusNum: (state) => state.statuNum
  }
}

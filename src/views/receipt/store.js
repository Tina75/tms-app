import { getSatatusNum } from './libs/api'

export default {
  state: {
    receiptStatuNumObj: {
      total: 0,
      waiting_sign: 0, // 待签收
      waiting_recovery: 0, // 待回收
      waiting_return_factory: 0, // 待返厂
      already_returned_factory: 0 // 已返厂
    }
  },
  mutations: {
    GET_STATUS_NUM (state, payload) {
      for (let i in state.receiptStatuNumObj) {
        state.receiptStatuNumObj[i] = payload[i]
      }
    }
  },
  actions: {
    getReceiptStatusCnt ({ commit }) {
      getSatatusNum()
        .then(res => {
          commit('GET_STATUS_NUM', res.data.data)
        })
    }
  },
  getters: {
    receiptStatusCnt: (state) => state.receiptStatuNumObj
  }
}

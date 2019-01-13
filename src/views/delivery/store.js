import Server from '@/libs/server'
export default {
  state: {
    dispatch: {
      list: [],
      pageNo: 1,
      total: 1
    },
    // 待送货
    send: {
      list: [],
      pageNo: 1,
      total: 1
    },
    // 已发运，在途
    sending: {
      list: [],
      pageNo: 1,
      total: 1
    },
    // 已发运，在途
    arrival: {
      list: [],
      pageNo: 1,
      total: 1
    }
  },
  mutations: {
    DISPATCH (state, payload) {
      state.dispatch.pageNo = payload.pageNo
      state.dispatch.list = state.dispatch.list.concat(payload.list)
      state.dispatch.total = payload.total
    },
    DISPATCH_CLEAR (state) {
      state.dispatch = { list: [], pageNo: 1, total: 1 }
    },
    SEND (state, payload) {
      state.send.pageNo = payload.pageNo
      state.send.list = state.send.list.concat(payload.waybillList)
      state.send.total = payload.total
    },
    SEND_CLEAR (state) {
      state.send = { list: [], pageNo: 1, total: 1 }
    },
    SENDING (state, payload) {
      state.sending.pageNo = payload.pageNo
      state.sending.list = state.sending.list.concat(payload.waybillList)
      state.sending.total = payload.total
    },
    SENDING_CLEAR (state) {
      state.sending = { list: [], pageNo: 1, total: 1 }
    },
    ARRIVAL (state, payload) {
      state.arrival.pageNo = payload.pageNo
      state.arrival.list = state.arrival.list.concat(payload.waybillList)
      state.arrival.total = payload.total
    },
    ARRIVAL_CLEAR (state) {
      state.dispatch = { list: [], pageNo: 1, total: 1 }
    }
  },
  actions: {
    getDispatch: ({ commit, state }, payload) => {
      return Server({
        url: '/load/bill/wait/pick/list',
        method: 'post',
        data: {
          status: 20
        }
      }).then(({ data }) => {
        commit('DISPATCH', data.data)
      })
    },
    clearDispatch: ({ commit }) => { commit('DISPATCH_CLEAR') },
    // 运单状态 2 待发运、 3 在途、4 已到货 不传表示所有
    getSend: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 2 }
      }).then(({ data }) => {
        commit('SEND', data.data)
      })
    },
    clearSend: ({ commit }) => { commit('SEND_CLEAR') },
    getSending: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 3 }
      }).then(({ data }) => {
        commit('SENDING', data.data)
      })
    },
    clearSending: ({ commit }) => { commit('SENDING_CLEAR') },
    getArrival: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 4 }
      }).then(({ data }) => {
        commit('ARRIVAL', data.data)
      })
    },
    clearArrival: ({ commit }) => { commit('ARRIVAL_CLEAR') },
    // 发运
    doSetOff: ({ commit, state }, waybillIds = []) => {
      Server({
        url: '/waybill/shipment',
        method: 'post',
        data: { waybillIds }
      }).then(({ data }) => {
        window.toast('发运成功')
      })
    },
    // 到货
    doArrival: ({ commit, state }, waybillIds = []) => {
      Server({
        url: '/waybill/confirm/arrival',
        method: 'post',
        data: { waybillIds }
      }).then(({ data }) => {
        window.toast('到货成功')
      })
    }

  },
  getters: {
    DispatchList: (state) => state.dispatch.list,
    SendList: state => state.send.list,
    SendingList: state => state.sending.list,
    ArrivalList: state => state.arrival.list
  }
}

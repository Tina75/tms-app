import Server from '@/libs/server'
export default {
  namespaced: true,
  state: {
    dispatch: {
      list: [],
      pageNo: 1
    },
    // 待送货
    send: {
      list: [],
      pageNo: 1
    },
    // 已发运，在途
    sending: {
      list: [],
      pageNo: 1
    },
    // 已发运，在途
    arrival: {
      list: [],
      pageNo: 1
    },
    waybillDetail: {},
    tabCount: {}

  },
  mutations: {
    DISPATCH (state, payload) {
      state.dispatch.pageNo = ++payload.pageNo
      state.dispatch.list = state.dispatch.list.concat(payload.list)
    },
    DISPATCH_CLEAR (state) {
      state.dispatch = { list: [], pageNo: 1 }
    },
    SEND (state, payload) {
      state.send.pageNo = ++payload.pageNo
      state.send.list = state.send.list.concat(payload.waybillList)
    },
    SEND_CLEAR (state) {
      state.send = { list: [], pageNo: 1 }
    },
    SENDING (state, payload) {
      state.sending.pageNo = ++payload.pageNo
      state.sending.list = state.sending.list.concat(payload.waybillList)
    },
    SENDING_CLEAR (state) {
      state.sending = { list: [], pageNo: 1 }
    },
    ARRIVAL (state, payload) {
      state.arrival.pageNo = ++payload.pageNo
      state.arrival.list = state.arrival.list.concat(payload.waybillList)
    },
    ARRIVAL_CLEAR (state) {
      state.arrival = { list: [], pageNo: 1 }
    },
    WAYBILL_DETAIL (state, details) {
      state.waybillDetail = details
    },
    TAB_COUNT (state, payload) {
      state.tabCount = { ...payload }
    }
  },
  actions: {
    getDispatch: ({ commit, state }, payload) => {
      return Server({
        url: '/load/bill/wait/pick/list',
        method: 'post',
        data: {
          status: 20,
          pageNo: state.dispatch.pageNo,
          pageSize: 3
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
        data: { status: 2,
          pageNo: state.send.pageNo,
          pageSize: 3 }
      }).then(({ data }) => {
        commit('SEND', data.data)
      })
    },
    clearSend: ({ commit }) => { commit('SEND_CLEAR') },
    getSending: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 3,
          pageNo: state.sending.pageNo,
          pageSize: 3 }
      }).then(({ data }) => {
        commit('SENDING', data.data)
      })
    },
    clearSending: ({ commit }) => { commit('SENDING_CLEAR') },
    getArrival: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 4,
          pageNo: state.arrival.pageNo,
          pageSize: 3 }
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
    getTabCount: ({ commit, state }) => {
      Server('/waybill/tab/cnt').then(({ data }) => {
        commit('TAB_COUNT', data.data)
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
    },
    // 调度 or 创建运单
    dispatchOrder: ({ commit }, data) => {
      return Server({
        url: '/waybill/create',
        method: 'post',
        data
      }).then(({ data }) => {
        window.toast(data.msg)
      })
    },
    // 获取运单详情
    getWaybillDetail: ({ commit }, id) => {
      Server(
        { url: '/waybill/details',
          method: 'post',
          data: { waybillId: id } }
      ).then(({ data }) => {
        commit('WAYBILL_DETAIL', data.data)
      })
    }
  },
  getters: {
    DispatchList: (state) => state.dispatch.list,
    SendList: state => state.send.list,
    SendingList: state => state.sending.list,
    ArrivalList: state => state.arrival.list,
    WaybillDetail: state => state.waybillDetail,
    WaybillOrderList: state => state.waybillDetail.orderList,
    TabCount: state => ({
      dispatch: state.tabCount.waitDispatchCnt,
      send: state.tabCount.waitSendCarCnt,
      sending: state.tabCount.inTransportCnt,
      arrival: state.tabCount.arrivedCnt
    })
  }
}

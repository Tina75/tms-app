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
    tabCount: {},
    currentBillOrderIds: [],
    billOrderList: []
  },
  mutations: {
    DISPATCH (state, payload) {
      state.dispatch.pageNo = ++payload.pageNo
      state.dispatch.list = state.dispatch.list.concat(payload.list)
    },
    SET_DISPATCH_LIST(state, list) {
      state.dispatch.list = [...list]
    },
    DISPATCH_CLEAR (state) {
      state.dispatch = { list: [], pageNo: 1 }
    },
    SEND (state, payload) {
      state.send.pageNo = ++payload.pageNo
      state.send.list = state.send.list.concat(payload.waybillList)
    },
    SET_SEND_LIST(state, list) {
      state.send.list = [...list]
    },
    SEND_CLEAR (state) {
      state.send = { list: [], pageNo: 1 }
    },
    SENDING (state, payload) {
      state.sending.pageNo = ++payload.pageNo
      state.sending.list = state.sending.list.concat(payload.waybillList)
    },
    SET_SENDING_LIST(state, list) {
      state.sending.list = [...list]
    },
    SENDING_CLEAR (state) {
      state.sending = { list: [], pageNo: 1 }
    },
    ARRIVAL (state, payload) {
      state.arrival.pageNo = ++payload.pageNo
      state.arrival.list = state.arrival.list.concat(payload.waybillList)
    },
    SET_ARRIVAL_LIST(state, list) {
      state.arrival.list = [...list]
    },
    ARRIVAL_CLEAR (state) {
      state.arrival = { list: [], pageNo: 1 }
    },
    WAYBILL_DETAIL (state, details) {
      state.waybillDetail = details
      // state.waybillDetail = data.loadbill
      const noArray = [...(new Set(details.cargoList.map(item => item.orderNo)))]
      state.waybillDetail.cargoListSet = noArray.map(no => {
        return { orderNo: no, cargoList: details.cargoList.filter(item => item.orderNo === no) }
      })
    },
    CLEAR_WAYBILL_DETAIL(state) {
      state.waybillDetail = {}
    },
    TAB_COUNT (state, payload) {
      state.tabCount = { ...payload }
    },
    SET_BILL_ORDERS (state, data) {
      state.billOrderList = data
      state.currentBillOrderIds = data.map(item => item.id)
    },
    removeBillOrder (state, id) {
      state.currentBillOrderIds.splice(state.currentBillOrderIds.indexOf(id), 1)
    },
    addBillOrder (state, ids) {
      state.currentBillOrderIds.push(...ids)
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
          pageSize: 5
        }
      }).then(({ data }) => {
        commit('DISPATCH', data.data)
      })
    },
    clearDispatch: ({ commit }) => { commit('DISPATCH_CLEAR') },
    updateDispatch: ({ commit }, list) => { commit('SET_SEND_LIST', list) },
    // 运单状态 2 待发运、 3 在途、4 已到货 不传表示所有
    getSend: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 2,
          pageNo: state.send.pageNo,
          pageSize: 5 }
      }).then(({ data }) => {
        commit('SEND', data.data)
      })
    },
    clearSend: ({ commit }) => { commit('SEND_CLEAR') },
    updateSend: ({ commit }, list) => { commit('SET_SEND_LIST', list) },

    getSending: ({ commit, state }) => {
      return Server({
        url: '/waybill/list',
        method: 'post',
        data: { status: 3,
          pageNo: state.sending.pageNo,
          pageSize: 5 }
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
          pageSize: 5 }
      }).then(({ data }) => {
        commit('ARRIVAL', data.data)
      })
    },
    clearArrival: ({ commit }) => { commit('ARRIVAL_CLEAR') },
    // 编辑运单
    doEditWaybill: ({ commit, state }, info) => {
      return Server({
        url: '/waybill/update',
        method: 'post',
        data: { waybill: info }
      }).then(() => {
        // 刷新详情
        window.toast('编辑成功')
      })
    },
    // 派车
    doSendCar: ({ commit, state }, info) => {
      return Server({
        url: '/waybill/assign/vehicle',
        method: 'post',
        data: info
      }).then(() => {
        // 派车成功，刷新列表
        // let list = state.send.list.filter(item => info.id !== item.id)
        // commit('SET_SEND_LIST', list)
      })
    },
    // 发运
    doSetOff: ({ commit, state }, id) => {
      Server({
        url: '/waybill/shipment',
        method: 'post',
        data: { waybillIds: [id] }
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
    doArrival: ({ commit, state }, id) => {
      return Server({
        url: '/waybill/confirm/arrival',
        method: 'post',
        data: { waybillIds: [id] }
      }).then(({ data }) => {
        // window.toast('到货成功')
        // let list = state.arrival.list.filter(item => item.id !== id)
        // commit('SET_SENDING_LIST', list)
      })
    },
    // 调度 and 创建运单
    dispatchOrder: ({ commit, state }, data) => {
      // const ids = data.orderIds
      return Server({
        url: '/waybill/create',
        method: 'post',
        data
      }).then(({ data }) => {
        // let list = state.dispatch.list.filter(item => !(ids.includes(item.id)))
        // commit('SET_DISPATCH', list)
      })
    },
    // 获取运单详情
    getWaybillDetail: ({ commit }, id) => {
      return Server(
        { url: '/waybill/details',
          method: 'post',
          data: { waybillId: id } }
      ).then(({ data }) => {
        commit('WAYBILL_DETAIL', data.data)
        return data.data
      })
    },
    clearWaybillDetail: ({ commit }) => {
      commit('CLEAR_WAYBILL_DETAIL')
    },
    // 删除运单
    deleteBillById: ({ commit }, id) => {
      return Server({
        url: '/waybill/delete',
        method: 'post',
        data: { waybillIds: [id] }
      }).then(({ data }) => {
      })
    },
    // 获取运单中的订单列表
    getOrderListByWaybillId: ({ commit }, id) => {
      Server({
        url: '/waybill/get/order',
        method: 'get',
        data: { id }
      }).then(({ data }) => {
        commit('SET_BILL_ORDERS', data.data)
      })
    },
    removeBillOrder: ({ state, commit }, id) => {
      commit('removeBillOrder', id)
    },
    addBillOrder: ({ state, commit }, ids) => {
      commit('addBillOrder', ids)
    },
    updatetBillOrders: ({ state, commit }, id) => {
      return new Promise((resolve, reject) => {
        Server({
          method: 'post',
          url: '/waybill/update/order',
          data: {
            id: id,
            orderIds: state.currentBillOrderIds
          }
        }).then((response) => {
          resolve()
        })
      })
    }
  },
  getters: {
    DispatchList: (state) => state.dispatch.list,
    SendList: state => state.send.list,
    SendingList: state => state.sending.list,
    ArrivalList: state => state.arrival.list,
    WaybillDetail: state => state.waybillDetail || {},
    Waybill: state => state.waybillDetail.waybill || {},
    CargoList: state => state.waybillDetail.cargoList || [],
    CargoListSet: state => state.waybillDetail.cargoListSet || [],
    OrderList: state => state.waybillDetail.orderList,
    TabCount: state => ({
      dispatch: state.tabCount.waitDispatchCnt,
      send: state.tabCount.waitSendCarCnt,
      sending: state.tabCount.inTransportCnt,
      arrival: state.tabCount.arrivedCnt
    }),
    BillOrderList: state => state.billOrderList,
    CurrentBillOrderIds: state => state.currentBillOrderIds
  }
}

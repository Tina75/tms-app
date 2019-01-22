import Server from '@/libs/server'
export default {
  namespaced: true,
  state: {
    // 全部
    all: {
      list: [],
      pageNo: 1,
      total: 1
    },
    // 待提货
    pickup: {
      list: [],
      pageNo: 1,
      total: 1
    },
    // 待送货
    delivery: {
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
    // 已完成
    arrival: {
      list: [],
      pageNo: 1,
      total: 1
    },
    tabCount: {

    }

  },
  mutations: {
    ALL (state, payload) {
      state.all.pageNo = ++payload.pageNo
      state.all.list = state.all.list.concat(payload.list)
      state.all.total = payload.total
    },
    ALL_CLEAR (state) {
      state.all = { list: [], pageNo: 1, total: 1 }
    },
    PICKUP (state, payload) {
      state.pickup.pageNo = ++payload.pageNo
      state.pickup.list = state.pickup.list.concat(payload.list)
      state.pickup.total = payload.total
    },
    PICKUP_CLEAR (state) {
      state.pickup = { list: [], pageNo: 1, total: 1 }
    },
    DELIVERY (state, payload) {
      state.delivery.pageNo = ++payload.pageNo
      state.delivery.list = state.delivery.list.concat(payload.list)
      state.delivery.total = payload.total
    },
    DELIVERY_CLEAR (state) {
      state.delivery = { list: [], pageNo: 1, total: 1 }
    },
    SENDING (state, payload) {
      state.sending.pageNo = ++payload.pageNo
      state.sending.list = state.sending.list.concat(payload.list)
      state.sending.total = payload.total
    },
    SENDING_CLEAR (state) {
      state.sending = { list: [], pageNo: 1, total: 1 }
    },
    ARRIVAL (state, payload) {
      state.arrival.pageNo = ++payload.pageNo
      state.arrival.list = state.arrival.list.concat(payload.list)
      state.arrival.total = payload.total
    },
    ARRIVAL_CLEAR (state) {
      state.arrival = { list: [], pageNo: 1, total: 1 }
    },
    TAB_COUNT(state, payload) {
      state.tabCount = { ...payload }
    }
  },
  actions: {
    // 订单状态 10：待提货 20：待调度 30：在途 ；90完成（包括 40：已到货 50：已回单
    getAll: ({ commit, state }, payload) => {
      return Server({
        url: '/order/list',
        method: 'post',
        data: { pageNo: state.all.pageNo, pageSize: 5 }
      }).then(({ data }) => {
        commit('ALL', data.data)
      })
    },
    clearAll: ({ commit }) => { commit('ALL_CLEAR') },
    getPickup: ({ commit, state }) => {
      return Server({
        url: '/order/list',
        method: 'post',
        data: { status: 10, pageNo: state.pickup.pageNo, pageSize: 5 }
      }).then(({ data }) => {
        commit('PICKUP', data.data)
      })
    },
    clearPickup: ({ commit }) => { commit('PICKUP_CLEAR') },

    getDelivery: ({ commit, state }) => {
      return Server({
        url: '/order/list',
        method: 'post',
        data: { status: 20, pageNo: state.delivery.pageNo, pageSize: 5 }
      }).then(({ data }) => {
        commit('DELIVERY', data.data)
      })
    },
    clearDelivery: ({ commit }) => { commit('DELIVERY_CLEAR') },
    getSending: ({ commit, state }) => {
      return Server({
        url: '/order/list',
        method: 'post',
        data: { status: 30, pageNo: state.sending.pageNo, pageSize: 5 }
      }).then(({ data }) => {
        commit('SENDING', data.data)
      })
    },
    clearSending: ({ commit }) => { commit('SENDING_CLEAR') },
    getArrival: ({ commit, state }) => {
      return Server({
        url: '/order/list',
        method: 'post',
        data: { status: 90, pageNo: state.arrival.pageNo, pageSize: 5 }
      }).then(({ data }) => {
        commit('ARRIVAL', data.data)
      })
    },
    clearArrival: ({ commit }) => { commit('ARRIVAL_CLEAR') },
    // 删除待调度订单
    deleteOrder: ({ commit, state }, id) => {
      Server({
        url: '/order/delete',
        method: 'post',
        data: { orderIds: [id] }
      }).then(({ data }) => {
        window.toast('删除成功')
        // TODO: update list
      })
    },
    getTabCount: ({ commit, state }) => {
      Server({
        url: '/order/getAppOrderNumByStatus'
      }).then(({ data }) => {
        commit('TAB_COUNT', data.data)
      })
    }
    // // 发运
    // doSetOff: ({ commit, state }, waybillIds = []) => {
    //   Server({
    //     url: '/waybill/shipment',
    //     method: 'post',
    //     data: { waybillIds }
    //   }).then(({ data }) => {
    //     window.toast('发运成功')
    //   })
    // },
    // // 到货
    // doArrival: ({ commit, state }, waybillIds = []) => {
    //   Server({
    //     url: '/waybill/confirm/arrival',
    //     method: 'post',
    //     data: { waybillIds }
    //   }).then(({ data }) => {
    //     window.toast('到货成功')
    //   })
    // },
    // // 调度 or 创建运单
    // dispatchOrder: ({ commit }, data) => {
    //   return Server({
    //     url: '/waybill/create',
    //     method: 'post',
    //     data
    //   }).then(({ data }) => {
    //     window.toast(data.msg)
    //   })
    // },
    // // 获取运单详情
    // getWaybillDetail: ({ commit }, id) => {
    //   Server(
    //     { url: '/waybill/details',
    //       method: 'post',
    //       data: { waybillId: id } }
    //   ).then(({ data }) => {
    //     commit('WAYBILL_DETAIL', data.data)
    //   })
    // }
  },
  getters: {
    AllList: state => state.all.list,
    PickupList: state => state.pickup.list,
    DeliveryList: (state) => state.delivery.list,
    SendingList: state => state.sending.list,
    ArrivalList: state => state.arrival.list,
    TabCount: state => {
      return {
        all: '',
        pickup: state.tabCount.pickup,
        delivery: state.tabCount.dispatch,
        sending: state.tabCount.transit,
        arrival: state.tabCount.arrive + state.tabCount.receipt
      }
    }
  }
}

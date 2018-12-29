import Server from '@/libs/Server'
import bridge from '@/libs/dsbridge'

export default{
  state: {
    waybillCargos: [],
    loadbillCargos: [],
    waybillDetail: null,
    loadbillDetail: null
  },
  mutations: {
    setWaybillCargos (state, payload) {
      // state.waybillCargos = payload.concat([...state.waybillCargos])
      state.waybillCargos = [...payload]
    },
    clearWaybillCargos (state) {
      state.waybillCargos = []
    },
    setLoadbillCargos (state, payload) {
      // state.loadbillCargos = payload.concat([...state.loadbillCargos])
      state.loadbillCargos = [...payload]
    },
    clearLoadbillCargos (state) {
      state.loadbillCargos = []
    },
    setWaybillDetail (state, payload) { state.waybillDetail = payload },
    clearWaybillDetail (state) { state.waybillDetail = null },
    setLoadbillDetail (state, payload) { state.loadbillDetail = payload },
    clearLoadbillDetail (state) { state.loadbillDetail = null }
  },
  actions: {
    // 运单货物
    getWaybillCargos: ({ commit }, billId) => {
      Server({
        url: `/driver/waybill/cargoOrder/list?waybillId=${billId}`,
        loading: false
      }).then(({ data }) => {
        commit('setWaybillCargos', data.cargoOrderList)
      })
    },
    clearWaybillCargos: ({ commit }) => {
      commit('clearWaybillCargos')
    },
    // 提货单
    getLoadbillCargos: ({ commit }, billId) => {
      Server({
        url: `/driver/loadbill/cargoOrder/list?loadbillId=${billId}`,
        loading: false
      }).then(({ data }) => {
        commit('setLoadbillCargos', data.cargoOrderList)
      })
    },
    clearLoadbillCargos: ({ commit }) => {
      commit('clearLoadbillCargos')
    },
    // 运单详情
    getWaybillDetail: async ({ commit }, waybillId) => {
      const { data } = await Server({
        url: '/driver/waybill/detail',
        method: 'get',
        loading: true,
        data: { waybillId }
      })
      commit('setWaybillDetail', data)
    },
    clearWaybillDetail: ({ commit }) => { commit('clearWaybillDetail') },
    // 提货单详情
    getLoadbillDetail: async ({ commit }, loadbillId) => {
      const { data } = await Server({
        url: '/driver/loadbill/detail',
        method: 'get',
        loading: true,
        data: { loadbillId }
      })
      commit('setLoadbillDetail', data)
    },
    clearLoadbillDetail: ({ commit }) => { commit('clearWaybillDetail') },
    // 货物信息
    getCargoDetail: async (state, orderId) => {
      const { data } = await Server({
        url: '/driver/waybill/cargo/detail',
        method: 'get',
        loading: true,
        data: { orderId }
      })
      return data
    },
    // 修改状态
    changeBillStatus: async (state, data) => {
      await Server({
        url: '/driver/mybill/changeStatus',
        method: 'post',
        loading: true,
        data
      })
    },
    // 定位信息
    postLocation: () => {
      return new Promise((resolve, reject) => {
        const userInfo = bridge.call('user.getUserInfo')
        const clientInfo = bridge.call('user.getClientInfo')

        const phone = Number(userInfo.code) === 10000 ? userInfo.data.userInfo.phone : void 0
        const deviceId = Number(clientInfo.code) === 10000 ? clientInfo.data.ClientInfo.split('/')[0] : void 0

        bridge.call('user.getLocationInfoAsync', {}, async locate => {
          if (Number(locate.code) !== 10000) resolve()
          const { lat, lon } = locate.data
          console.log(phone, deviceId, lat, lon)
          await Server({
            url: '/location/upload',
            method: 'post',
            data: {
              deviceId,
              phone,
              lon,
              lat
            }
          })
          resolve()
        })
      })
    }
  },
  getters: {
    WaybillCargos: state => state.waybillCargos,
    LoadbillCargos: state => state.loadbillCargos,
    WaybillDetail: state => state.waybillDetail,
    LoadbillDetail: state => state.loadbillDetail
  }
}

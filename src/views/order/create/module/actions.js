import Server from '@/libs/server'
import NP from 'number-precision'

export default {
  getOpetator: async () => {
    const { data } = await Server({
      url: '/permission/buttOperator',
      method: 'get'
    })
    return data.data
  },

  getOftenAddress: async (state, consignerId) => {
    const { data } = await Server({
      url: '/consigner/address/list',
      method: 'get',
      data: {
        consignerId,
        pageNo: 1,
        pageSize: 10000
      }
    })
    return data.data.list
  },

  getRuleList: async (state, data) => {
    const res = await Server({
      url: '/finance/charge/getRulesByPartner',
      method: 'get',
      data
    })
    return res.data.data
  },

  calculateAmount: async ({ commit }, data) => {
    const res = await Server({
      url: '/finance/charge/calcWithInfo',
      method: 'post',
      data
    })
    commit('SET_CALCULATE_AMOUNT', NP.divide(res.data.data.amount, 100))
  },

  getOftenCargo: async (state, consignerId) => {
    const { data } = await Server({
      url: '/consigner/cargo/list',
      method: 'get',
      data: {
        consignerId,
        pageNo: 1,
        pageSize: 10000
      }
    })
    return data.data.list
  },

  createOrder: async (state, data) => {
    await Server({
      url: '/order/create',
      method: 'post',
      data
    })
  },

  updateOrder: async (state, data) => {
    await Server({
      url: '/order/update',
      method: 'post',
      data
    })
  },

  fetchOrderInfo: async (state, id) => {
    const { data } = await Server({
      url: '/order/detail',
      method: 'get',
      data: { id }
    })
    return data.data
  },

  fetchOrderConfig: async ({ commit }) => {
    const { data } = await Server({
      url: '/set/commonSettingInfo',
      method: 'get'
    })
    if (data.data && data.data.tmsSetConfigDto) {
      for (let key in data.data.tmsSetConfigDto) {
        if (data.data.tmsSetConfigDto[key] === 2) data.data.tmsSetConfigDto[key] = 0
      }
      commit('SET_ORDER_CONFIG', data.data.tmsSetConfigDto)
    }
  }
}

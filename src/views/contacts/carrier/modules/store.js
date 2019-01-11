import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  /* 承运商列表 */
  carrier: {
    list: [],
    total: 0,
    pageNo: 1
  },

  /* 承运商详情 */
  carrierDetail: {},

  /* 新增承运商入参 */
  carrierParams: {
    carrierName: '',
    carrierPrincipal: '',
    carrierPhone: '',
    payType: '',
    remark: ''
  }
}

const mutations = {
  [types.CARRIER] (state, data) {
    state.carrier.list = data.carrierList || []
    state.carrier.total = data.total || 0
    state.carrier.pageNo = data.pageNo || 1
  },

  [types.CLEAR_CARRIER] (state) {
    state.carrier = { list: [], total: 0, pageNo: 1 }
  },

  [types.CARRIER_DETAIL] (state, data) {
    state.carrierDetail = data.carrierInfo || {}
  },

  [types.CLEAR_CARRIER_DETAIL] (state) {
    state.carrierDetail = {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

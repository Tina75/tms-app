import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import mock from '../pages/mock.json'

const state = {
  consigneeList: [], // 收货方列表
  consigneeDetail: mock.detail, // 收货方详情
  consignerList: [] // 发货人列表
}
const mutations = {
  [types.GET_CONSIGNEE_LIST] (state, payload = []) {
    state.consigneeList = payload
  },
  [types.GET_CONSIGNEE_DETAIL] (state, payload = {}) {
    state.consigneeDetail = payload
  },
  [types.GET_CONSIGNER_LIST] (state, payload = []) {
    state.consignerList = payload
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}

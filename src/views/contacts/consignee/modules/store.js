import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  consigneeList: [], // 收货方列表
  consigneeDetail: {}, // 收货方详情
  consignerList: [], // 发货人列表
  saveConsigner: {}, // 存储所属发货方
  formList: {
    consigner: '',
    contact: '',
    phone: '',
    address: '',
    detailAddress: '',
    consigneeCompanyName: '',
    remark: ''
  } // 表单数据
}
const mutations = {
  [types.GET_CONSIGNEE_LIST] (state, payload = []) {
    state.consigneeList = [
      {
        name: 'A',
        items: payload.list
      }
    ]
  },
  [types.GET_CONSIGNEE_DETAIL] (state, payload = {}) {
    state.consigneeDetail = payload
  },
  [types.GET_CONSIGNER_LIST] (state, payload = []) {
    state.consignerList = payload
  },
  [types.SAVE_CONSIGNER] (state, payload = {}) {
    state.saveConsigner = payload
  },
  [types.CLEAR_FORMLIST] (state) {
    state.formList = {
      consigner: '',
      contact: '',
      phone: '',
      address: '',
      detailAddress: '',
      consigneeCompanyName: '',
      remark: ''
    }
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}

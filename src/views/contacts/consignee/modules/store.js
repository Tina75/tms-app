import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import mock from '../pages/mock.json'

const state = {
  consigneeList: mock.list, // 收货方列表
  consigneeDetail: mock.detail, // 收货方详情
  consignerList: mock.sender, // 发货人列表
  saveConsigner: {
    contact: '',
    phone: '',
    company: '',
    id: '',
    payType: '',
    createTime: '',
    remark: ''
  }, // 存储所属发货方
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
    state.consigneeList = payload
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

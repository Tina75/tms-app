import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  // 订单信息
  orderInfo: {
    consignerCompany: '',
    consignerName: '',
    consignerPhone: '',
    consignerCity: '',
    consignerAddress: '',
    consumerInfo: '',

    consigneeName: '',
    consigneePhone: '',
    consigneeCity: '',
    consigneeAddress: '',
    consigneeCompany: '',

    cargoInfo: '',

    settlementType: '',
    pickupType: '',
    receiptNumber: 1,

    distance: '',
    transportFee: '',

    otherFee: '',
    otherInfo: ''
  },
  // 货物信息
  cargoInfo: {},
  // 客户单号及其他信息
  consumerInfo: {},
  // 费用信息
  feeInfo: {},
  // 其他信息
  otherInfo: {},
  // 常发货物
  cargoOften: null
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

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
    extraData: '',

    consigneeName: '',
    consigneePhone: '',
    consigneeCity: '',
    consigneeAddress: '',

    cargoInfo: '',

    settlementType: '',
    pickupType: '',
    receiptNumber: '',

    distance: '',
    transportFee: '',

    extraFee: '',
    extraInfo: ''
  },
  // 货物信息
  cargoInfo: {},
  // 客户单号及其他信息
  customInfo: {},
  // 费用信息
  feeInfo: {},
  // 其他信息
  otherInfo: {}
}

export default {
  state,
  getters,
  mutations,
  actions
}

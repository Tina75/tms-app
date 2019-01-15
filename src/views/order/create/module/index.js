import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  // 订单信息
  orderInfo: {
    consignerName: '', //
    consignerContact: '', //
    consignerPhone: '', //
    start: '', //
    consignerAddress: '', //
    consumerInfo: '',

    consigneeContact: '', //
    consigneePhone: '', //
    end: '', //
    consigneeAddress: '', //
    consigneeCompanyName: '', //

    cargoInfo: '',

    settlementType: '', //
    pickup: '', //
    receiptCount: 1, //

    mileage: '', //
    freightFee: '', //

    otherFee: '',
    otherInfo: '',

    isSaveOrderTemplate: 0 //
  },
  // 货物信息
  orderCargoList: {},
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

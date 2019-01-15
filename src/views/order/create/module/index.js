import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  // 订单信息
  orderInfo: {
    consignerName: '',
    consignerContact: '',
    consignerPhone: '',
    start: '',
    consignerAddressText: '',
    consignerAddress: '',
    consignerHourseNumber: '',
    consignerAddressLongitude: '39.9110666857',
    consignerAddressLatitude: '116.4136103013',
    consumerInfo: '',

    consigneeContact: '',
    consigneePhone: '',
    end: '',
    consigneeAddressText: '',
    consigneeAddress: '',
    consigneeHourseNumber: '',
    consigneeAddressLongitude: '32.0647517242',
    consigneeAddressLatitude: '118.8029140176',
    consigneeCompanyName: '',

    orderCargoList: '',

    settlementType: '',
    pickup: '',
    receiptCount: 1,

    mileage: '',
    freightFee: '',

    otherFee: '',
    otherInfo: '',

    isSaveOrderTemplate: 0,
    consignerAddressMapType: 1,
    consigneeAddressMapType: 1
  },
  // 货物信息
  orderCargoList: [],
  // 客户单号及其他信息
  consumerInfo: {},
  // 费用信息
  feeInfo: {},
  // 其他信息
  otherInfo: {},
  // 常发货物
  cargoOften: null,
  // 当前编辑的地址类型
  currentArrdessType: ''
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

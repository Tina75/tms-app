import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  orderConfig: {},
  orderNeedReset: false,
  // 订单信息
  orderInfo: {
    consignerName: '',
    consignerContact: '',
    consignerPhone: '',
    start: '',
    consignerAddress: '',
    consignerAddressText: '', //
    consignerAddressLocale: [], //
    consignerHourseNumber: '',
    consignerAddressLongitude: '',
    consignerAddressLatitude: '',
    consumerInfo: '', //

    consigneeContact: '',
    consigneePhone: '',
    end: '',
    consigneeAddress: '',
    consigneeAddressText: '', //
    consigneeAddressLocale: [], //
    consigneeHourseNumber: '',
    consigneeAddressLongitude: '',
    consigneeAddressLatitude: '',
    consigneeCompanyName: '',

    orderCargoList: '',

    settlementType: '',
    pickup: '',
    receiptCount: 1,

    mileage: '',
    freightFee: '', // --

    otherFee: '', //
    otherInfo: '', //

    isSaveOrderTemplate: 0,
    consignerAddressMapType: 1,
    consigneeAddressMapType: 1
  },
  // 发货方id
  consignerId: void 0,
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
  currentArrdessType: '',
  // 地址是否改变
  addressChanged: false,
  // 选择的收货人信息
  consigneeInfo: null,
  // 计费规则计算金额
  calculatedAmount: null
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

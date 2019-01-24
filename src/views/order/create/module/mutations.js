import NP from 'number-precision'
import { addressConcat } from '../../js/filters'

export default {
  // 设置开单配置
  SET_ORDER_CONFIG: (state, payload) => { state.orderConfig = payload },
  SET_OFTEN_PERMISSION: (state, payload) => { state.oftenPermission = payload },
  // 设置是否需要重置订单信息
  SET_ORDER_RESET: (state, payload) => { state.orderNeedReset = payload },
  // 设置订单信息
  SET_ORDER_INFO: (state, payload) => {
    resetFields(payload)
    for (let key in state.orderInfo) {
      state.orderInfo[key] = payload[key]
    }
  },
  // 设置再来一单id
  SET_ONE_MORE_ID: (state, payload) => { state.oneMoreId = payload },
  // 重置订单
  RESET_ORDER: state => {
    const temp = {
      consignerName: '',
      consignerContact: '',
      consignerPhone: '',
      start: '',
      startCityName: '',
      consignerAddress: '',
      consignerAddressText: '',
      consignerAddressLocale: [],
      consignerHourseNumber: '',
      consignerAddressLongitude: '',
      consignerAddressLatitude: '',
      consumerInfo: '',
      consigneeContact: '',
      consigneePhone: '',
      end: '',
      endCityName: '',
      consigneeAddress: '',
      consigneeAddressText: '',
      consigneeAddressLocale: [],
      consigneeHourseNumber: '',
      consigneeAddressLongitude: '',
      consigneeAddressLatitude: '',
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
    }
    for (let key in state.orderInfo) {
      state.orderInfo[key] = temp[key]
    }
    state.consignerId = void 0
    state.orderCargoList = []
    state.consumerInfo = {}
    state.feeInfo = {}
    state.otherInfo = {}
    state.cargoOften = state.consigneeInfo = state.calculatedAmount = null
    state.currentArrdessType = ''
    state.addressChanged = false
    state.orderNeedReset = false
  },
  // 设置发货人id
  SET_CONSIGNER_ID: (state, payload) => { state.consignerId = payload },
  // 设置常发订单
  SET_OFTEN_ORDER: (state, payload) => {
    state.orderInfo.isSaveOrderTemplate = Number(payload)
  },
  // 设置费用信息
  SET_FEE_INFO: (state, payload) => {
    resetFields(payload)
    state.feeInfo = payload
    const fees = [ payload.pickupFee, payload.loadFee, payload.unloadFee, payload.insuranceFee, payload.otherFee ]
    const totalFee = fees.reduce((last, fee) => {
      if (fee === '') return last
      return NP.plus(last || 0, fee || 0)
    }, '')
    state.orderInfo.otherFee = totalFee === '' ? '' : NP.divide(totalFee, 100)
  },
  // 设置其他信息
  SET_OTHER_INFO: (state, payload) => {
    resetFields(payload)
    state.otherInfo = Object.assign(state.otherInfo, payload)
  },
  // 设置客户订单号等信息
  SET_CONSUMER_INFO: (state, payload) => {
    resetFields(payload)
    state.consumerInfo = Object.assign(state.consumerInfo, payload)
  },
  // 设置常发货物
  SET_CARGO_OFTEN: (state, payload) => {
    resetFields(payload)
    state.cargoOften = payload
  },
  // 清空常发货物
  CLEAR_CARGO_OFTEN: (state, payload) => { state.cargoOften = null },
  // 设置货物信息
  SET_CARGO_LIST: (state, payload) => {
    payload.forEach(item => { resetFields(item) })
    state.orderCargoList = payload
  },
  // 设置当前编辑地址类型
  SET_ADDRESS_TYPE: (state, payload) => {
    resetFields(payload)
    state.currentArrdessType = payload
  },
  // 设置已经选择的地址信息
  SET_ADDRESS_INFO: (state, payload) => {
    if (!state.currentArrdessType) return
    resetFields(payload)
    const info = state.orderInfo
    console.log(payload)
    if (state.currentArrdessType === 'send') {
      info.start = payload.cityCode
      info.startCityName = payload.cityName
      info.consignerAddress = payload.address
      info.consignerHourseNumber = payload.extra
      info.consignerAddressLongitude = payload.longitude
      info.consignerAddressLatitude = payload.latitude
      info.consignerAddressLocale = payload.locale
      info.consignerAddressText = addressConcat(payload.address, payload.cityName, payload.extra)
      console.log(info, payload)
    } else {
      info.end = payload.cityCode
      info.endCityName = payload.cityName
      info.consigneeAddress = payload.address
      info.consigneeHourseNumber = payload.extra
      info.consigneeAddressLongitude = payload.longitude
      info.consigneeAddressLatitude = payload.latitude
      info.consigneeAddressLocale = payload.locale
      info.consigneeAddressText = addressConcat(payload.address, payload.cityName, payload.extra)
    }
    state.currentArrdessType = ''
    state.addressChanged = true
  },
  TRIGGER_ADDRESS_CHANGE: (state, payload) => { state.addressChanged = payload },
  // 设置选择的收货人信息
  SET_CONSIGNEE_INFO: (state, payload) => {
    resetFields(payload)
    state.consigneeInfo = payload
  },
  // 设置计费规矩金额
  SET_CALCULATE_AMOUNT: (state, payload) => { state.calculatedAmount = payload },
  // 清空计费规则计算金额结果
  CLEAR_CALCULATED_AMOUNT: state => { state.calculatedAmount = void 0 }
}

function resetFields (object) {
  for (let key in object) {
    if (object[key] === undefined || object[key] === null) object[key] = ''
  }
}

import NP from 'number-precision'

export default {
  // 清除订单信息
  CLEAR_ORDER_INFO: state => {
    for (let key in state.orderInfo) {
      state.orderInfo[key] = ''
    }
  },
  // 设置订单信息
  SET_ORDER_INFO: (state, payload) => {
    for (let key in state.orderInfo) {
      state.orderInfo[key] = payload[key]
    }
  },
  // 设置常发订单
  SET_OFTEN_ORDER: (state, payload) => {
    state.orderInfo.isSaveOrderTemplate = Number(payload)
  },
  // 设置费用信息
  SET_FEE_INFO: (state, payload) => {
    state.feeInfo = payload
    const fees = [ payload.pickupFee, payload.loadFee, payload.unloadFee, payload.insuranceFee, payload.otherFee ]
    const totalFee = fees.reduce((last, fee) => {
      if (last === fee) return last
      return NP.plus(last || 0, fee || 0)
    }, '')
    state.orderInfo.otherFee = totalFee === '' ? '' : NP.divide(totalFee, 100)
  },
  // 设置其他信息
  SET_OTHER_INFO: (state, payload) => { state.otherInfo = Object.assign(state.otherInfo, payload) },
  // 设置客户订单号等信息
  SET_CONSUMER_INFO: (state, payload) => { state.consumerInfo = Object.assign(state.consumerInfo, payload) },
  // 设置常发货物
  SET_CARGO_OFTEN: (state, payload) => { state.cargoOften = payload },
  // 清空常发货物
  CLEAR_CARGO_OFTEN: (state, payload) => { state.cargoOften = null },
  // 设置货物信息
  SET_CARGO_LIST: (state, payload) => { state.orderCargoList = payload },
  // 设置当前编辑地址类型
  SET_ADDRESS_TYPE: (state, payload) => { state.currentArrdessType = payload },
  // 设置已经选择的地址信息
  SET_ADDRESS_INFO: (state, payload) => {
    if (!state.currentArrdessType) return
    const info = state.orderInfo
    if (state.currentArrdessType === 'send') {
      info.start = payload.cityCode
      info.consignerAddress = payload.address
      info.consignerHourseNumber = payload.extra
      info.consignerAddressLongitude = payload.longitude
      info.consignerAddressLatitude = payload.latitude
      info.consignerAddressLocale = payload.locale
      info.consignerAddressText = payload.address + payload.extra
    } else {
      info.end = payload.cityCode
      info.consigneeAddress = payload.address
      info.consigneeHourseNumber = payload.extra
      info.consigneeAddressLongitude = payload.longitude
      info.consigneeAddressLatitude = payload.latitude
      info.consigneeAddressLocale = payload.locale
      info.consigneeAddressText = payload.address + payload.extra
    }
    state.currentArrdessType = ''
    state.addressChanged = true
  },
  TRIGGER_ADDRESS_CHANGE: (state, payload) => { state.addressChanged = payload },
  // 设置选择的收货人信息
  SET_CONSIGNEE_INFO: (state, payload) => { state.consigneeInfo = payload },
  // 设置计费规矩金额
  SET_CALCULATE_AMOUNT: (state, payload) => { state.calculatedAmount = payload },
  // 清空计费规则计算金额结果
  CLEAR_CALCULATED_AMOUNT: state => { state.calculatedAmount = void 0 }
}

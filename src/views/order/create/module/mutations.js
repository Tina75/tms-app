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
  // 设置费用信息
  SET_FEE_INFO: (state, payload) => {
    state.feeInfo = payload
    state.orderInfo.otherFee = NP.plus(
      payload.pickupFee || 0,
      payload.loadFee || 0,
      payload.unloadFee || 0,
      payload.insuranceFee || 0,
      payload.otherFee || 0
    )
  },
  // 设置其他信息
  SET_OTHER_INFO: (state, payload) => { state.otherInfo = payload },
  // 设置客户订单号等信息
  SET_CONSUMER_INFO: (state, payload) => { state.consumerInfo = payload },
  // 设置常发货物
  SET_CARGO_OFTEN: (state, payload) => { state.cargoOften = payload },
  // 清空常发货物
  CLEAR_CARGO_OFTEN: (state, payload) => { state.cargoOften = null },
  // 设置货物信息
  SET_CARGO_LIST: (state, payload) => { state.orderCargoList = payload }
}

import NP from 'number-precision'

export default {
  CLEAR_ORDER_INFO: state => {
    for (let key in state.orderInfo) {
      state.orderInfo[key] = ''
    }
  },
  SET_ORDER_INFO: (state, payload) => {
    for (let key in state.orderInfo) {
      state.orderInfo[key] = payload[key]
    }
  },
  SET_FEE_INFO: (state, payload) => {
    state.feeInfo = payload
    state.orderInfo.otherFee = NP.plus(
      payload.pickupFee || 0,
      payload.uploadFee || 0,
      payload.unloadFee || 0,
      payload.ensuranceFee || 0,
      payload.otherFee || 0
    )
  },
  SET_OTHER_INFO: (state, payload) => { state.otherInfo = payload },
  SET_CONSUMER_INFO: (state, payload) => { state.consumerInfo = payload }
}

export default {
  CLEAR_ORDER_INFO: ({ orderInfo }) => {
    for (let key in orderInfo) {
      orderInfo[key] = ''
    }
  },
  SET_ORDER_INFO: ({ orderInfo }, payload) => {
    for (let key in orderInfo) {
      orderInfo[key] = payload[key]
    }
  },
  SET_FEE_INFO: ({ feeInfo }, payload) => { feeInfo = payload }
}

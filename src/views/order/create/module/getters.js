export default {
  orderInfo: state => state.orderInfo,
  feeInfo: state => state.feeInfo,
  otherInfo: state => state.otherInfo,
  consumerInfo: state => state.consumerInfo,
  transportFee: state => state.orderInfo.transportFee || 0,
  cargoOften: state => state.cargoOften,
  orderCargoList: state => state.orderCargoList
}

export default {
  orderInfo: state => state.orderInfo,
  orderOften: state => !!state.orderInfo.isSaveOrderTemplate,
  feeInfo: state => state.feeInfo,
  otherInfo: state => state.otherInfo,
  consumerInfo: state => state.consumerInfo,
  freightFee: state => state.orderInfo.freightFee || 0,
  cargoOften: state => state.cargoOften,
  orderCargoList: state => state.orderCargoList,
  currentArrdessType: state => state.currentArrdessType
}

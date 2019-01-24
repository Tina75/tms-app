export default {
  orderConfig: state => state.orderConfig,
  oftenPermission: state => state.oftenPermission,
  orderNeedReset: state => state.orderNeedReset,
  oneMoreId: state => state.oneMoreId,
  orderInfo: state => state.orderInfo,
  consignerId: state => state.consignerId,
  orderOften: state => !!state.orderInfo.isSaveOrderTemplate,
  feeInfo: state => state.feeInfo,
  otherInfo: state => state.otherInfo,
  consumerInfo: state => state.consumerInfo,
  freightFee: state => state.orderInfo.freightFee || 0,
  cargoOften: state => state.cargoOften,
  orderCargoList: state => state.orderCargoList,
  currentArrdessType: state => state.currentArrdessType,
  addressChanged: state => state.addressChanged,
  consigneeInfo: state => state.consigneeInfo,
  calculatedAmount: state => state.calculatedAmount
}

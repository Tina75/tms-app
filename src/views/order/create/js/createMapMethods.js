import { mapMutations, mapActions } from 'vuex'

export default {
  ...mapMutations('order/create', [
    'SET_CONSIGNER_ID',
    'SET_ORDER_INFO',
    'SET_CONSIGNER_ID',
    'SET_CONSIGNEE_INFO',
    'SET_CONSUMER_INFO',
    'SET_CARGO_LIST', //
    'SET_FEE_INFO', //
    'SET_OTHER_INFO', //
    'SET_ADDRESS_TYPE',
    'TRIGGER_ADDRESS_CHANGE',
    'CLEAR_CALCULATED_AMOUNT',
    'SET_ORDER_RESET'
  ]),
  ...mapActions('order/create', [
    'getOpetator',
    'getConsignerData',
    'createOrder',
    'updateOrder',
    'fetchOrderInfo',
    'fetchOrderConfig',
    'checkDirectShipRights',
    'getOftenPermission'
  ]),
  ...mapActions('order/often', [
    'getOftenDetail'
  ])
}

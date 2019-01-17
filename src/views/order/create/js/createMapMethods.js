import { mapMutations, mapActions } from 'vuex'

export default {
  ...mapMutations('order/create', [
    'SET_ORDER_INFO',
    'SET_CONSUMER_INFO',
    'SET_CARGO_LIST', //
    'SET_FEE_INFO', //
    'SET_OTHER_INFO', //
    'SET_ADDRESS_TYPE',
    'SET_CONSIGNEE_INFO',
    'TRIGGER_ADDRESS_CHANGE',
    'CLEAR_CALCULATED_AMOUNT'
  ]),
  ...mapActions('order/create', [
    'getOpetator',
    'createOrder',
    'updateOrder',
    'fetchOrderInfo'
  ]),
  ...mapActions('order/often', [
    'getOftenDetail'
  ])
}

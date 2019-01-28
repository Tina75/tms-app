import { mapMutations, mapActions } from 'vuex'
import { MODULE_NAME } from '../../js/constant'

const {
  ORDER_CREATE,
  ORDER_OFTEN,
  CONTACTS_CONSIGNEE
} = MODULE_NAME

export default {
  ...mapMutations(ORDER_CREATE, [
    'SET_CONSIGNER_ID',
    'SET_ORDER_INFO',
    'SET_CONSIGNER_ID',
    'SET_CONSIGNEE_INFO',
    'SET_CONSUMER_INFO',
    'SET_CARGO_LIST',
    'SET_FEE_INFO',
    'SET_OTHER_INFO',
    'SET_ADDRESS_TYPE',
    'TRIGGER_ADDRESS_CHANGE',
    'CLEAR_CALCULATED_AMOUNT',
    'SET_ORDER_RESET',
    'RESET_ORDER',
    'SET_ONE_MORE_ID'
  ]),
  ...mapActions(CONTACTS_CONSIGNEE, [ 'saveConsignerInfo' ]),
  ...mapActions(ORDER_CREATE, [
    'getOpetator',
    'getConsignerData',
    'createOrder',
    'updateOrder',
    'fetchOrderInfo',
    'fetchOrderConfig',
    'checkDirectShipRights',
    'getOftenPermission',
    'getRuleList'
  ]),
  ...mapActions(ORDER_OFTEN, [
    'getOftenDetail'
  ])
}

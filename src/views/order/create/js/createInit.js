import dayjs from 'dayjs'
import NP from 'number-precision'
import { addressConcat } from '../../js/filters'

export default {
  async orderInfoInit () {
    if (JSON.stringify(this.orderConfig) === '{}') {
      try {
        window.loading(true)
        await this.fetchOrderConfig()
      } catch (err) {
        //
      } finally {
        window.loading(false)
      }
    }
    if (this.mode === 'create' && !this.oneMoreId) return
    window.loading(true)
    let orderInfo
    let cargoList
    try {
      if (this.mode !== 'edit') {
        orderInfo = await this.getOftenDetail(this.oneMoreId)
        cargoList = orderInfo.orderCargoTemplateList
        this.SET_ONE_MORE_ID()
      } else {
        orderInfo = await this.fetchOrderInfo(this.id)
        cargoList = orderInfo.orderCargoList
        this.editOrderHasInit = true
        if (orderInfo.status === 20 && orderInfo.pickupStatus === 1) this.pickupDisabled = true
        this.$formWillLeave(false, () => { this.editOrderHasInit = false })
      }
      // 设置订单基础信息
      setOrderBaseInfo(orderInfo, this)
      // 设置客户订单号及其他信息
      setConsumerInfo(orderInfo, this)
      // 设置金额信息
      this.SET_FEE_INFO(getFields(orderInfo, [ 'pickupFee', 'loadFee', 'unloadFee', 'insuranceFee', 'otherFee' ]))
      // 设置货物信息
      this.SET_CARGO_LIST(cargoList)
      // 设置其他信息
      this.SET_OTHER_INFO(getFields(orderInfo, [ 'isInvoice', 'invoiceRate', 'collectionMoney', 'remark' ]))
    } catch (err) {
      //
    } finally {
      window.loading(false)
    }
  }
}

function getFields (order, keys) {
  let info = {}
  keys.forEach(key => { info[key] = order[key] || '' })
  return info
}

function setOrderBaseInfo (orderInfo, context) {
  let orderBaseInfo = getFields(orderInfo, [
    'consignerName',
    'consignerContact',
    'consignerPhone',
    'start',
    'startName',
    'consignerAddress',
    'consignerHourseNumber',
    'consignerAddressLongitude',
    'consignerAddressLatitude',
    'consigneeContact',
    'consigneePhone',
    'end',
    'endName',
    'consigneeAddress',
    'consigneeHourseNumber',
    'consigneeAddressLongitude',
    'consigneeAddressLatitude',
    'consigneeCompanyName',
    'settlementType',
    'pickup',
    'receiptCount',
    'mileage',
    'consumerInfo',
    'otherFee'
  ])
  if (orderBaseInfo.mileage) orderBaseInfo.mileage = NP.divide(orderBaseInfo.mileage, 1000)
  orderBaseInfo.consignerAddressText = addressConcat(orderBaseInfo.consignerAddress, orderBaseInfo.startName, orderBaseInfo.consignerHourseNumber)
  orderBaseInfo.consigneeAddressText = addressConcat(orderBaseInfo.consigneeAddress, orderBaseInfo.endName, orderBaseInfo.consigneeHourseNumber)
  orderBaseInfo.consignerAddressLocale = []
  orderBaseInfo.consigneeAddressLocale = []
  orderBaseInfo.freightFee = orderInfo.freightFee === null ? '' : NP.divide(orderInfo.freightFee, 100)
  console.log(orderBaseInfo.freightFee)
  orderBaseInfo.isSaveOrderTemplate = 0
  orderBaseInfo.consignerAddressMapType = 1
  orderBaseInfo.consigneeAddressMapType = 1
  context.SET_ORDER_INFO(orderBaseInfo)
}

function setConsumerInfo (orderInfo, context) {
  let consumerInfo = getFields(orderInfo, [ 'customerOrderNo', 'customerWaybillNo', 'salesmanId', 'salesmanName', 'deliveryTime', 'arriveTime' ])
  if (consumerInfo.deliveryTime) consumerInfo.deliveryTimeText = dayjs(consumerInfo.deliveryTime).format('YYYY-MM-DD HH:mm') + '前'
  if (consumerInfo.arriveTime) consumerInfo.arriveTimeText = dayjs(consumerInfo.arriveTime).format('YYYY-MM-DD HH:mm') + '前'
  context.SET_CONSUMER_INFO(consumerInfo)
}

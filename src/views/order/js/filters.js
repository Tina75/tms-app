import NP from 'number-precision'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from './constant'

export function settlementType (type) {
  for (let i in SETTLEMENT_TYPE) {
    if (type === SETTLEMENT_TYPE[i].value) return SETTLEMENT_TYPE[i].text
  }
}

export function pickupType (type) {
  for (let i in PICKUP_TYPE) {
    if (type === PICKUP_TYPE[i].value) return PICKUP_TYPE[i].text
  }
}

export function totalFee (order) {
  return NP.divide(
    NP.plus(
      order.freightFee || 0,
      order.loadFee || 0,
      order.unloadFee || 0,
      order.insuranceFee || 0,
      order.otherFee || 0,
      order.pickupFee || 0
    ), 100
  )
}

export default {
  settlementType,
  totalFee
}

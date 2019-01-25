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

const addressReg = /(.{2,5}(省|(自治区)|(香港)|(澳门))){0,1}(.{1,4}市){0,1}(.{1,}(区|市)){0,1}(.{0,})/
export function addressConcat (address, cityName, extra) {
  if (!address) address = ''
  if (!cityName) cityName = ''
  if (!extra) extra = ''
  const cityArr = cityName.replace(addressReg, '$1/$6/$7/$9').split('/')
  const addressArr = address.replace(addressReg, '$1/$6/$7/$9').split('/')
  console.log(cityName, cityArr)
  console.log(address, addressArr)
  const province = addressArr[0] ? addressArr[0] : cityArr[0]
  const city = addressArr[1] ? addressArr[1] : cityArr[1]
  const district = addressArr[2] ? addressArr[2] : cityArr[2]
  return [ province, city, district, addressArr[3], extra ].join('')
}

export default {
  settlementType,
  pickupType,
  totalFee,
  addressConcat
}

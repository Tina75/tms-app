export const SETTLEMENT_TYPE = [
  { value: 1, text: '现付' },
  { value: 2, text: '到付' },
  { value: 3, text: '回付' },
  { value: 4, text: '月结' }
]

export const PICKUP_TYPE = [
  { value: 1, text: '小车上门提货' },
  { value: 2, text: '大车直送客户' }
]

export const CHARGE_RULES = {
  WEIGHT_TON: 1, // 重量吨
  VOLUME: 2, // 体积方
  WEIGHT_TON_KM: 3, // 吨公里
  VOLUME_KM: 4, // 方公里
  CAR_TYPE: 5, // 车型
  WEIGHT_KG: 6, // 重量公斤
  WEIGHT_KG_KM: 7, // 公斤公里
  QUANTITY: 8 // 件
}

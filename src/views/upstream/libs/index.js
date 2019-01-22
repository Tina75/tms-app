export const setRate = (rate = 0) => {
  return rate / 100
}
export const getRate = (rate = 0) => {
  return rate * 100
}
export const setMoney = (value = 0) => {
  return value * 100
}
export const getMoney = (value = 0) => {
  return value / 100
}
export const setMile = (value = 0) => {
  return value * 1000
}
export const getMile = (value = 0) => {
  return value / 1000
}
// 上游来单体积
export const getVolume = (value = 0) => {
  return value / 100
}
// 上游来单重量
export const getWeight = (value = 0) => {
  return value / 1000
}
export const pickUp = (value) => {
  let status = ''
  switch (Number(value)) {
    case 1:
      status = '小车上门提货'
      break
    case 2:
      status = '大车直送客户'
      break
    default:
      break
  }
  return status
}
export const settlement = (value) => {
  let status = ''
  switch (Number(value)) {
    case 1:
      status = '现付'
      break
    case 2:
      status = '到付'
      break
    case 3:
      status = '回付'
      break
    case 4:
      status = '月结'
      break
    default:
      break
  }
  return status
}

export const orderStatus = (value, type = '') => {
  let status = '-'
  if (type) {
    switch (Number(value)) {
      case -1:
        status = '待签收'
        break
      case 0:
        status = '待回收'
        break
      case 1:
        status = '待返厂'
        break
      case 2:
        status = '已返厂'
        break
      default:
        break
    }
  } else {
    switch (Number(value)) {
      case 0:
        status = '待接收'
        break
      case 1:
        status = '已接收'
        break
      case 2:
        status = '已拒绝'
        break
      default:
        break
    }
  }
  return status
}

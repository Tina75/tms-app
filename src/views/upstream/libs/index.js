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
        status = '已接受'
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

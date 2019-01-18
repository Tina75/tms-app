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

export const orderStatus = (value) => {
  let status = '-'
  switch (value) {
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
  return status
}

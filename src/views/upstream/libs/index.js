export const rateGet = (rate = 0) => {
  return rate * 100
}

export const money = (value = 0) => {
  return value * 100
}

export const mile = (value = 0) => {
  return value * 1000
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

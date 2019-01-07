import cityUtil from 'ydd_area'
// 和客户端统一, 只有区显示全名 其他都显示简写
cityUtil.getDetail = function (code) {
  if (code === 0 || code === '0') {
    return ['全国', '全境']
  }
  const data = cityUtil.getPathByCode(code) || []

  if (data.length === 0) {
    return ['未知', '未知']
  }

  const arr = []
  data.forEach(v => {
    arr.unshift(getName(v))
  })
  return [arr[0], arr[0] === arr[1] || !arr[1] ? '全境' : arr[1]]
}
cityUtil.getTwoLevelName = function (code) {
  if (code === 0 || code === '0') {
    return '全国'
  }
  const data = cityUtil.getPathByCode(code) || []
  if (data.length === 0) {
    return '未知'
  }
  let arr = data.reverse().map(getName)
  arr.length = 2

  if (arr[0] === arr[1]) {
    return arr[0]
  }
  return arr.reverse().join('')
}
// 中转城市获取唯一地名, 规则 省和市直接展示自身 区一级要加上市, 端木说的.
cityUtil.getUniqueName = function (code) {
  if (code === 0 || code === '0') {
    return '全国'
  }
  const data = cityUtil.getPathByCode(code) || []
  if (data.length === 0) {
    return '未知'
  }

  let arr = data.reverse()
  arr.length = 2

  if (arr[0].deep <= 2) {
    return arr[0].shortName
  }

  return arr
    .reverse()
    .map(getName)
    .join('')
}

export default cityUtil

function getName (node) {
  return node.deep === '3' ? node.name : node.shortName
}

import cityUtil from 'ydd_area'
console.info('cityUtil', cityUtil)
cityUtil.getCityNameArray = (data) => {
  if (typeof data === 'number' || typeof data === 'string') {
    data = cityUtil.getPathByCode(data)
  }
  if (data instanceof Array) {
    let names = data.reduce((arr, item, i) => {
      if (i === 0 || item.name !== arr[i - 1]) {
        arr.push(item.name)
      }
      return arr
    }, [])
    return names
  }
  return []
}
export default cityUtil

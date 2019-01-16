import cityUtil from 'ydd_area'

cityUtil.getCityNameArray = (data) => {
  if (data.length) {
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

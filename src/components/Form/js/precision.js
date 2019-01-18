export default (number, precision) => {
  const numberStr = String(number)
  if (numberStr.indexOf('.') === -1) return number
  let numberArr = numberStr.split('.')
  if (precision === 0) return numberArr[0]
  if (numberArr.length > 2) numberArr = [numberArr[0], numberArr[1]]
  const floatPart = numberArr[1]
  if (floatPart.length > precision) {
    numberArr[1] = numberArr[1].substr(0, precision)
  }
  return numberArr.join('.')
}

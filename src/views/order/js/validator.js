const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/
const VALIDATE_MONEY = /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/

export const phone = {
  phoneValidator: val => {
    val = val.replace(/\s/g, '')
    return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
  },
  messages: { phoneValidator: '请输入正确的手机号或座机号' }
}

export const money = {
  moneyValidator: val => VALIDATE_MONEY.test(val),
  messages: { moneyValidator: '整数位不得超过9位' }
}

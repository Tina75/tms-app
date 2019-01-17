
const URL_HOST = process.env.VUE_APP_IMG_HOST
const validator = {
  // 手机号码
  phone (value) {
    return /^1[0-9]{10}$/.test(value)
  },
  // 座机号码
  telphone (value) {
    // return /^([0-9]|[-()（）]){1,}$/.test(value) && /^0[0-9]{10,}$/.test(value.replace(/[-()（）]/g, '')) && value.length <= 20
    return /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/.test(value)
  }
}
export const validatePhone = (val) => {
  if (!val) return
  const value = val.replace(/\s/g, '')
  return validator.phone(value) || validator.telphone(value)
}

export const CHECK_NAME = function (val) {
  return /^.{2,25}$/.test(val)
}

export const FORMAT_IMG = function (value) {
  if (value.indexOf('aliyuncs.com') > 0) return value
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
}

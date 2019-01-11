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

export default validator

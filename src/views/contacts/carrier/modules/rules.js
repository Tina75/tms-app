const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/
const VALIDATE_CAR = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$)/

export const contactRule = {
  carrierName: {
    required: true,
    max: 20
  },
  carrierPrincipal: {
    required: true,
    max: 15
  },
  carrierPhone: {
    required: true,
    custom: (val) => {
      val = val + ''
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val)
    },
    message: {
      custom: '请输入手机号'
    }
  },
  customerCarrierPhone: {
    required: false,
    custom: (val) => {
      val = val + ''
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
    },
    message: {
      custom: '请输入手机号或座机号，座机需加区号'
    }
  },
  remark: {
    max: 200
  }
}

export const truckRule = {
  carNo: {
    required: true,
    custom: (val) => {
      val = val + ''
      val = val.replace(/\s/g, '')
      return VALIDATE_CAR.test(val) || VALIDATE_TEL.test(val)
    },
    message: {
      custom: '请输入车牌号'
    }
  },
  driverName: {
    required: true,
    max: 20
  },
  driverPhone: {
    required: true,
    custom: (val) => {
      val = val + ''
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val)
    },
    message: {
      custom: '请输入手机号'
    }
  },
  driverType: {
    required: true
  },
  carType: {
    required: true
  },
  carLength: {
    required: true
  },
  // price: {
  //   pattern: /^(\d+(\.\d{1,4})?$)$/,
  //   message: {
  //     pattern: '数字,最多支持4位小数'
  //   }
  // },
  // weight: {
  //   pattern: /^\d*$/,
  //   message: {
  //     pattern: '请输入整数'
  //   }
  // },
  // volume: {
  //   pattern: /^(\d+(\.\d{1,6})?$)$/,
  //   message: {
  //     pattern: '数字,最多支持6位小数'
  //   }
  // },
  remark: {
    max: 100
  }
}

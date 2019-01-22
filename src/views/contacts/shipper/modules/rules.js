const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/

export const contactRule = {
  name: {
    required: true,
    max: 20
  },
  contact: {
    required: true,
    max: 15
  },
  phone: {
    required: true,
    custom: (val) => {
      val = val + ''
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
    },
    message: {
      custom: '请输入手机号或座机号，座机需加区号'
    }
  },
  invoiceRate: {
    pattern: /^0*((\d{1,2}(\.\d{1,2})?$)|100)$/,
    required: true,
    message: {
      pattern: '0到100,最多支持2位小数'
    }
  },
  remark: {
    max: 100
  }
}

export const cargoRule = {
  name: {
    required: true,
    max: 200
  },
  number: {
    max: 200
  },
  price: {
    pattern: /^(\d{1,9}(\.\d{1,4})?$)$/,
    message: {
      pattern: '数字,最多9位整数,4位小数'
    }
  },
  weight: {
    pattern: /^\d{0,9}$/,
    message: {
      pattern: '请输入整数, 最多9位'
    }
  },
  volume: {
    pattern: /^(\d{1,6}(\.\d{1,6})?$)$/,
    message: {
      pattern: '数字,最多6位整数,6位小数'
    }
  },
  remark: {
    max: 100
  }
}

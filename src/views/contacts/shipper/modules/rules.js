const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/

const phoneValidate = val => {
  val = val.replace(/\s/g, '')
  return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
}

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
    custom: phoneValidate,
    messages: {
      custom: "请输入手机号或座机号，座机需加区号"
    }
  },
  invoiceRate: {
    required: true
  }
}

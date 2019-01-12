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
  const value = val.replace(/\s/g, '')
  return validator.phone(value) || validator.telphone(value)
}

export const formatPhone = (value) => {
  if (/^1/.test(value)) {
    const length = value.length
    if (length === 4) {
      value = value.slice(0, 3) + ' ' + value[3]
    }
    if (length === 9) {
      value = value.slice(0, 8) + ' ' + value[8]
    }
  }
  return value.trim()
}

export class ConsigneeDetail {
  address = '' // 收货详细地址
  consigneeCompanyName = '' // 收货人单位
  consignerId = '' // 发货方id
  consigner = '' // 发货方名称
  contact = '' // 收货联系人
  cityName = '' // 收货地址
  phone = ''  // 收货人联系方式
  remark = '' // 备注
  static parse(data) {
    return {
      address:data.address,
      consigneeCompanyName: data.consigneeCompanyName,
      consignerId: data.consignerId,
      consigner: data.consignerHourseNumber,
      contact: data.contact,
      cityName: data.cityName,
      phone: data.phone,
      remark: data.remark
    }
  }
}

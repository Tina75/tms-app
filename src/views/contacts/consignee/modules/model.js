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
  if (value && /^1/.test(value)) {
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

export const editPhone = (value) => {
  if (value && /^1/.test(value)) {
    return value.slice(0, 3) + ' ' + value.slice(3, 7) + ' ' + value.slice(7)
  } else {
    return value
  }
}
export class ConsigneeDetail {
  // id = ''
  longitude = '' // 经度
  latitude = '' // 纬度
  mapType = 1
  address = '' // 收货详细地址
  consigneeCompanyName = '' // 收货人单位
  consignerName = '' // 发货方名称
  consignerId = ''
  contact = '' // 收货联系人
  cityName = '' // 收货地址
  phone = '' // 收货人联系方式
  remark = '' // 备注
  cityCode = ''
  static toForm(data) {
    return {
      address: data.address,
      consigneeCompanyName: data.consigneeCompanyName ? data.consigneeCompanyName : '',
      consignerName: data.consignerName,
      consignerId: data.consignerId,
      contact: data.contact,
      cityName: data.cityName ? data.cityName : '',
      phone: data.phone,
      remark: data.remark ? data.remark : '',
      longitude: data.longitude,
      latitude: data.latitude,
      id: data.id,
      cityCode: data.cityCode
    }
  }
  static toServer(data) {
    const body = {
      address: data.address,
      consignerId: data.consignerId,
      consigneeCompanyName: data.consigneeCompanyName,
      contact: data.contact,
      latitude: data.latitude,
      longitude: data.longitude,
      mapType: data.mapType,
      phone: data.phone,
      remark: data.remark,
      id: data.id,
      cityCode: data.cityCode
    }
    return body
  }
}

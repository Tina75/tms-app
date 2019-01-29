import cityUtil from '@/libs/city'
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
// 表单校验规则
export const consigneeRule = {
  consigner: { required: true },
  contact: { required: true },
  phone: {
    required: true,
    type: 'string',
    validatePhone: (val) => {
      const value = val.replace(/\s/g, '')
      return validator.phone(value) || validator.telphone(value)
    },
    messages: {
      validatePhone: '请输入正确的手机号或座机号'
    }
  },
  address: { required: true }
}

const hasCity = (address, cityCode) => {
  const cityForm = cityUtil.getCityNameArray(cityCode)
  cityForm.forEach(name => {
    address = address.replace(name, '')
  })
  return address
}
export class ConsigneeDetail {
  id = ''
  consigneeCompanyName = '' // 收货人单位
  consignerName = '' // 发货方名称
  consignerId = ''
  contact = '' // 收货联系人
  phone = '' // 收货人联系方式
  remark = '' // 备注
  address = '' // 地址
  cityCode = ''
  consignerHourseNumber = '' // 门牌号
  static toForm(server) {
    const data = {}
    const arr = ['address', 'cityCode', 'consigneeCompanyName', 'consignerHourseNumber', 'consignerId', 'consignerName', 'contact', 'id', 'phone', 'remark']
    arr.forEach((key) => {
      data[key] = server[key]
      data.cityCode = data.cityCode ? data.cityCode : ''
      data.address = server.consignerHourseNumber ? server.address + server.consignerHourseNumber : server.address
    })
    return data
  }
  static toView(data) {
    const view = {
      ...data,
      address: data.consignerHourseNumber ? hasCity(data.address, data.cityCode) + data.consignerHourseNumber : hasCity(data.address, data.cityCode)
    }
    return view
  }
  static toServer(data) {
    const server = {
      address: data.address,
      consignerId: data.consignerId,
      consigneeCompanyName: data.consigneeCompanyName,
      consignerHourseNumber: data.consignerHourseNumber,
      contact: data.contact,
      latitude: data.latitude,
      longitude: data.longitude,
      mapType: data.mapType,
      phone: data.phone,
      remark: data.remark,
      id: data.id,
      cityCode: data.cityCode
    }
    return server
  }
}

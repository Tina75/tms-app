export class ContactDetail {
  id = ''
  carrierName = ''
  carrierPrincipal = '' // 负责人
  carrierPhone = ''
  customerCarrierPhone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注

  // 值和展示内容的印射
  static payType = [
    { text: '按单付', value: 1 },
    { text: '月结', value: 2 }
  ]

  // 转化函数
  // 后端接口 => 展示
  static toView(data, operators = []) {
    data = {
      ...data
    }
    ;['payType'].forEach((key) => {
      const value = +data[key]
      const options = ContactDetail[key]
      const option = options.find((item) => item.value === value)
      data[key] = option ? option.text : ''
    })
    return data
  }
  // 后端接口 => form表单格式
  static toForm(data) {
    data = { ...data }
    return data
  }

  // 表单格式 => 后端所需
  static toServer(data) {
    data = { ...data }
    return data
  }
}

export class TruckDetail {
  id = ''
  carNo = ''
  carType = ''
  shippingWeight = ''
  carLength = ''
  shippingVolume = ''
  driverId = ''
  carrierId = ''
  purchDate = ''
  carBrand = ''
  travelPhoto = ''
  drivePhoto = ''
  regularLine = ''
  driverName = ''
  driverPhone = ''
  driverType = ''
  remark = ''

  static carType = [
    { text: '平板', value: 1 },
    { text: '高栏', value: 2 },
    { text: '厢车', value: 3 },
    { text: '自卸', value: 4 },
    { text: '冷藏', value: 5 },
    { text: '保温', value: 6 },
    { text: '高低板', value: 7 },
    { text: '面包车', value: 8 },
    { text: '爬梯车', value: 9 },
    { text: '飞翼车', value: 10 },
    { text: '罐车', value: 11 }
  ]

  static driverType = [
    { text: '合约', value: 1 },
    { text: '临时', value: 2 },
    { text: '自有', value: 3 },
    { text: '挂靠', value: 4 }
  ]

  static carLength = [
    { text: '1.8米', value: 1 },
    { text: '2.7米', value: 2 },
    { text: '3.8米', value: 3 },
    { text: '4.2米', value: 4 },
    { text: '5米', value: 5 },
    { text: '6.2米', value: 6 },
    { text: '6.8米', value: 7 },
    { text: '7.7米', value: 8 },
    { text: '8.2米', value: 9 },
    { text: '8.7米', value: 10 },
    { text: '9.6米', value: 11 },
    { text: '11.7米', value: 12 },
    { text: '12.5米', value: 13 },
    { text: '13米', value: 14 },
    { text: '15米', value: 15 },
    { text: '16米', value: 16 },
    { text: '17.5米', value: 17 }
  ]

  static toForm(server) {
    if (server && server.id) {
      const form = fillEmpty(server)
      return form
    }
    return new TruckDetail()
  }

  // 表单格式 => 后端所需
  static toServer(form) {
    const server = filterEmpty(form)
    server.carNO = form.carNo
    if (form.id) {
      server.carId = form.id
    }
    return server
  }

  // truckList(item => viewItem)
  static toViewItem(data) {
    data = { ...data }
    ;['carType', 'payType', 'carLength', 'driverType'].forEach((key) => {
      const value = +data[key]
      if (value) {
        const options = TruckDetail[key]
        const option = options.find((item) => item.value === value)
        data[key] = option ? option.text : ''
      }
    })
    return data
  }

  static toView(data) {
    data = {
      ...data,
      shippingVolume: data.shippingVolume ? data.shippingVolume + '方' : '',
      shippingWeight: data.shippingWeight ? data.shippingWeight + '吨' : '',
      purchDate: data.purchDate ? new Date(data.purchDate).toISOString().split('T')[0] : ''
    }
    const mapType = ['carType', 'payType', 'carLength', 'driverType']
    mapType.forEach((key) => {
      const value = +data[key]
      if (value) {
        const options = TruckDetail[key]
        const option = options.find((item) => item.value === value)
        data[key] = option ? option.text : ''
      }
    })
    return data
  }
}

function fillEmpty(obj) {
  const data = {}
  for (let [key, value] of Object.entries(obj)) {
    data[key] = (value !== 0 || value !== false) && !value ? '' : value
  }
  return data
}

function filterEmpty(obj) {
  const data = {}
  for (let [key, value] of Object.entries(obj)) {
    if (value) {
      data[key] = value
    } else {
      data[key] = ''
    }
  }
  return data
}

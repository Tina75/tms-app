export class ContactDetail {
  id = ''
  carrierName = ''
  carrierPrincipal = '' // 负责人
  carrierPhone = ''
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
  // 后端接口 => from表单格式
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
  carNO = ''
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
    { text: '飞翼车', value: 10 }
  ]

  static driverType = [
    { text: '合约司机 ', value: 1 },
    { text: '临时司机 ', value: 2 }
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

  // 后端接口 => from表单格式
  static toFrom(data) {
    data = { ...data }
    return data
  }

  // 表单格式 => 后端所需
  static toServer(data) {
    data = { ...data }
    return data
  }

  // truckList(item => viewItem)
  static toViewItem(data) {
    data = { ...data }
    ;['carType', 'driverType', 'carLength'].forEach((key) => {
      const value = +data[key]
      const options = ContactDetail[key]
      const option = options.find((item) => item.value === value)
      data[key] = option ? option.text : ''
    })
    return data
  }
}

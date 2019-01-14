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
      // isInvoice: !!data.isInvoice,
      // invoiceRate: !!data.isInvoice ? +data.invoiceRate + '%' : ''
    }
    // if (data.salesmanId) {
    //   data.salesmanId = +data.salesmanId
    //   const operator = operators.find((item) => +item.id === data.salesmanId)
    //   data.operatorName = operator ? operator.name : ''
    // }
    ;['payType'].forEach((key) => {
      const value = +data[key]
      const options = ContactDetail[key]
      const option = options.find((item) => item.value === value)
      data[key] = option ? option.text : ''
    })
    return data
  }
  // 后端接口 => from表单格式
  static toFrom(data) {
    data = { ...data }
    // cube-switch 需要boolean类型 防止报错
    data.isInvoice = !!data.isInvoice
    // 后端是0.xx 前端显示xx%
    data.invoiceRate = +data.invoiceRate
    return data
  }

  // 表单格式 => 后端所需
  static toServer(data) {
    data = { ...data }
    data.isInvoice = data.isInvoice ? 1 : 0
    data.invoiceRate = data.isInvoice ? data.invoiceRate : 0
    return data
  }
}

export class CargoDetail {
  id = '' // 货物id
  cargoName = '' // 货物名称
  cargoNo = '' // 货物编号
  cargoCost = 0 // 货物价值，单位：分
  unit = '' // 包装
  dimension = {
    // 包装尺寸
    length: 0,
    width: 0,
    height: 0
  }
  weight = 0 // 重量
  volume = 0 // 体积
  remark1 = ''
  remark2 = ''
}

export class Truck {
  id = ''
  carNO = ''
  carType = ''
  shippingWeight = ''
  carLength = ''
  shippingVolume = ''
  driverId = ''
  carrierId = ''

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
}

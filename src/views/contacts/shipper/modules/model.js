export class ContactDetail {
  id = ''
  name = '' //
  contact = '' // 发货方联系人
  phone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注
  isInvoice = false // 是否开票
  invoiceRate = 0 // 开票税率
  salesmanId = '' // 对接业务员
  pickUp = '' // 提货方式
  exploiteChannel = '' // 开括渠道
  static pickUp = [{ text: '小车上门自提', value: 1 }, { text: '大车直接送货', value: 2 }]
  static payType = [
    { text: '现付', value: 1 },
    { text: '到付', value: 2 },
    { text: '回单付', value: 3 },
    { text: '月结', value: 4 }
  ]
  static exploiteChannel = [{ text: '公司开拓', value: 1 }, { text: '个人开拓', value: 2 }]
  static toView(data, operators = []) {
    data = {
      ...data,
      isInvoice: !!data.isInvoice,
      invoiceRate: !!data.isInvoice ? +data.invoiceRate + '%' : ''
    }
    if (data.salesmanId) {
      data.salesmanId = +data.salesmanId
      const operator = operators.find((item) => +item.id === data.salesmanId)
      data.operatorName = operator ? operator.name : ''
    }
    ['pickUp', 'payType', 'exploiteChannel'].forEach((key) => {
      const value = +data[key]
      const options = ContactDetail[key]
      const option = options.find((item) => item.value === value)
      data[key] = option ? option.text : ''
    })
    return data
  }
  static toFrom(data) {
    data = { ...data }
    // cube-switch 需要boolean类型 防止报错
    data.isInvoice = !!data.isInvoice
    // 后端是0.xx 前端显示xx%
    data.invoiceRate = +data.invoiceRate
    return data
  }
  static toServer(data) {
    data = { ...data }
    data.isInvoice = data.isInvoice ? 1 : 0
    data.invoiceRate = data.isInvoice ? data.invoiceRate : 0
    return data
  }
}

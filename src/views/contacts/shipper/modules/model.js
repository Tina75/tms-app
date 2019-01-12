export class ContactItem {
  name = ''
  detail = ''
  id = ''
  phone = ''
  data = {}
  static parse(data) {
    return {
      name: data.name,
      detail: data.contact + '  ' + data.phone,
      phone: data.phone,
      data
    }
  }
}

export class ContactDetail {
  id = ''
  name = '' //
  contact = '' // 发货方联系人
  phone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注
  isInvoice = false // 是否开票
  invoiceRate = '' // 开票税率
  salesmanId = '' // 对接业务员
  pickUp = '' // 提货方式
  exploiteChannel = '' // 开括渠道
  static pickUps = [{ text: '小车上门自提', value: 1 }, { text: '大车直接送货', value: 2 }]
  static payTypes = [
    { text: '现付', value: 1 },
    { text: '到付', value: 2 },
    { text: '回单付', value: 3 },
    { text: '月结', value: 4 }
  ]
  static channels = [{ text: '公司开拓', value: 1 }, { text: '个人开拓', value: 2 }]
  static parse(data) {
    const instance = new ContactDetail()
    return instance
  }
}

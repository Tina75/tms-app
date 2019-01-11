export class LazyList {
  list = []
  hasNext = true
  nextPage = 1
  pageSize = 10
}
export class ContactModify {
  id = ''
  name = '' //
  contact = '' // 发货方联系人
  phone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注
  isInvoice = '' // 是否开票
  salesmanId = '' // 对接业务员
  invoiceRate = ''
  exploiteChannel = '' // 开括渠道
}
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
      id: data.id,
      phone: data.phone,
      data
    }
  }
}

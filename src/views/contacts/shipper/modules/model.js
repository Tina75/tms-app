export class ContactDetail {
  id = ''
  name = ''
  contact = '' // 发货方联系人
  phone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注
  isInvoice = false // 是否开票
  invoiceRate = 0 // 开票税率
  salesmanId = '' // 对接业务员
  pickUp = '' // 提货方式
  exploiteChannel = '' // 开括渠道
  // 值和展示内容的印射
  static pickUp = [{ text: '小车上门自提', value: 1 }, { text: '大车直接送货', value: 2 }]
  static payType = [
    { text: '现付', value: 1 },
    { text: '到付', value: 2 },
    { text: '回单付', value: 3 },
    { text: '月结', value: 4 }
  ]
  static exploiteChannel = [{ text: '公司开拓', value: 1 }, { text: '个人开拓', value: 2 }]

  // 转化函数
  // 后端接口 => 展示
  static toView(server, operators = []) {
    server = {
      ...server,
      isInvoice: !!server.isInvoice,
      invoiceRate: !!server.isInvoice ? +server.invoiceRate * 100 + '%' : ''
    }
    if (server.salesmanId) {
      server.salesmanId = +server.salesmanId
      const operator = operators.find((item) => +item.id === server.salesmanId)
      server.operatorName = operator ? operator.name : ''
    }
    ;['pickUp', 'payType', 'exploiteChannel'].forEach((key) => {
      const value = +server[key]
      const options = ContactDetail[key]
      const option = options.find((item) => item.value === value)
      server[key] = option ? option.text : ''
    })
    return server
  }
  // 后端接口 => from表单格式
  static toForm(server) {
    server = { ...server }
    // cube-switch 需要boolean类型 防止报错
    server.isInvoice = !!server.isInvoice
    // 后端是0.xx 前端显示xx%
    server.invoiceRate = +server.invoiceRate * 100
    server.salesmanId = server.salesmanId || ''
    return server
  }

  // 表单格式 => 后端所需
  static toServer(form) {
    form = { ...form }
    form.isInvoice = form.isInvoice ? 1 : 0
    // 后端最大值是1....
    form.invoiceRate = form.isInvoice ? +form.invoiceRate / 100 : 0
    return form
  }
}

export class CargoDetail {
  id = '' // 货物id
  cargoName = '' // 货物名称
  cargoNo = '' // 货物编号
  cargoCost = '' // 货物价值，单位：分
  unit = '' // 包装
  dimension = {
    // 包装尺寸
    length: 0,
    width: 0,
    height: 0
  }
  weight = '' // 重量
  volume = '' // 体积
  remark1 = ''
  remark2 = ''

  static unitTypes = ['纸箱', '木箱', '铁桶', '纤袋', '麻袋', '木袋']

  static toForm(server) {
    if (server.id) {
      return {
        ...server,
        dimension: { // immutability
          ...server.dimension
        },
        cargoCost: server.cargoCost / 100 // 后端是分,前端是元
      }
    }
    return new CargoDetail()
  }

  static toServer(form) {
    return {
      ...form,
      dimension: { // immutability
        ...form.dimension
      },
      cargoCost: form.cargoCost * 100 // 后端是分,前端是元
    }
  }
}

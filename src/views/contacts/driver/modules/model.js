export class DriverDetail {
  id = ''
  driverName = ''
  driverPhone = ''
  carNO = ''
  carType = ''
  carLength = ''
  shippingWeight = ''
  shippingVolume = ''
  remark = ''
  payType = ''
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
  static payType = [
    { text: '按单付', value: 1 },
    { text: '月结', value: 2 }
  ]
  static toView(data) {
    data = {
      ...data,
      shippingVolume: data.shippingVolume ? data.shippingVolume + '方' : '',
      shippingWeight: data.shippingWeight ? data.shippingWeight + '吨' : ''

    }
    const mapType = ['carType', 'payType', 'carLength']
    mapType.forEach((key) => {
      const value = +data[key]
      const options = DriverDetail[key]
      const option = options.find((item) => item.value === value)
      data[key] = option ? option.text : ''
    })
    return data
  }

  // 后端接口 => form表单格式
  static toForm(server) {
    const form = fillEmpty(server)
    // cube-switch 需要boolean类型 防止报错
    // form.isInvoice = !!form.isInvoice
    // // 后端是0.xx 前端显示xx%
    // form.invoiceRate = +form.invoiceRate * 100
    // form.salesmanId = form.salesmanId || ''
    return form
  }
}

function fillEmpty(obj) {
  const data = {}
  for (let [key, value] of Object.entries(obj)) {
    data[key] = (value !== 0 || value !== false) && !value ? '' : value
  }
  return data
}

// function filterEmpty(obj) {
//   const data = {}
//   for (let [key, value] of Object.entries(obj)) {
//     if (value) {
//       data[key] = value
//     }
//   }
//   return data
// }

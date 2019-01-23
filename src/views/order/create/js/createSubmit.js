import NP from 'number-precision'

export default {
  // 获取订单聚合信息
  getOrderInfo () {
    const data = Object.assign(
      {},
      this.orderInfo,
      this.consumerInfo,
      { orderCargoList: this.orderCargoList },
      this.feeInfo,
      this.otherInfo
    )
    data.consignerPhone = data.consignerPhone.replace(/\s/g, '')
    data.consigneePhone = data.consigneePhone.replace(/\s/g, '')
    data.freightFee = data.freightFee === '' ? '' : NP.times(data.freightFee, 100)
    if (data.mileage) data.mileage = NP.times(data.mileage, 1000)

    const deleteFileds = [
      'consigneeAddressLocale',
      'consignerAddressLocale',
      'consigneeAddressText',
      'consignerAddressText',
      'deliveryTimeText',
      'arriveTimeText',
      'otherFee',
      'otherInfo',
      'consumerInfo'
    ]
    deleteFileds.forEach(field => { delete data[field] })
    for (let key in data) { if (data[key] === '') delete data[key] }
    return data
  },

  // 开单或编辑保存
  async saveOrder (data) {
    try {
      if (this.mode !== 'edit') {
        await this.createOrder(data)
        window.toast('保存成功')
      } else {
        delete data.isSaveOrderTemplate
        data.id = this.id
        await this.updateOrder(data)
        window.toast('修改成功')
      }
      this.$formWillLeave()
      this.$refs.$form.reset()
      if (this.mode !== 'create') this.$router.back()
    } catch (err) {
      //
    } finally {
      this.loading = false
      window.loading(false)
    }
  },

  async saveAndShipOrder (data) {
    try {
      if (!(await this.checkDirectShipRights(data))) {
        this.$createDialog({
          type: 'alert',
          content: `您的账号没有${data.pickup === 1 ? '提货' : '送货'}管理的权限，请联系管理员配置权限。`
        }).show()
      } else {
        this.$formWillLeave()
        if (data.pickup === 1) this.$router.push({ name: 'pickup-assign', params: { id: 0 }, query: { type: 'direct' } }) // 提货派车
        else this.$router.push({ name: 'delivery-send-car', params: { id: 0 }, query: { type: 'direct' } }) // 送货派车
      }
    } catch (err) {
      //
    } finally {
      this.loading = false
      window.loading(false)
    }
  },

  // 保存订单
  async submitOrderInfo (isDirectShip) {
    if (this.loading) return
    if (!(await this.$refs.$form.validate())) return window.toast('请填写必填信息')

    this.loading = true
    window.loading(true)
    const data = this.getOrderInfo()
    if (isDirectShip) this.saveAndShipOrder(data)
    else this.saveOrder(data)
  }
}

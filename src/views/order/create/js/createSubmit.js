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
    data.freightFee = NP.times(data.freightFee, 100)

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

  // 保存订单
  async saveOrder () {
    if (this.loading) return
    if (!(await this.$refs.$form.validate())) {
      window.toast('请填写必填信息')
      return
    }
    this.loading = true
    window.loading(true)
    const data = this.getOrderInfo()
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
      if (this.mode === 'create') setTimeout(() => { window.location.reload() }, 2000)
      else {
        this.$formWillLeave()
        setTimeout(() => {
          this.$refs.$form.reset()
          this.$router.back()
        }, 2000)
      }
    } catch (err) {
      //
    } finally {
      this.loading = false
      window.loading(false)
    }
  }
}

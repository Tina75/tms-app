import NP from 'number-precision'

export default {
  // 进入客户单号及其他信息
  gotoConsumerInfoPage () {
    this.$formWillLeave()
    this.$router.push({ name: 'order-consumer-info' })
  },
  // 进入其他信息页面
  gotoOtherInfoPage () {
    this.$formWillLeave()
    this.$router.push({ name: 'order-other-info' })
  },
  gotoFeeInfoPage () {
    this.$formWillLeave()
    this.$router.push({ name: 'order-fee-info' })
  },
  // 进入货物信息页面
  gotoCargoInfoPage () {
    this.$formWillLeave()
    this.$router.push({ name: 'order-cargo-info' })
  },
  // 进入编辑地址页面
  gotoAddressInfoPage (type) {
    this.SET_ADDRESS_TYPE(type)
    this.$formWillLeave()
    this.$router.push({ name: 'order-edit-address' })
  },
  // 进入发货人列表
  gotoConsignerPage () {
    this.$formWillLeave()
    this.$router.push({ name: 'select-shipper' })
  },
  // 进入收货人列表
  gotoConsigneePage () {
    this.$formWillLeave()
    this.$router.push({ name: 'order-select-consignee' })
  },
  // 进入计费规则列表
  gotoChargeRulePage () {
    // if (!this.saveConsigner.id) {
    //   window.toast('请通过通讯录选择发货方')
    //   return
    // }
    const order = this.orderInfo
    let query = { partnerType: 1, partnerId: this.saveConsigner.id }
    query.departure = String(order.start)
    query.destination = String(order.end)
    query.distance = NP.times((order.mileage || 0), 1000)
    const { weight, volume, cargoInfos } = this.orderCargoList.reduce((last, item) => {
      return {
        weight: NP.plus(last.weight, item.weightKg || 0),
        volume: NP.plus(last.volume, item.volume || 0),
        cargoInfos: last.cargoInfos.concat({ key: item.cargoName, value: Number(item.quantity) })
      }
    }, {
      weight: 0,
      volume: 0,
      cargoInfos: []
    })
    query.weight = weight
    query.volume = volume
    query.cargoInfos = cargoInfos
    this.$formWillLeave()
    this.$router.push({
      name: 'order-charge-rule',
      query
    })
  }
}

import NP from 'number-precision'
import { setAppTitleBtn, closeWindow } from '@/libs/bridgeUtil'

export default {
  // 进入客户单号及其他信息
  gotoConsumerInfoPage () {
    this.formCanLeave()
    this.$router.push({ name: 'order-consumer-info' })
  },
  // 进入其他信息页面
  gotoOtherInfoPage () {
    this.formCanLeave()
    this.$router.push({ name: 'order-other-info' })
  },
  gotoFeeInfoPage () {
    this.formCanLeave()
    this.$router.push({ name: 'order-fee-info' })
  },
  // 进入货物信息页面
  gotoCargoInfoPage () {
    this.formCanLeave()
    this.$router.push({ name: 'order-cargo-info' })
  },
  // 进入编辑地址页面
  gotoAddressInfoPage (type) {
    this.SET_ADDRESS_TYPE(type)
    this.formCanLeave()
    this.$router.push({ name: 'order-edit-address' })
  },
  // 进入发货人列表
  gotoConsignerPage () {
    this.formCanLeave()
    this.$router.push({ name: 'order-select-consigner' })
  },
  // 进入收货人列表
  gotoConsigneePage () {
    this.formCanLeave()
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
    const { weight, weightKg, volume, cargoInfos } = this.orderCargoList.reduce((last, item) => {
      return {
        weight: NP.plus(last.weight, item.weight || 0),
        weightKg: NP.plus(last.weightKg, item.weightKg || 0),
        volume: NP.plus(last.volume, item.volume || 0),
        cargoInfos: last.cargoInfos.concat({ key: item.cargoName, value: Number(item.quantity) })
      }
    }, {
      weight: 0,
      weightKg: 0,
      volume: 0,
      cargoInfos: []
    })
    if (this.orderConfig.weightKgOption) {
      query.weight = weightKg
    } else {
      query.weight = NP.times(weight, 1000)
    }
    query.volume = volume
    query.cargoInfos = cargoInfos
    this.formCanLeave()
    this.$router.push({
      name: 'order-charge-rule',
      query
    })
  },
  // 设置导航栏按钮
  async setTitleButtons () {
    if (this.mode !== 'create') return
    setAppTitleBtn({
      text: '返回',
      position: 'left',
      action: () => {
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '信息未保存，是否确认离开？',
          icon: 'cubeic-alert',
          onConfirm: () => {
            closeWindow({ logOut: false })
          }
        }).show()
      }
    })
    if (!this.oftenPermission) await this.getOftenPermission()
    if (!this.oftenPermission || this.oftenPermission.indexOf(100400) === -1) return
    setAppTitleBtn({
      text: '常发订单',
      action: () => {
        this.$router.push({ name: 'order-often' })
      }
    })
  },

  formCanLeave () {
    this.$formWillLeave(() => { this.showPage = false })
  }
}

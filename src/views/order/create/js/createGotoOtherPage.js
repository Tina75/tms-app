import NP from 'number-precision'
import { setAppTitleBtn, closeWindow } from '@/libs/bridgeUtil'

function gotoPage (vm, routeName, query) {
  vm.$formWillLeave()
  vm.$router.push({ name: routeName, query })
}

export default {

  // 进入客户订单号及其他信息
  gotoConsumerInfoPage () {
    gotoPage(this, 'order-consumer-info')
  },
  // 进入其他信息页面
  gotoOtherInfoPage () {
    gotoPage(this, 'order-other-info')
  },
  gotoFeeInfoPage () {
    gotoPage(this, 'order-fee-info')
  },
  // 进入货物信息页面
  gotoCargoInfoPage () {
    gotoPage(this, 'order-cargo-info')
  },
  // 进入编辑地址页面
  gotoAddressInfoPage (type) {
    this.SET_ADDRESS_TYPE(type)
    gotoPage(this, 'order-edit-address')
  },
  // 进入发货人列表
  gotoConsignerPage () {
    gotoPage(this, 'order-select-consigner')
  },
  // 进入收货人列表
  gotoConsigneePage () {
    gotoPage(this, 'order-select-consignee')
  },
  // 进入计费规则列表
  async gotoChargeRulePage () {
    if (!this.consignerId) {
      return window.toast('暂无符合的计费规则')
    }
    if (!this.orderCargoList.length) {
      return window.toast('请先填写货物信息')
    }
    const { start, end, mileage } = this.orderInfo
    // 提前校验是否存在相应计费规则
    let query = { partnerType: 1, partnerId: this.consignerId }
    query.departure = start || void 0
    query.destination = end || void 0
    if (!query.partnerId || !(await this.getRuleList(query)).length) {
      return window.toast('暂无符合的计费规则')
    }
    query.distance = NP.times((mileage || 0), 1000)
    const { weight, weightKg, volume, cargoInfos } = this.orderCargoList.reduce((last, item) => {
      return {
        weight: NP.plus(last.weight, item.weight || 0),
        weightKg: NP.plus(last.weightKg, item.weightKg || 0),
        volume: NP.plus(last.volume, item.volume || 0),
        cargoInfos: last.cargoInfos.concat({ key: item.cargoName, value: item.quantity })
      }
    }, {
      weight: 0,
      weightKg: 0,
      volume: 0,
      cargoInfos: []
    })
    // 格式化重量单位为公斤
    if (this.orderConfig.weightKgOption) {
      query.weight = weightKg
    } else {
      query.weight = NP.times(weight, 1000)
    }
    query.volume = volume
    query.cargoInfos = cargoInfos
    gotoPage(this, 'order-charge-rule', query)
  },
  // 设置导航栏按钮
  async setTitleButtons () {
    if (this.mode !== 'create') return
    setAppTitleBtn({
      text: '返回',
      iconType: 'back',
      position: 'left',
      action: () => {
        this.$createDialog({
          type: 'confirm',
          title: '提醒',
          content: '信息未保存，是否确认离开？',
          onConfirm: () => {
            closeWindow({ logOut: false })
          }
        }).show()
      }
    })
    // 查询常发订单权限，无权限则不设置按钮
    if (!this.oftenPermission) await this.getOftenPermission()
    if (!this.oftenPermission || this.oftenPermission.indexOf(100400) === -1) return
    setAppTitleBtn({
      text: '常发订单',
      action: () => {
        gotoPage(this, 'order-often')
      }
    })
  }
}

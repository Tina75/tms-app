<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form class="form">
        <div class="form-section">
          <form-title title="发货方信息" :image="IMAGES.SEND" />
          <form-item
            v-model="orderInfo.consignerCompany" required
            label="客户名称"
            click-icon="icon-ico_custerm"
            @on-icon-click="chooseUserInfo('send')" />
          <form-item
            v-model="orderInfo.consignerName" required
            label="发货人" />
          <form-item
            v-model="orderInfo.consignerPhone" required
            label="联系号码"
            type="number" maxlength="11" />
          <form-item
            v-model="orderInfo.consignerCity"
            label="发货城市"
            placeholder="请选择省/市/区"
            type="click" :show-arrow="false" />
          <form-item
            v-model="orderInfo.consignerAddress" required
            label="详细地址" placeholder="请输入" :show-arrow="false"
            type="click" @on-click="editAddress" />
          <form-item
            v-model="orderInfo.extraData" prop="extraData"
            label="客户单号及其他"
            type="click" @on-click="$router.push({ name: 'order-consumer-info' })" />
        </div>

        <div class="form-section">
          <form-title title="收货方信息" :image="IMAGES.ACCEPT" />
          <form-item
            v-model="orderInfo.consigneeName" required
            label="收货人" click-icon="icon-ico_custerm"
            @on-icon-click="chooseUserInfo('accept')" />
          <form-item
            v-model="orderInfo.consigneePhone" required
            label="联系号码"
            type="number" maxlength="11" />
          <form-item
            v-model="orderInfo.consigneeCity"
            label="收货城市"
            placeholder="请选择省/市/区"
            type="click" />
          <form-item
            v-model="orderInfo.consigneeAddress" required
            label="详细地址" placeholder="请输入" :show-arrow="false"
            type="click" @on-click="editAddress" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.cargoInfo" required
            label="货物信息" :label-image="IMAGES.BOX"
            type="click" placeholder="请输入"
            @on-click="$router.push({ name: 'order-cargo-info' })" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.settlementType" required
            type="click"
            label="结算方式"
            @on-click="showPicker('settlementType')" />
          <form-item
            v-model="orderInfo.pickupType" required
            type="click"
            label="提货方式"
            @on-click="showPicker('pickupType')" />
          <form-item
            v-model="orderInfo.receiptNumber" required
            type="number"
            label="回单数量(份)" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.distance"
            type="number"
            label="计费里程(公里)" />
          <form-item
            v-model="orderInfo.transportFee"
            type="number"
            label="运输费用(元)"
            click-icon="icon-ico_rule"
            @on-icon-click="chooseChargeRule" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.extraFee"
            label="其他费用" :label-image="IMAGES.MONEY"
            type="click" @on-click="$router.push({ name: 'order-fee-info' })" />
          <form-item
            v-model="orderInfo.extraInfo"
            label="其他信息" :label-image="IMAGES.OTHER"
            type="click" @on-click="$router.push({ name: 'order-other-info' })" />
        </div>
      </form>
    </cube-scroll>

    <create-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormItem, FormTitle } from '@/components/Form'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../js/constant'

const IMAGES = {
  ACCEPT: require('../assets/accept.png'),
  BOX: require('../assets/box.png'),
  MONEY: require('../assets/money.png'),
  OTHER: require('../assets/other.png'),
  SEND: require('../assets/send.png')
}

export default {
  name: 'order-create',
  components: { FormItem, FormTitle, CreateFooter },
  data () {
    return {
      IMAGES
    }
  },
  computed: {
    ...mapGetters([
      'orderInfo'
    ])
  },
  methods: {
    showPicker (type) {
      let data
      if (type === 'settlementType') data = [ SETTLEMENT_TYPE ]
      if (type === 'pickupType') data = [ PICKUP_TYPE ]

      this.$createPicker({
        data,
        onSelect: (valueArr, selectedIndex, textArr) => {
          this.orderInfo[type] = textArr[0]
        }
      }).show()
    },

    chooseUserInfo (type) {
      console.log(type)
    },

    chooseChargeRule () {
      this.$router.push({ name: 'order-charge-rule' })
    },

    editAddress () {
      this.$router.push({ name: 'order-edit-address' })
    }
  }

}
</script>

<style lang="stylus" scoped>
  .scroll-box
    height calc(100vh - 88px)

  .form
    margin-bottom 15px

    &-section
      margin-top 15px
      &:first-child
        margin-top 10px
</style>

<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>

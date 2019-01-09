<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form class="form">
        <div class="form-section">
          <form-title title="发货方信息" :image="IMAGES.SEND" />
          <form-item
            v-model="form.consignerCompany" required
            label="客户名称"
            clickIcon="icon-ico_custerm"
            @on-icon-click="chooseUserInfo('send')" />
          <form-item
            v-model="form.consignerName" required
            label="发货人" />
          <form-item
            v-model="form.consignerPhone" required
            label="联系号码"
            type="number" maxlength="11" />
          <form-item
            v-model="form.consignerCity"
            label="发货城市"
            placeholder="请选择省/市/区"
            type="click" :showArrow="false" />
          <form-item
            v-model="form.consignerAddress" required
            label="详细地址" />
          <form-item
            v-model="form.extraData" prop="extraData"
            label="客户单号及其他"
            type="click" />
        </div>

        <div class="form-section">
          <form-title title="收货方信息" :image="IMAGES.ACCEPT" />
          <form-item
            v-model="form.consigneeName" required
            label="收货人" clickIcon="icon-ico_custerm"
            @on-icon-click="chooseUserInfo('accept')" />
          <form-item
            v-model="form.consigneePhone" required
            label="联系号码"
            type="number" maxlength="11" />
          <form-item
            v-model="form.consigneeCity"
            label="收货城市"
            placeholder="请选择省/市/区"
            type="click" />
          <form-item
            v-model="form.consigneeAddress" required
            label="详细地址" />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.cargoInfo" required
            label="货物信息" :labelImage="IMAGES.BOX"
            type="click"
            placeholder="请输入" />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.settlementType" required
            type="click"
            label="结算方式"
            @on-click="showActionSheet('settlementType')" />
          <form-item
            v-model="form.pickupType" required
            type="click"
            label="提货方式"
            @on-click="showActionSheet('pickupType')" />
          <form-item
            v-model="form.receiptNumber" required
            type="number"
            label="回单数量(份)" />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.distance"
            type="number"
            label="计费里程(公里)" />
          <form-item
            v-model="form.transportFee"
            type="number"
            label="运输费用(元)"
            clickIcon="icon-ico_rule" />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.extraFee"
            label="其他费用" :labelImage="IMAGES.MONEY"
            type="click" />
          <form-item
            v-model="form.extraInfo"
            label="其他信息" :labelImage="IMAGES.OTHER"
            type="click" />
        </div>
      </form>
    </cube-scroll>

    <create-footer />
  </div>
</template>

<script>
import CreateFooter from '../components/CreateFooter'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../js/constant'

const IMAGES = {
  ACCEPT: require('../assets/accept.png'),
  BOX: require('../assets/box.png'),
  MONEY: require('../assets/money.png'),
  OTHER: require('../assets/other.png'),
  SEND: require('../assets/send.png')
}

export default {
  name: 'create-order',
  components: { CreateFooter },
  data () {
    return {
      IMAGES,
      form: {
        consignerCompany: '',
        consignerName: '',
        consignerPhone: '',
        consignerCity: '',
        consignerAddress: '',
        extraData: '',

        consigneeName: '',
        consigneePhone: '',
        consigneeCity: '',
        consigneeAddress: '',

        cargoInfo: '',

        settlementType: '',
        pickupType: '',
        receiptNumber: '',

        distance: '',
        transportFee: '',

        extraFee: '',
        extraInfo: ''

      },
    }
  },
  methods: {
    showActionSheet (type) {
      let data
      if (type === 'settlementType') data = [ SETTLEMENT_TYPE ]
      if (type === 'pickupType') data = [ PICKUP_TYPE ]

      this.$createPicker({
        data,
        onSelect: (valueArr, selectedIndex, textArr) => {
          this.form[type] = textArr[0]
        }
      }).show()
    },

    chooseUserInfo (type) {
      console.log(type)
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
</style>

<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>




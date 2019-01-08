<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group class="form" :data="form">
        <div class="form-section">
          <form-title title="发货方信息" icon="1" />
          <form-item
            v-model="form.consignerCompany"
            label="客户名称"
            clickIcon="icon-ico_custerm" required />
          <form-item
            v-model="form.consignerName"
            label="发货人" required />
          <form-item
            v-model="form.consignerPhone"
            label="联系号码" required
            type="telephone" maxlength="11" />
          <form-item
            v-model="form.consignerCity"
            label="发货地"
            type="click" :showArrow="false" />
          <form-item
            v-model="form.consignerAddress"
            label="详细地址" required />
          <form-item
            v-model="form.consignerName"
            label="客户单号及其他"
            type="click" />
        </div>

        <div class="form-section">
          <form-title title="收货方信息" icon="1" />
          <form-item
            v-model="form.consigneeName"
            label="收货人" required clickIcon="ico" />
          <form-item
            v-model="form.consigneePhone"
            label="联系号码" required
            type="telephone" maxlength="11" />
          <form-item
            v-model="form.consigneeCity"
            label="收货地"
            type="click" />
          <form-item
            v-model="form.consigneeAddress"
            label="详细地址" required />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.cargoInfo"
            label="货物信息" labelIcon="ico"
            type="click"
            placeholder="请输入" required />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.settlementType"
            type="click"
            label="结算方式" required
            @on-click="showActionSheet('settlementType')" />
          <form-item
            v-model="form.pickupType"
            type="click"
            label="提货方式" required
            @on-click="showActionSheet('pickupType')" />
          <form-item
            v-model="form.receiptNumber"
            type="number"
            label="回单数量(份)" required />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.distance"
            type="number"
            label="计费里程(公里)" />
          <form-item
            v-model="form.transportFee"
            type="money"
            label="运输费用(元)"
            clickIcon="ioc" />
        </div>

        <div class="form-section">
          <form-item
            v-model="form.extraFee"
            label="其他费用" labelIcon="ico"
            type="click" />
          <form-item
            v-model="form.extraInfo"
            label="其他信息" labelIcon="ico"
            type="click" />
        </div>
      </form-group>
    </cube-scroll>

    <create-footer />
  </div>
</template>

<script>
import CreateFooter from '../components/CreateFooter'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../js/constant'

export default {
  name: 'create-order',
  components: { CreateFooter },
  data () {
    return {
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

      }
    }
  },
  methods: {
    showActionSheet (type) {
      let data
      if (type === 'settlementType') data = SETTLEMENT_TYPE
      if (type === 'pickupType') data = PICKUP_TYPE

      this.$createActionSheet({
        data,
        onSelect: item => {
          this.form[type] = item.content
        }
      }).show()
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




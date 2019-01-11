<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group ref="$form" class="form" :rules="rules">
        <div class="form-section">
          <form-title
            title="发货方信息"
            :image="IMAGES.SEND" />
          <form-item
            v-model="orderInfo.consignerCompany"
            prop="consignerCompany"
            required
            label="客户名称"
            autofocus
            maxlength="11"
            click-icon="icon-ico_custerm"
            @on-icon-click="selectSender" />
          <form-item
            v-model="orderInfo.consignerName"
            required
            maxlength="15"
            label="发货人" />
          <form-item
            v-model="orderInfo.consignerPhone"
            required
            label="联系号码"
            type="number"
            maxlength="20" />
          <form-item
            v-model="orderInfo.consignerCity"
            label="发货城市"
            placeholder="请选择省/市/区"
            type="click"
            :show-arrow="false"
            @on-click="cityPickerType = 'send'" />
          <form-item
            v-model="orderInfo.consignerAddress"
            required
            label="详细地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @on-click="editAddress" />
          <form-item
            v-model="orderInfo.consumerInfo"
            label="客户单号及其他"
            type="click"
            @on-click="$router.push({ name: 'order-consumer-info' })" />
        </div>

        <div class="form-section">
          <form-title
            title="收货方信息"
            :image="IMAGES.ACCEPT" />
          <form-item
            v-model="orderInfo.consigneeName"
            required
            label="收货人"
            maxlength="15"
            click-icon="icon-ico_custerm"
            @on-icon-click="chooseUserInfo('accept')" />
          <form-item
            v-model="orderInfo.consigneePhone"
            required
            label="联系号码"
            type="number"
            maxlength="20" />
          <form-item
            v-model="orderInfo.consigneeCity"
            label="收货城市"
            placeholder="请选择省/市/区"
            type="click"
            :show-arrow="false"
            @on-click="cityPickerType = 'accept'" />
          <form-item
            v-model="orderInfo.consigneeAddress"
            required
            ellipsis
            label="详细地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @on-click="editAddress" />
          <form-item
            v-model="orderInfo.consigneeCompany"
            label="收货人单位"
            maxlength="50" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.cargoInfo"
            required
            label="货物信息"
            :label-image="IMAGES.BOX"
            type="click"
            placeholder="请输入"
            @on-click="$router.push({ name: 'order-cargo-info' })" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.settlementType"
            required
            type="select"
            :options="settlementOptions"
            label="结算方式" />
          <form-item
            v-model="orderInfo.pickupType"
            required
            type="select"
            label="提货方式"
            :options="pickupOptions" />
          <form-item
            v-model="orderInfo.receiptNumber"
            required
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
            v-model="orderInfo.otherFee"
            label="其他费用"
            :label-image="IMAGES.MONEY"
            type="click"
            @on-click="$router.push({ name: 'order-fee-info' })" />
          <form-item
            v-model="orderInfo.otherInfo"
            label="其他信息"
            :label-image="IMAGES.OTHER"
            type="click"
            @on-click="$router.push({ name: 'order-other-info' })" />
        </div>
      </form-group>
    </cube-scroll>

    <create-footer
      @on-save-order="saveOrder"/>

    <city-picker
      v-model="showCityPicker"
      @confirm="pickCity"
      @input="cityPickerType = ''" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import CityPicker from '@/components/CityPicker'
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
  metaInfo: { title: '手工开单' },
  components: { FormGroup, FormItem, FormTitle, CreateFooter, CityPicker },
  data () {
    return {
      IMAGES,
      cityPickerType: '',
      settlementOptions: SETTLEMENT_TYPE,
      pickupOptions: PICKUP_TYPE,
      rules: {
        consignerCompany: {
          required: true,
          type: 'email',
          pattern: /didi.com$/,
          custom: (val) => {
            return val.length >= 12
          },
          messages: {
            pattern: 'The E-mail suffix need to be didi.com.',
            custom: 'The E-mail need contain at least 12 characters.'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('order', [ 'orderInfo' ]),
    ...mapGetters('contacts/consignee', [ 'saveConsigner' ]),

    showCityPicker: {
      get: function () { return !!this.cityPickerType },
      set: function () { this.cityPickerType = '' }
    }
  },
  methods: {
    pickCity (data) {
      const cityName = Array.from(new Set(data.map(item => item.name))).join('')
      if (this.cityPickerType === 'send') this.orderInfo.consignerCity = cityName
      else this.orderInfo.consigneeCity = cityName
      this.cityPickerType = ''
    },

    // 设置选择后的收货人信息
    setSender () {
      if (this.saveConsigner.company) {
        this.orderInfo.consignerCompany = this.saveConsigner.company
        this.orderInfo.consignerName = this.saveConsigner.contact
        this.orderInfo.consignerPhone = this.saveConsigner.phone
      }
    },

    chooseUserInfo () {
    },

    selectSender () {
      this.$router.push({
        name: 'select-shipper'
      })
    },

    chooseChargeRule () {
      this.$router.push({ name: 'order-charge-rule' })
    },

    editAddress () {
      this.$router.push({ name: 'order-edit-address' })
    },

    async saveOrder () {
      console.log(await this.$refs.$form.validate())
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setSender()
    })
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

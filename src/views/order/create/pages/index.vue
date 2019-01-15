<template>
  <div class="create-order-page">
    <cube-scroll class="scroll-box">
      <cube-button primary @click="$router.push({ name: 'order-often' })">常发订单</cube-button>
      <form-group ref="$form" class="form" :rules="rules">
        <div class="form-section">
          <form-title
            title="发货方信息"
            :image="IMAGES.SEND" />
          <form-item
            v-model="orderInfo.consignerName"
            prop="consignerName"
            required
            label="客户名称"
            autofocus
            maxlength="20"
            click-icon="icon-ico_custerm"
            @on-icon-click="selectSender" />
          <form-item
            v-model="orderInfo.consignerContact"
            prop="consignerContact"
            maxlength="15"
            label="发货人" />
          <form-item
            v-model="orderInfo.consignerPhone"
            prop="consignerPhone"
            label="联系号码"
            maxlength="20"
            @input="consignerPhoneInputHandler" />
          <form-item
            v-model="orderInfo.consignerAddress"
            prop="consignerAddress"
            label="发货地址"
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
            v-model="orderInfo.consigneeContact"
            prop="consigneeContact"
            label="收货人"
            maxlength="15"
            click-icon="icon-ico_custerm"
            @on-icon-click="chooseConsignee" />
          <form-item
            v-model="orderInfo.consigneePhone"
            prop="consigneePhone"
            label="联系号码"
            maxlength="20"
            @input="consigneePhoneInputHandler" />
          <form-item
            v-model="orderInfo.consigneeAddress"
            prop="consigneeAddress"
            ellipsis
            label="收货地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @on-click="editAddress" />
          <form-item
            v-model="orderInfo.consigneeCompanyName"
            label="收货人单位"
            maxlength="50" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.cargoInfo"
            prop="cargoInfo"
            label="货物信息"
            :label-image="IMAGES.BOX"
            type="click"
            placeholder="请输入"
            @on-click="$router.push({ name: 'order-cargo-info' })" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.settlementType"
            prop="settlementType"
            type="select"
            :options="settlementOptions"
            label="结算方式" />
          <form-item
            v-model="orderInfo.pickup"
            prop="pickup"
            type="select"
            label="提货方式"
            :options="pickupOptions" />
          <form-item
            v-model="orderInfo.receiptCount"
            prop="receiptCount"
            type="number"
            label="回单数量(份)" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.mileage"
            type="number"
            label="计费里程(公里)" />
          <form-item
            v-model="orderInfo.freightFee"
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../../js/constant'
import { validatePhone } from '@/views/contacts/consignee/modules/model'

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
  components: { FormGroup, FormItem, FormTitle, CreateFooter },
  data () {
    const phoneValidate = validatePhone
    const phoneMessage = { phoneValidate: '请输入正确的手机号或座机号' }

    return {
      IMAGES,
      settlementOptions: SETTLEMENT_TYPE,
      pickupOptions: PICKUP_TYPE,
      rules: {
        consignerName: {
          required: true,
          type: 'string'
        },
        consignerContact: { required: true, type: 'string' },
        consignerPhone: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        consignerAddress: { required: true, type: 'string' },
        consigneeContact: { required: true, type: 'string' },
        consigneePhone: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        consigneeAddress: { required: true, type: 'string' },
        cargoInfo: { required: true, type: 'string' },
        settlementType: { required: true, type: 'number' },
        pickup: { required: true, type: 'number' },
        receiptCount: { required: true, type: 'number' }
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'orderInfo' ]),
    ...mapState('contacts/consignee', [ 'saveConsigner' ])
  },
  methods: {
    // 设置选择后的收货人信息
    setSender () {
      if (this.saveConsigner.company) {
        this.orderInfo.consignerName = this.saveConsigner.company
        this.orderInfo.consignerContact = this.saveConsigner.contact
        this.orderInfo.consignerPhone = this.saveConsigner.phone
      }
    },

    chooseConsignee () {
      this.$router.push({ name: 'order-select-consignee' })
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

    // 联系电话格式化
    consignerPhoneInputHandler (phone) {
      this.phoneFormatter(phone, 'consignerPhone')
    },
    consigneePhoneInputHandler (phone) {
      this.phoneFormatter(phone, 'consigneePhone')
    },
    phoneFormatter (phone, field) {
      if (!phone || phone[0] !== '1') return
      phone = phone.trim().split(' ').join('')
      let phoneArr = []
      let phoneTemp = ''
      for (let i in phone) {
        i = Number(i)
        phoneTemp += phone[i]
        if (!phoneArr.length && i === 2) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        } else if (phoneTemp.length === 4) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        } else if (i === (phone.length - 1)) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        }
      }
      this.$nextTick(() => {
        this.orderInfo[field] = phoneArr.join(' ')
      })
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

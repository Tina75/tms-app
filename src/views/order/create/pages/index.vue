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
            @on-icon-click="selectConsigner" />
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
            v-model="orderInfo.consignerAddressText"
            prop="consignerAddressText"
            label="发货地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @on-click="editAddress('send')" />
          <form-item
            v-model="orderInfo.consumerInfo"
            label="客户单号及其他"
            type="click"
            ellipsis
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
            @on-icon-click="selectConsignee" />
          <form-item
            v-model="orderInfo.consigneePhone"
            prop="consigneePhone"
            label="联系号码"
            maxlength="20"
            @input="consigneePhoneInputHandler" />
          <form-item
            v-model="orderInfo.consigneeAddressText"
            prop="consigneeAddressText"
            ellipsis
            label="收货地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @on-click="editAddress('arrive')" />
          <form-item
            v-model="orderInfo.consigneeCompanyName"
            label="收货人单位"
            maxlength="50" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.orderCargoList"
            prop="orderCargoList"
            label="货物信息"
            :label-image="IMAGES.BOX"
            type="click"
            placeholder="请输入"
            ellipsis
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
            label="计费里程(公里)"
            precision="1" />
          <form-item
            v-model="orderInfo.freightFee"
            prop="freightFee"
            type="number"
            label="运输费用(元)"
            click-icon="icon-ico_rule"
            @on-icon-click="selectChargeRule" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.otherFee"
            label="其他费用"
            :label-image="IMAGES.MONEY"
            ellipsis
            type="click"
            @on-click="$router.push({ name: 'order-fee-info' })" />
          <form-item
            v-model="orderInfo.otherInfo"
            label="其他信息"
            :label-image="IMAGES.OTHER"
            ellipsis
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../../js/constant'
import NP from 'number-precision'
import getDistance from '../../js/getDistance'

const IMAGES = {
  ACCEPT: require('../assets/accept.png'),
  BOX: require('../assets/box.png'),
  MONEY: require('../assets/money.png'),
  OTHER: require('../assets/other.png'),
  SEND: require('../assets/send.png')
}

const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/

export default {
  name: 'order-create',
  metaInfo: { title: '手工开单' },
  components: { FormGroup, FormItem, FormTitle, CreateFooter },
  data () {
    const phoneValidate = val => {
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
    }
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
        consignerAddressText: { required: true, type: 'string' },
        consigneeContact: { required: true, type: 'string' },
        consigneePhone: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        consigneeAddressText: { required: true, type: 'string' },
        orderCargoList: { required: true, type: 'string' },
        settlementType: { required: true, type: 'number' },
        pickup: { required: true, type: 'number' },
        receiptCount: { required: true, type: 'number', min: 0 },
        freightFee: { type: 'number', min: 0 }
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'orderInfo', 'consumerInfo', 'orderCargoList', 'otherInfo' ]),
    ...mapState('contacts/consignee', [ 'saveConsigner' ])
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_ADDRESS_TYPE' ]),
    // 设置选择后的发货人信息
    setConsigner () {
      if (this.saveConsigner.company) {
        this.orderInfo.consignerName = this.saveConsigner.company
        this.orderInfo.consignerContact = this.saveConsigner.contact
        this.orderInfo.consignerPhone = this.saveConsigner.phone
      }
    },
    // 进入发货人列表
    selectConsigner () {
      this.$router.push({ name: 'select-shipper' })
    },
    // 设置选择后的收货人信息
    setConsignee () {},
    // 进入收货人列表
    selectConsignee () {
      this.$router.push({ name: 'order-select-consignee' })
    },
    // 进入计费规则列表
    selectChargeRule () {
      this.$router.push({ name: 'order-charge-rule' })
    },
    // 进入编辑地址页面
    editAddress (type) {
      this.SET_ADDRESS_TYPE(type)
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
    // 二级页面信息回显
    showConsumerInfo () {
      let infos = []
      if (this.consumerInfo.customerOrderNo) infos.push(this.consumerInfo.customerOrderNo)
      if (this.consumerInfo.customerWaybillNo) infos.push(this.consumerInfo.customerWaybillNo)
      if (this.consumerInfo.salesmanName) infos.push(this.consumerInfo.salesmanName)
      if (this.consumerInfo.deliveryTimeText) infos.push(this.consumerInfo.deliveryTimeText)
      if (this.consumerInfo.arriveTimeText) infos.push(this.consumerInfo.arriveTimeText)
      this.orderInfo.consumerInfo = infos.join('，')
    },
    showCargoList () {
      let infos = this.orderCargoList.map(item => item.cargoName)
      this.orderInfo.orderCargoList = infos.join('，')
    },
    showOtherInfo () {
      let infos = []
      if (this.otherInfo.isInvoice) infos.push(`开票税率${this.otherInfo.invoiceRate || 0}%`)
      if (this.otherInfo.collectionMoney) infos.push(NP.divide(this.otherInfo.collectionMoney, 100) + '元')
      if (this.otherInfo.remark) infos.push(this.otherInfo.remark)
      this.orderInfo.otherInfo = infos.join('，')
    },
    async calculateDistance () {
      console.log(111)
      if (this.orderInfo.consignerAddressLongitude &&
       this.orderInfo.consignerAddressLatitude &&
       this.orderInfo.consigneAddressLongitude &&
       this.orderInfo.consigneAddressLatitude) {
        const distance = await getDistance(
          { lng: this.orderInfo.consignerAddressLongitude, lat: this.orderInfo.consignerAddressLatitude },
          { lng: this.orderInfo.consigneeAddressLongitude, lat: this.orderInfo.consigneeAddressLatitude }
        )
        console.log(distance)
        if (distance) this.orderInfo.mileage = distance
      }
    },

    // 保存订单
    async saveOrder () {
      if (!(await this.$refs.$form.validate())) return
      //
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setConsigner()
      vm.setConsignee()
      vm.showConsumerInfo()
      vm.showCargoList()
      vm.showOtherInfo()
      vm.calculateDistance()
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

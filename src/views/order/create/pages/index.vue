<template>
  <div class="create-order-page">
    <cube-scroll class="scroll-box">
      <cube-button primary @click="$router.push({ name: 'order-often' })">常发订单</cube-button>
      <form-group ref="$form" class="form" v-model="orderInfo" :rules="rules">
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
            @on-icon-click="gotoConsignerPage" />
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
            @click.native="gotoAddressInfoPage('send')" />
          <form-item
            v-model="orderInfo.consumerInfo"
            label="客户单号及其他"
            type="click"
            ellipsis
            @click.native="gotoConsumerInfoPage" />
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
            @on-icon-click="gotoConsigneePage" />
          <form-item
            v-model="orderInfo.consigneePhone"
            prop="consigneePhone"
            label="联系号码"
            maxlength="20"
            @input="consigneePhoneInputHandler" />
          <form-item
            v-model="orderInfo.consigneeAddressText"
            prop="consigneeAddressText"
            label="收货地址"
            placeholder="请输入"
            :show-arrow="false"
            type="click"
            @click.native="gotoAddressInfoPage('arrive')" />
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
            @click.native="gotoCargoInfoPage" />
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
            @on-icon-click="gotoChargeRulePage" />
        </div>

        <div class="form-section">
          <form-item
            v-model="orderInfo.otherFee"
            label="其他费用"
            :label-image="IMAGES.MONEY"
            ellipsis
            type="click"
            @click.native="gotoFeeInfoPage" />
          <form-item
            v-model="orderInfo.otherInfo"
            label="其他信息"
            :label-image="IMAGES.OTHER"
            ellipsis
            type="click"
            @click.native="gotoOtherInfoPage" />
        </div>
      </form-group>
    </cube-scroll>

    <create-footer
      @on-save-order="saveOrder"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../../js/constant'
import NP from 'number-precision'
import { getDistance } from '@/libs/util'

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
      loading: false,
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
    orderInfo: {
      get: mapGetters('order/create', [ 'orderInfo' ]).orderInfo,
      set: function (val) { this.SET_ORDER_INFO(val) }
    },
    ...mapGetters('order/create', [
      'consumerInfo', // 客户单号及其他
      'orderCargoList', // 货物信息
      'feeInfo', // 费用信息
      'otherInfo', // 其他信息
      'addressChanged',
      'consigneeInfo',
      'calculatedAmount'
    ]),
    ...mapState('contacts/consignee', [ 'saveConsigner' ])
  },
  methods: {
    ...mapMutations('order/create', [
      'SET_ORDER_INFO',
      'SET_CONSUMER_INFO',
      'SET_OTHER_INFO',
      'SET_ADDRESS_TYPE',
      'SET_CONSIGNEE_INFO',
      'TRIGGER_ADDRESS_CHANGE',
      'CLEAR_CALCULATED_AMOUNT'
    ]),
    ...mapActions('order/create', [ 'getOpetator', 'createOrder' ]),

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
    },

    // 设置选择后的发货人信息
    async setConsigner () {
      if (this.saveConsigner.id) {
        const info = this.orderInfo
        const consigner = this.saveConsigner
        info.consignerName = consigner.name || ''
        info.consignerContact = consigner.contact || ''
        info.consignerPhone = consigner.phone || ''
        info.consignerHourseNumber = consigner.consignerHourseNumber || ''
        info.settlementType = consigner.payType || ''
        info.pickup = consigner.pickUp || ''
        this.SET_OTHER_INFO({
          isInvoice: consigner.isInvoice || 0,
          invoiceRate: consigner.invoiceRate === null ? '' : consigner.invoiceRate,
          remark: consigner.remark
        })
        this.showOtherInfo()
        if (consigner.salesmanId) {
          const sales = await this.getOpetator()
          for (let i = 0; i < sales.length; i++) {
            if (sales[i].id === consigner.salesmanId) {
              this.SET_CONSUMER_INFO({
                salesmanId: consigner.salesmanId,
                salesmanName: sales[i].name
              })
              break
            }
          }
          this.showConsumerInfo()
        }
      }
    },
    // 设置选择后的收货人信息
    setConsignee () {
      if (!this.consigneeInfo) return
      const info = this.orderInfo
      const consignee = this.consigneeInfo.data
      info.consigneeContact = consignee.contact || ''
      info.consigneePhone = consignee.phone || ''
      info.consigneeCompanyName = consignee.consigneeCompanyName || ''
      info.end = consignee.cityCode || ''
      info.consigneeAddress = consignee.address || ''
      info.consignerHourseNumber = consignee.consignerHourseNumber || ''
      info.consigneeAddressLongitude = consignee.longitude || ''
      info.consigneeAddressLatitude = consignee.latitude || ''
      info.consigneeAddressText = info.consigneeAddress + info.consignerHourseNumber
      this.SET_CONSIGNEE_INFO(null)
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
      if (this.otherInfo.isInvoice) infos.push(`开票税率${NP.times(this.otherInfo.invoiceRate, 100) || 0}%`)
      if (this.otherInfo.collectionMoney) infos.push(NP.divide(this.otherInfo.collectionMoney, 100) + '元')
      if (this.otherInfo.remark) infos.push(this.otherInfo.remark)
      this.orderInfo.otherInfo = infos.join('，')
    },
    async calculateDistance () {
      if (this.addressChanged &&
       this.orderInfo.consignerAddressLongitude &&
       this.orderInfo.consignerAddressLatitude &&
       this.orderInfo.consigneeAddressLongitude &&
       this.orderInfo.consigneeAddressLatitude) {
        this.TRIGGER_ADDRESS_CHANGE(false)
        const distance = await getDistance(
          { lng: this.orderInfo.consignerAddressLongitude, lat: this.orderInfo.consignerAddressLatitude },
          { lng: this.orderInfo.consigneeAddressLongitude, lat: this.orderInfo.consigneeAddressLatitude }
        )
        if (distance) this.orderInfo.mileage = NP.divide(distance, 1000)
      }
    },
    showFreightFee () {
      if (!this.calculatedAmount) return
      this.orderInfo.freightFee = this.calculatedAmount || ''
      this.CLEAR_CALCULATED_AMOUNT()
    },
    
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
        await this.createOrder(data)
        window.toast('保存成功')
        setTimeout(() => { window.location.reload }, 2000)
      } catch (err) {
        //
      } finally {
        this.loading = false
        window.loading(false)
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setConsigner()
      vm.setConsignee()
      vm.showConsumerInfo()
      vm.showCargoList()
      vm.showOtherInfo()
      vm.showFreightFee()
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

<template>
  <div class="create-order-page">
    <cube-scroll class="scroll-box">
      <!-- <cube-button primary @click="$router.push({ name: 'order-often' })">常发订单</cube-button> -->
      <form-group
        ref="$form"
        v-model="orderInfo"
        class="form"
        :rules="rules">
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
            v-if="orderConfig.consigneeCompanyNameOption"
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
            v-if="orderConfig.mileageOption"
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
      @on-save-order="submitOrderInfo"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CreateFooter from '../components/CreateFooter'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import { SETTLEMENT_TYPE, PICKUP_TYPE } from '../../js/constant'
import mapMethods from '../js/createMapMethods'
import gotoOtherPages from '../js/createGotoOtherPage'
import showData from '../js/createShowData'
import orderSubmit from '../js/createSubmit'
import createInit from '../js/createInit'
import { clearAppTitleBtn } from '@/libs/bridgeUtil'

const IMAGES = {
  ACCEPT: require('../assets/accept.png'),
  BOX: require('../assets/box.png'),
  MONEY: require('../assets/money.png'),
  OTHER: require('../assets/other.png'),
  SEND: require('../assets/send.png')
}

const VALIDATE_PHONE = /^1[0-9]{10}$/
const VALIDATE_TEL = /^[(（）)\-02-9][(（）)\-0-9]{1,19}$/
const NO_RESET_PAGE = [
  'order-charge-rule', // 计费规则
  'order-cargo-info', // 货物信息
  'order-edit-address', // 编辑地址
  'order-fee-info', // 其他费用
  'order-consumer-info', // 客户信息
  'order-other-info', // 其他信息
  'order-select-consigner', // 选择发货人
  'order-select-consignee', // 选择收货人
  'pickup-assign', // 提货发运
  'delivery-send-car' // 送货发运
]

export default {
  name: 'order-create',
  metaInfo () {
    return {
      title: this.$route.meta.title
    }
  },
  components: { FormGroup, FormItem, FormTitle, CreateFooter },
  data () {
    const phoneValidate = val => {
      val = val.replace(/\s/g, '')
      return VALIDATE_PHONE.test(val) || VALIDATE_TEL.test(val)
    }
    const phoneMessage = { phoneValidate: '请输入正确的手机号或座机号' }

    return {
      IMAGES,
      mode: '',
      id: '',
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
      set: function (val) {
        this.saveConsignerInfo()
        this.RESET_ORDER(val)
      }
    },
    ...mapGetters('order/create', [
      'consignerId',
      'consumerInfo', // 客户单号及其他
      'orderCargoList', // 货物信息
      'feeInfo', // 费用信息
      'otherInfo', // 其他信息
      'addressChanged',
      'consigneeInfo',
      'calculatedAmount',
      'orderConfig',
      'orderNeedReset',
      'oftenPermission'
    ]),
    ...mapState('contacts/consignee', [
      'saveConsigner'
    ])
  },
  methods: {
    ...mapMethods,
    ...gotoOtherPages,
    ...showData,
    ...orderSubmit,
    ...createInit
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.mode = vm.$route.meta.mode
      vm.id = vm.$route.params.id
      vm.$nextTick(async () => {
        vm.setTitleButtons()

        const fromPage = from.name
        if (NO_RESET_PAGE.indexOf(fromPage) === -1 || vm.orderNeedReset) vm.$refs.$form.reset()
        // 发运页面返回的情况不查询订单数据
        if (fromPage !== 'pickup-assign' && fromPage !== 'delivery-send-car') {
          await vm.orderInfoInit()
        }
        await vm.setConsigner()
        vm.setConsignee()
        vm.showConsumerInfo()
        vm.showCargoList()
        vm.showOtherInfo()
        vm.showFreightFee()
        vm.calculateDistance()
      })
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

<template>
  <div class="create-order-page">
    <cube-scroll ref="$scroll" class="scroll-box">
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
            maxlength="20"
            click-icon="icon-ico_custerm"
            @on-icon-click="gotoConsignerPage"
            @on-focus="inputFocus" />
          <form-item
            v-model="orderInfo.consignerContact"
            prop="consignerContact"
            maxlength="15"
            label="发货人"
            @on-focus="inputFocus" />
          <form-item
            v-model="orderInfo.consignerPhone"
            prop="consignerPhone"
            label="联系号码"
            maxlength="20"
            type="phone"
            @on-focus="inputFocus" />
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
            label="客户订单号及其他"
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
            @on-icon-click="gotoConsigneePage"
            @on-focus="inputFocus" />
          <form-item
            v-model="orderInfo.consigneePhone"
            prop="consigneePhone"
            label="联系号码"
            maxlength="20"
            type="phone"
            @on-focus="inputFocus" />
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
            maxlength="50"
            @on-focus="inputFocus" />
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
            :disabled="pickupDisabled"
            :options="pickupOptions" />
          <form-item
            v-model="orderInfo.receiptCount"
            prop="receiptCount"
            type="number"
            label="回单数量(份)"
            @on-focus="inputFocus" />
        </div>

        <div class="form-section">
          <form-item
            v-if="orderConfig.mileageOption"
            v-model="orderInfo.mileage"
            type="number"
            label="计费里程(公里)"
            precision="1"
            @on-focus="inputFocus" />
          <form-item
            v-model="orderInfo.freightFee"
            prop="freightFee"
            type="number"
            label="运输费用(元)"
            precision="4"
            click-icon="icon-ico_rule"
            @on-icon-click="gotoChargeRulePage"
            @on-focus="inputFocus" />
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
import { SETTLEMENT_TYPE, PICKUP_TYPE, MODULE_NAME } from '../../js/constant'
import { phone as phoneValidator, money as moneyValidator } from '../../js/validator'
import createInit from '../js/createInit' // 初始化
import mapMethods from '../js/createMapMethods' // store methods
import gotoOtherPages from '../js/createGotoOtherPage' // 路由跳转处理
import showData from '../js/createShowData' // 数据回显
import orderSubmit from '../js/createSubmit' // 数据提交
import inputAutoPosition from '../js/inputAutoPosition' // 输入框位置自动调节

const IMAGES = {
  ACCEPT: require('../assets/accept.png'),
  BOX: require('../assets/box.png'),
  MONEY: require('../assets/money.png'),
  OTHER: require('../assets/other.png'),
  SEND: require('../assets/send.png')
}

// 不需要重置表单的from route name
const NO_RESET_PAGES = [
  'order-charge-rule', // 计费规则
  'order-cargo-info', // 货物信息
  'order-edit-address', // 编辑地址
  'order-fee-info', // 其他费用
  'order-consumer-info', // 客户信息
  'order-other-info', // 其他信息
  'order-select-consigner', // 选择发货人
  'order-select-consignee', // 选择收货人
  'pickup-assign', // 提货发运
  'delivery-send-car', // 送货发运,
  'order-often' // 常发订单
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
    return {
      IMAGES,
      id: '',
      mode: '',
      loading: false,
      editOrderHasInit: false, // 编辑的订单是否已经初始化，进编辑时有效
      settlementOptions: SETTLEMENT_TYPE,
      pickupOptions: PICKUP_TYPE,
      pickupDisabled: false,
      rules: {
        consignerName: { required: true, type: 'string' },
        consignerContact: { required: true, type: 'string' },
        consignerPhone: { required: true, type: 'string', ...phoneValidator },
        consignerAddressText: { required: true, type: 'string' },
        consigneeContact: { required: true, type: 'string' },
        consigneePhone: { required: true, type: 'string', ...phoneValidator },
        consigneeAddressText: { required: true, type: 'string' },
        orderCargoList: { required: true, type: 'string' },
        settlementType: { required: true, type: 'number' },
        pickup: { required: true, type: 'number' },
        receiptCount: { required: true, type: 'number', min: 0 },
        freightFee: { type: 'number', min: 0, ...moneyValidator }
      }
    }
  },
  computed: {
    ...mapGetters(MODULE_NAME.ORDER_CREATE, [
      'oneMoreId',
      'consignerId',
      'consigneeInfo',
      'addressChanged',
      'consumerInfo',
      'orderCargoList',
      'feeInfo',
      'otherInfo',
      'calculatedAmount',
      'orderConfig',
      'orderNeedReset',
      'oftenPermission'
    ]),
    ...mapState(MODULE_NAME.CONTACTS_CONSIGNEE, [ 'saveConsigner' ]),
    orderInfo: {
      get: mapGetters(MODULE_NAME.ORDER_CREATE, [ 'orderInfo' ]).orderInfo,
      set: function () {
        this.saveConsignerInfo()
        this.RESET_ORDER()
      }
    },
  },
  methods: {
    ...createInit,
    ...mapMethods,
    ...gotoOtherPages,
    ...showData,
    ...orderSubmit,
    ...inputAutoPosition
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      const fromPage = from.name

      vm.id = vm.$route.params.id
      vm.mode = vm.$route.meta.mode
      vm.setTitleButtons()
      vm.$nextTick(async () => {
        // 非指定页面或需要重置表单时重置表单
        if (NO_RESET_PAGES.indexOf(fromPage) === -1 || vm.orderNeedReset) {
          vm.$refs.$form.reset()
        }
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
        // 回显数据完成后刷新scroll组件
        vm.$nextTick(() => { vm.$refs.$scroll.refresh() })
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .scroll-box
    height calc(100vh - 88px)

  .form
    margin-bottom 50px

    &-section
      margin-top 15px
      &:first-child
        margin-top 10px
</style>

<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>

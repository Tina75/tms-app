<template>
  <div class="upstream-detail">
    <cube-scroll-nav>
      <StatusBar slot="prepend" :status="detail.acceptStatus" :time="detail.updateTime"/>
      <cube-scroll-nav-panel label="基本信息">
        <Panel title="基本信息">
          <FormItem v-if="detail.orderNo" label="订单号">
            {{detail.orderNo}}
          </FormItem>
          <FormItem v-if="detail.shipperCompanyName" label="客户名称">
            {{detail.shipperCompanyName}}
          </FormItem>
          <FormItem v-if="detail.customerOrderNo" label="客户订单号">
            {{detail.customerOrderNo}}
            <span
              slot="right"
              v-clipboard:copy="detail.customerOrderNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem v-if="detail.waybillNo" label="客户运单号">
            {{detail.waybillNo}}
            <span
              v-if="detail.waybillNo"
              slot="right"
              v-clipboard:copy="detail.waybillNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem v-if="detail.deliveryTime" label="发货时间">
            {{detail.deliveryTime | datetimeFormat}}
          </FormItem>
          <FormItem v-if="detail.arriveTime" label="到货时间">
            {{detail.arriveTime | datetimeFormat}}
          </FormItem>
          <FormItem label="提货方式">
            {{detail.pickTypeDesc}}
          </FormItem>
          <FormItem v-if="detail.receiptCount" label="回单数量">
            {{detail.receiptCount}}份
          </FormItem>
          <FormItem v-if="detail.collectionMoney" label="代收货款">
            {{detail.collectionMoney | money}}元
          </FormItem>
          <FormItem v-if="detail.handlerUserName" label="对接业务员">
            {{detail.handlerUserName}}
          </FormItem>
          <FormItem v-if="detail.isInvoice" label="是否开票">
            {{detail.isInvoice == 1 ? `是（${detail.invoiceRate | rate}%）` : '否'}}
          </FormItem>
          <FormItem v-if="detail.remark" label="备注">
            {{detail.remark}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="收发货人">
        <Panel title="发货人">
          <FormItem v-if="detail.consignerContact" label="联系人">
            {{detail.consignerContact}}
          </FormItem>
          <FormItem v-if="detail.consignerPhone" label="联系方式">
            {{detail.consignerPhone}}
            <a slot="right" :href="`tel:${detail.consignerPhone}`" class="act-btn">联系TA<i class="iconfont icon-ico_call"/></a>
          </FormItem>
          <FormItem v-if="detail.consignerAddress" label="发货地址">
            {{detail.consignerAddress}}
          </FormItem>
        </Panel>
        <Panel title="收货人">
          <FormItem v-if="detail.consigneeContact" label="联系人">
            {{detail.consigneeContact}}
          </FormItem>
          <FormItem v-if="detail.consigneePhone" label="联系方式">
            {{detail.consigneePhone}}
            <a slot="right" :href="`tel:${detail.consigneePhone}`" class="act-btn">联系TA<i class="iconfont icon-ico_call"/></a>
          </FormItem>
          <FormItem v-if="detail.consigneeAddress" label="收货地址">
            {{detail.consigneeAddress}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="货物明细">
        <Panel title="货物明细">
          <Cargo v-for="(item, index) in detail.cargoInfos" :key="index" :data="item"/>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="应收费用">
        <Panel title="应收费用">
          <FormItem v-if="detail.mileage" label="计费里程">
            {{detail.mileage | mile}}公里
          </FormItem>
          <FormItem v-if="detail.freightFee" label="运输费用">
            {{detail.freightFee | money}}元
          </FormItem>
          <FormItem v-if="detail.loadFee" label="装货费用">
            {{detail.loadFee | money}}元
          </FormItem>
          <FormItem v-if="detail.unloadFee" label="卸货费用">
            {{detail.unloadFee | money}}元
          </FormItem>
          <FormItem v-if="detail.otherFee" label="其他费用">
            {{detail.otherFee | money}}元
          </FormItem>
          <div class="total-fee">
            合计<span>{{detail.totalFee | money}}元</span> <label>{{detail.settlementTypeDesc}}</label>
          </div>
        </Panel>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div v-if="orderStatus(detail.acceptStatus) === '待接收'" class="upstream-footer">
      <cube-button class="footer-item-btn" @click="refuse">拒绝</cube-button>
      <cube-button class="footer-item-btn footer-item-primary" @click="receipt">接收</cube-button>
    </div>
  </div>
</template>
<script>
import Panel from '../components/Panel'
import FormItem from '../components/FormItem'
import StatusBar from '../components/StatusBar'
import Cargo from '../components/Cargo'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
import { getRate, getMoney, getMile, orderStatus } from '../libs'
import * as API from '../libs/api'
import { mapActions } from 'vuex'
Vue.use(VueClipboard)

export default {
  name: 'upstream-detail',
  metaInfo: {
    title: '上游来单详情'
  },
  filters: {
    rate: getRate,
    money: getMoney,
    mile: getMile
  },
  components: {
    Panel,
    FormItem,
    StatusBar,
    Cargo
  },
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initDetail()
    })
  },
  methods: {
    ...mapActions(['reFresh']),
    initDetail () {
      API.initDetail(this.id).then(response => {
        this.detail = response.data.data
      })
    },
    refuse () {
      this.$createDialog({
        type: 'confirm',
        title: '确认拒绝订单?',
        onConfirm: () => {
          API.refuse(this.id).then(response => {
            this.reFresh({ key: 'waitAccept' })
            window.toast('拒绝成功')
            this.initDetail()
          })
        }
      }).show()
    },
    receipt () {
      API.receipt(this.id).then(response => {
        this.reFresh({ key: 'waitAccept' })
        window.toast('接收成功')
        this.initDetail()
      })
    },
    copyBtn (e) {
      window.toast('复制成功')
    },
    onError (e) {
      window.toast('复制失败')
    },
    orderStatus (val) {
      return orderStatus(val)
    }
  }
}
</script>
<style lang="stylus" scoped>
.upstream-detail
  height 100%
.upstream-footer
  display flex
  width 100%
  position fixed
  bottom 0
  left 0
  right 0
  z-index 10
  .footer-item-btn
    flex 1
    background #27c4d3
    border-radius 0
  .footer-item-primary
    background #189cb2
.act-btn
  display inline-block
  color #00A4BD
  margin-left 10px
  padding-left 10px
  border-left 1px solid #f3f5f9
.total-fee
  float right
  margin-right 15px
  margin-bottom 15px
  span
    color #FA8C16
    font-size 20px
    margin 0 10px
  label
    color #666
</style>
<style lang="stylus">
.upstream-detail
  .cube-scroll-nav-panels
      padding-bottom 40px
  .cube-scroll-nav-panel
    .cube-sticky-ele
      height 0
      visibility hidden
</style>

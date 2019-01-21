<template>
  <div class="upstream-detail">
    <cube-scroll-nav>
      <StatusBar slot="prepend" :status="detail.acceptStatus" :time="detail.createTime"/>
      <cube-scroll-nav-panel label="基本信息">
        <Panel title="基本信息">
          <FormItem label="客户名称">
            {{detail.shipperCompanyName}}
          </FormItem>
          <FormItem label="客户订单号">
            {{detail.customerOrderNo}}
            <span
              v-if="detail.customerOrderNo"
              slot="right"
              v-clipboard:copy="detail.customerOrderNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem label="客户运单号">
            {{detail.waybillNo}}
            <span
              v-if="detail.waybillNo"
              slot="right"
              v-clipboard:copy="detail.waybillNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem label="发货时间">
            {{detail.deliveryTime | datetimeFormat}}
          </FormItem>
          <FormItem label="到货时间">
            {{detail.arriveTime | datetimeFormat}}
          </FormItem>
          <FormItem label="提货方式">
            {{detail.pickTypeDesc}}
          </FormItem>
          <FormItem label="回单数量">
            {{detail.receiptCount}}份
          </FormItem>
          <FormItem label="代收货款">
            {{detail.collectionMoney | money}}元
          </FormItem>
          <FormItem label="对接业务员">
            {{detail.handlerUserName}}
          </FormItem>
          <FormItem label="是否开票">
            {{detail.isInvoice == 1 ? `是（${detail.invoiceRate | rate}%）` : '否'}}
          </FormItem>
          <FormItem label="备注">
            {{detail.remark}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="发货人">
        <Panel title="发货人">
          <FormItem label="联系人">
            {{detail.consignerContact}}
          </FormItem>
          <FormItem label="联系方式">
            {{detail.consignerPhone}}
            <a slot="right" :href="`tel:${detail.consignerPhone}`" class="act-btn">联系TA</a>
          </FormItem>
          <FormItem label="发货地址">
            {{detail.consignerAddress}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="收货人">
        <Panel title="收货人">
          <FormItem label="联系人">
            {{detail.consigneeContact}}
          </FormItem>
          <FormItem label="联系方式">
            {{detail.consigneePhone}}
            <a slot="right" :href="`tel:${detail.consigneePhone}`" class="act-btn">联系TA</a>
          </FormItem>
          <FormItem label="收货地址">
            {{detail.consigneeAddress}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="货物明细">
        <Panel title="货物明细">
          <Cargo v-for="(item, index) in detail.cargoInfos" :key="index" :data="item"/>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="应付费用">
        <Panel title="应付费用">
          <FormItem label="计费里程">
            {{detail.mileage | mile}}公里
          </FormItem>
          <FormItem label="运输费用">
            {{detail.freightFee | money}}元
          </FormItem>
          <FormItem label="装货费用">
            {{detail.loadFee | money}}元
          </FormItem>
          <FormItem label="卸货费用">
            {{detail.unloadFee | money}}元
          </FormItem>
          <FormItem label="其他费用">
            {{detail.otherFee | money}}元
          </FormItem>
          <div class="total-fee">
            合计<span>{{detail.totalFee | money}}元</span> {{detail.settlementTypeDesc}}
          </div>
        </Panel>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div v-if="orderStatus(detail.acceptStatus) === '待接收'" class="upstream-footer">
      <cube-button class="footer-item-btn" @click="refuse">拒绝</cube-button>
      <cube-button class="footer-item-btn footer-item-primary" @click="receipt">接受</cube-button>
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
Vue.use(VueClipboard)

export default {
  name: 'upstream-detail',
  metaInfo: {
    title: '订单详情'
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
    initDetail () {
      API.initDetail(this.id).then(response => {
        this.detail = response.data.data
      })
    },
    refuse () {
      API.refuse(this.id).then(response => {
        this.initDetail()
      })
    },
    receipt () {
      API.receipt(this.id).then(response => {
        this.initDetail()
      })
    },
    copyBtn (e) {
      alert('复制成功')
    },
    onError (e) {
      alert('复制失败，请使用Ctrl-C手动复制')
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

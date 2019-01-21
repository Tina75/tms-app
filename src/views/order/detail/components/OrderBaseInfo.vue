<template>
  <detail-panel :title="'基本信息'">
    <detail-panel-item v-if="Detail.consignerName" :label="'客户名称'">
      <p>{{Detail.consignerName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.customerOrderNo" :label="'客户订单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{Detail.customerOrderNo}}</span>
        <a v-clipboard:copy="Detail.customerOrderNo" v-clipboard:success="copySuccess">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.waybillNo" :label="'客户运单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{Detail.waybillNo}}</span>
        <a v-clipboard:copy="Detail.waybillNo" v-clipboard:success="copySuccess">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.startName" :label="'始发地'">
      <p>{{Detail.startName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.endName" :label="'目的地'">
      <p>{{Detail.endName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.deliveryTime" :label="'发货时间'">
      <p>{{Detail.deliveryTime | datetimeFormat}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.arriveTime" :label="'到货时间'">
      <p>{{Detail.arriveTime | datetimeFormat}}</p>
    </detail-panel-item>
    <detail-panel-item  :label="'提货方式'">
      <p>{{Detail.pickup==1?'小车上门提货':'大车直接送货'}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.receiptCount" :label="'回单数量'">
      <p>{{Detail.receiptCount}}份</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.collectionMoney" :label="'代收货款'">
      <p>{{Detail.collectionMoney | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.invoiceAmount" :label="'开票税额'">
      <p>{{Detail.invoiceAmount | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.salesmanName" :label="'责任业务员'">
      <p>{{Detail.salesmanName}}</p>
    </detail-panel-item>
    <detail-panel-item  :label="'是否开票'">
      <p>{{Detail.isInvoice?'是':'否'}}<span v-if="Detail.isInvoice">({{Detail.invoiceRate}}%)</span></p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.remark" :label="'备注'">
      <p class="remark">{{Detail.remark}}</p>
    </detail-panel-item>
  </detail-panel>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  name: 'order-base-info',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('order/detail', ['Detail']),
    options () {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  methods: {
    copySuccess() { window.toast('复制成功') }
  }
}
</script>
<style scoped lang="stylus">
  .remix-content
    display: flex
    span
      flex 1
      text-align: right
      padding-right: 10px;
    a
      padding-left: 10px;
      color: #00a4bd;
  .remark
    max-width 240px
    text-align: left
    float: right
</style>

<template>
  <detail-panel :title="'运单信息'">
    <detail-panel-item v-if="Waybill.waybillNo" :label="'运单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{Waybill.waybillNo}}</span>
        <a v-clipboard:copy="Waybill.waybillNo" v-clipboard:success="copySuccess">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.carrierWaybillNo" :label="'承运商运单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{Waybill.carrierWaybillNo}}</span>
        <a v-clipboard:copy="Waybill.carrierWaybillNo" v-clipboard:success="copySuccess">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.startName" :label="'始发地'">
      <p>{{Waybill.startName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.endName" :label="'目的地'">
      <p>{{Waybill.endName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="(Waybill.assignCarType === 1 && Waybill.carrierName) || (Waybill.assignCarType === 2 && Waybill.carNo)" :label="'派车方式'">
      <p>{{Waybill.assignCarType==1?'外转':'自送'}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.carrierName" :label="'承运商'">
      <p>{{Waybill.carrierName }}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.driverName"  :label="'司机'">
      <p>{{Waybill.driverName}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.driverPhone" :label="'联系方式'">
      <p class="remix-content">
        <span class="border-right-1px">{{Waybill.driverPhone}}</span>
        <a @click="call(Waybill.driverPhone)">联系TA <i class="iconfont icon-ico_call"/></a>
      </p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.carNo" :label="'车牌号'">
      <p>{{Waybill.carNo}}</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.carType" :label="'车型'">
      <p>{{Waybill.carType | carType}}</p>
    </detail-panel-item>
    <detail-panel-item  v-if="Waybill.carLength" :label="'车长'">
      <p>{{Waybill.carLength}}米</p>
    </detail-panel-item>
    <detail-panel-item  v-if="Waybill.cashBack" :label="'返现运费'">
      <p>{{Waybill.cashBack | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.remark" :label="'备注'">
      <p class="remark">{{Waybill.remark}}</p>
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
  name: 'delivery-waybill-info',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('delivery', ['Waybill'])
  },
  methods: {
    call(tel) {
      window.location.href = `tel:${tel}`
    },
    copySuccess() {
      window.toast('复制成功')
    }
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

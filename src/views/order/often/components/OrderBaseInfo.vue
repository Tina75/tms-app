<template>
  <detail-panel :title="'基本信息'">
    <detail-panel-item :label="'客户名称'">
      <p>{{ detail.consignerName }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'客户订单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{ detail.customerOrderNo || '-' }}</span>
        <a
          v-clipboard:copy.prevent="detail.customerOrderNo"
          v-clipboard:success.prevent="copyToast('success')"
          v-clipboard:error.prevent="copyToast('error')">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'客户运单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{ detail.customerWaybillNo || '-' }}</span>
        <a
          v-clipboard.click.prevent:copy="detail.customerWaybillNo"
          v-clipboard.click:success="copyToast('success')"
          v-clipboard.click:error="copyToast('error')">复制</a>
      </p>
    </detail-panel-item>
    <!-- <detail-panel-item :label="'始发地'">
      <p>广东省深圳市宝安区</p>
    </detail-panel-item>
    <detail-panel-item :label="'目的地'">
      <p>黑龙江哈尔滨市南岗区</p>
    </detail-panel-item> -->
    <detail-panel-item :label="'发货时间'">
      <p>{{ detail.deliveryTime | datetimeFormat('YYYY-MM-DD HH:mm', '-') }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'到货时间'">
      <p>{{ detail.arriveTime | datetimeFormat('YYYY-MM-DD HH:mm', '-') }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'提货方式'">
      <p>{{ detail.pickup | pickupType }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'回单数量'">
      <p>{{ detail.receiptCount }}份</p>
    </detail-panel-item>
    <detail-panel-item :label="'代收货款'">
      <p>{{ detail.collectionMoney | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'责任业务员'">
      <p>{{ detail.salesmanName }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'是否开票'">
      <p>{{ invoiceRender }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'备注'">
      <p class="remark">{{ detail.remark || '-' }}</p>
    </detail-panel-item>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import { pickupType } from '../../js/filters'
import NP from 'number-precision'
import Copy from 'vue-clipboard2'
import Vue from 'vue'

Vue.use(Copy)

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  filters: { pickupType },
  computed: {
    ...mapGetters('order/often', [ 'detail' ]),

    invoiceRender () {
      if (!this.detail.isInvoice) return '否'
      else return `是(${NP.times(this.detail.invoiceRate || 0, 100)}%)`
    }
  },
  methods: {
    copyToast (type) {
      if (type === 'success') window.toast('复制成功')
      else window.toast('复制失败')
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

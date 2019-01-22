<template>
  <detail-panel :title="'基本信息'">
    <detail-panel-item :label="'客户名称'">
      <p>{{ detail.consignerName }}</p>
    </detail-panel-item>
    <!-- <detail-panel-item :label="'客户订单号'">
      <p class="remix-content">
        <span>{{ detail.customerOrderNo || '-' }}</span>
        <a
          v-if="detail.customerOrderNo"
          class="border-right-1px"
          @click.prevent="copy(detail.customerOrderNo)">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'客户运单号'">
      <p class="remix-content">
        <span>{{ detail.customerWaybillNo || '-' }}</span>
        <a
          v-if="detail.customerWaybillNo"
          class="border-right-1px"
          @click.prevent="copy(detail.customerWaybillNo)">复制</a>
      </p>
    </detail-panel-item> -->
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
    <detail-panel-item :label="'对接业务员'">
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
  }
  // methods: {
  //   copy (text) {
  //     this.$copyText(text)
  //       .then(() => { window.toast('复制成功') })
  //       .catch(() => { window.toast('复制失败') })
  //   }
  // }
}
</script>
<style scoped lang="stylus">
  .remix-content
    display: flex
    span
      flex 1
      text-align: right
    a
      margin-left 10px
      padding-left: 10px;
      color: #00a4bd;
  .remark
    max-width 240px
    text-align: left
    float: right
</style>

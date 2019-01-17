<template>
  <detail-panel :title="'基本信息'">
    <detail-panel-item :label="'客户名称'">
      <p>{{ detail.consignerName }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'客户订单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{ detail.customerOrderNo || '-' }}</span>
        <a>复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'客户运单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{ detail.customerWaybillNo || '-' }}</span>
        <a>复制</a>
      </p>
    </detail-panel-item>
    <!-- <detail-panel-item :label="'始发地'">
      <p>广东省深圳市宝安区</p>
    </detail-panel-item>
    <detail-panel-item :label="'目的地'">
      <p>黑龙江哈尔滨市南岗区</p>
    </detail-panel-item> -->
    <detail-panel-item :label="'发货时间'">
      <p>{{ detail.deliveryTime | datetimeFormat }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'到货时间'">
      <p>{{ detail.arriveTime | datetimeFormat }}</p>
    </detail-panel-item>
    <detail-panel-item :label="'提货方式'">
      <p>大车直送客户</p>
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
      <p>是(5%)</p>
    </detail-panel-item>
    <detail-panel-item :label="'备注'">
      <p class="remark">{{ detail.remark }}</p>
    </detail-panel-item>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  computed: mapGetters('order/often', [ 'detail' ])
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

<template>
  <detail-panel :title="'应付费用'">
    <detail-panel-item :label="'计费里程'">
      <p>{{ detail.mileage }}公里</p>
    </detail-panel-item>
    <detail-panel-item :label="'运输费用'">
      <p>{{ detail.freightFee | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'提货费用'">
      <p>{{ detail.pickupFee | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'装货费用'">
      <p>{{ detail.loadFee | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'卸货费用'">
      <p>{{ detail.unloadFee | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'保险费用'">
      <p>{{ detail.insuranceFee | moneyFormat }}元</p>
    </detail-panel-item>
    <detail-panel-item :label="'其他费用'">
      <p>{{ detail.otherFee | moneyFormat }}元</p>
    </detail-panel-item>
    <div class="total-cost">
      <label>合计</label>
      <span>{{ detail | totalFee }}元</span>
      <i>{{ detail.settlementType | settlementType}}</i>
    </div>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import { settlementType, totalFee } from '../../js/filters'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  filters: { settlementType, totalFee },
  computed: mapGetters('order/often', [ 'detail' ])
}
</script>
<style scoped lang="stylus">
  .total-cost
    padding: 10px
    text-align: right
    label
      font-size: 15px;
      color: #333333;
      margin-right: 10px
    span
      color: #FA8C16
      font-size: 20px;
      margin-right: 10px
    i
      color: #666666
      font-size: 15px;
      font-style: normal
</style>

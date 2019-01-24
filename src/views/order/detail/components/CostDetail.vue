<template>
  <detail-panel :title="'应收费用'">
    <detail-panel-item v-if="Detail.mileage" :label="'计费里程'">
      <p>{{Detail.mileage | mileageFormat}}公里</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.freightFee" :label="'运输费用'">
      <p>{{Detail.freightFee | moneyFormat}}元</p>
    </detail-panel-item>
    <!-- <detail-panel-item :label="'油费'">
      <p>1000元</p>
    </detail-panel-item> -->
    <detail-panel-item v-if="Detail.pickupFee" :label="'提货费用'" >
      <p>{{Detail.pickupFee | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.loadFee" :label="'装货费用'">
      <p>{{Detail.loadFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.unloadFee" :label="'卸货费用'">
      <p>{{Detail.unloadFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.insuranceFee" :label="'保险费用'">
      <p>{{Detail.insuranceFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Detail.otherFee" :label="'其他费用'">
      <p>{{Detail.otherFee | moneyFormat}}元</p>
    </detail-panel-item>
    <div class="total-cost">
      <label>合计</label>
      <span>{{Detail.totalFee | moneyFormat}}元</span>
      <i v-if="Detail.settlementType">{{Detail.settlementType | settlementTypeFormatForOrder}}</i>
    </div>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'order-cost-detail',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('order/detail', ['Detail'])
  }
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

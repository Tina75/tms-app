<template>
  <detail-panel v-if="pickupDetail.totalFee" :title="'应收费用'">
    <detail-panel-item v-if="pickupDetail.freightFee" :label="pickupDetail.assignCarType === 1 ? '运输费用' : '油费'">
      <p>{{pickupDetail.freightFee|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.loadFee" :label="'装货费用'">
      <p>{{pickupDetail.loadFee|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.unloadFee" :label="'卸货费用'">
      <p>{{pickupDetail.unloadFee|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.insuranceFee" :label="'保险费用'">
      <p>{{pickupDetail.insuranceFee|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.otherFee" :label="'其他费用'">
      <p>{{pickupDetail.otherFee|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.cashAmount" :label="'到付现金'">
      <p>{{pickupDetail.cashAmount|moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="pickupDetail.fuelCardAmount" :label="'到付油卡'">
      <p>{{pickupDetail.fuelCardAmount|moneyFormat}}元</p>
    </detail-panel-item>
    <div class="total-cost">
      <label>合计</label>
      <span>{{pickupDetail.totalFee|moneyFormat}}元</span>
      <i v-if="pickupDetail.assignCarType === 1">{{settlementTypeMap[pickupDetail.settlementType]}}</i>
    </div>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('pickup', ['pickupDetail', 'settlementTypeMap'])
  },
  methods: {
    // ...mapActions(['getBePicking']),
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

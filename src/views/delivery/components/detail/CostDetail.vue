<template>
  <detail-panel :title="'应付费用'">
    <detail-panel-item v-if="Waybill.mileage" :label="'计费里程'">
      <p>{{Waybill.mileage | mileageFormat}}公里</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.freightFee" :label="Waybill.assignCarType==1?'运输费用':'油费'">
      <p>{{Waybill.freightFee | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.pickupFee" :label="'提货费用'" >
      <p>{{Waybill.pickupFee | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.loadFee" :label="'装货费用'">
      <p>{{Waybill.loadFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.unloadFee" :label="'卸货费用'">
      <p>{{Waybill.unloadFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.tollFee" :label="'路桥费'">
      <p>{{Waybill.tollFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.accommodation && Waybill.assignCarType===2" :label="'住宿费'">
      <p>{{Waybill.accommodation  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.insuranceFee" :label="'保险费用'">
      <p>{{Waybill.insuranceFee  | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.otherFee" :label="'其他费用'">
      <p>{{Waybill.otherFee | moneyFormat}}元</p>
    </detail-panel-item>
    <detail-panel-item v-if="Waybill.infoFee && Waybill.assignCarType===1" :label="'信息费'">
      <p>{{Waybill.infoFee | moneyFormat}}元</p>
    </detail-panel-item>
    <div v-if="Waybill.settlementPayInfo&&Waybill.settlementPayInfo.length">
      <div v-for="item in Waybill.settlementPayInfo" :key="item.payType"  >
        <detail-panel-item  v-if="item.cashAmount || item.fuelCardAmount"  :label="item.payType | payType">
          <p >
            <span v-if="item.cashAmount">{{item.cashAmount | moneyFormat}}元(现金)</span> &nbsp;
            <span v-if="item.fuelCardAmount" class="fuel-txt">{{item.fuelCardAmount | moneyFormat}}元(油卡)</span>
          </p>
        </detail-panel-item>
      </div>
    </div>
    <div v-if="Waybill.totalFee" class="total-cost">
      <label>合计</label>
      <span>{{Waybill.totalFee | moneyFormat}}元</span>
      <i v-if="Waybill.settlementType">{{Waybill.settlementType | settlementTypeFormat}}</i>
    </div>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'delivery-cost-detail',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('delivery', ['Waybill'])
  },
  methods: {
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
  .fuel-txt
    display inline-block
    min-width 70px
</style>

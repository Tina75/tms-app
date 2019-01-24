<template>
  <div class="bill-item" @click="toDetail(data)">
    <div class="item-header border-bottom-1px">
      <span>{{data.createTime|datetimeFormat}}</span>
      <i v-if="data.abnormalLabel === 2">异</i>
    </div>
    <div class="item-content border-bottom-1px">
      <p class="order-route">
        <span>{{data.pickupNo}}</span>
      </p>
      <p class="order-stat">
        <span v-if="data.weight">{{data.weight}}吨</span>
        <span v-if="data.volume">{{data.volume}}方</span>
        <span v-if="data.quantity">{{data.quantity}}件</span>
      </p>
      <template v-if="assignStatus(data)">
        <p v-if="data.assignCarType === 1" class="order-custom">
          {{data.carrierName}}
        </p>
        <p class="order-custom">
          <i class="assign-type">{{data.assignCarType === 2 ? '自送' : '外转'}}</i>
          <span>{{data.driverName}}</span>
          <span>{{data.carNo}}</span>
        </p>
      </template>
    </div>
    <div class="item-footer">
      <div class="order-cost">
        <template v-if="assignStatus(data)">
          <p class="cost-label">应付费用<template v-if="data.assignCarType === 1">（{{settlementTypeMap[data.settlementType]}}）</template></p>
          <p class="cost-money">{{data.totalFee|moneyFormat}}<span>/元</span></p>
        </template>
      </div>
      <div class="order-btns">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('pickup', ['settlementTypeMap'])
  },
  methods: {
    assignStatus (data) {
      return (data.assignCarType === 1 && data.carrierName) || (data.assignCarType === 2 && data.carNo)
    },
    toDetail (data) {
      this.$router.push({
        name: 'pickup-detail',
        params: {
          id: data.pickUpId
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.bill-item
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 10px 0;
  .item-header
    padding-left: 15px;
    padding-bottom: 10px;
    span
      font-size: 14px;
      color: #666666
      line-height: 20px;
    i
      display: block
      float: right
      width 16px
      height: 16px
      margin-right: 15px;
      background-color: #418DF9;
      border-radius: 1px;
      line-height: 16px;
      font-size: 12px;
      font-style: normal
      text-align: center
      color: #ffffff;
  .item-content
    padding: 10px 0 10px 15px
    .order-route
      margin-bottom: 5px;
      span
        line-height: 25px;
        font-size: 18px;
        color: #333333;
        font-weight: bold
    .order-stat
      margin-bottom: 10px;
      span
        display: inline-block
        vertical-align: middle
        background-color: #F3F5F9;
        margin-right: 5px;
        padding: 0 5px
        color #333333
        font-size: 12px;
        line-height: 17px;
    .order-custom
      font-size: 14px;
      line-height: 20px;
      color: #666666;
      i
        display: inline-block
        vertical-align: middle
        padding: 0 5px
        font-size: 12px;
        font-style normal
        line-height: 17px;
        border: 1px solid #efefef;
        margin-right: 10px;
      span
        display: inline-block
        vertical-align: middle
        margin-right: 10px;
  .item-footer
    padding-left: 15px;
    padding-top: 10px;
    display: flex
    flex-direction row
    align-items center
    .order-cost
      flex 1
      .cost-label
        color: #333333
        font-size: 12px;
        line-height: 17px;
        text-align: left
      .cost-money
        color: #FA8C16
        font-size: 20px;
        line-height: 28px;
        text-align: left
        font-weight: bold;
        span
          font-size: 14px;
          font-weight: normal;
    .order-btns
      margin-right: 15px;
      a
        display: inline-block
        padding: 5px 13px
        text-align: center
        line-height: 20px;
        font-size: 14px;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        border-color: #00A4BD;
        color: #00A4BD;
        &:not(:last-child)
          margin-right: 15px;
        &.grey
          color: #999999
          border-color: #999999;
</style>

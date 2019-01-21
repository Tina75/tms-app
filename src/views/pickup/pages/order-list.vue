<template>
  <div class="pickup-order-list">
    <cube-scroll
      ref="scroll"
      :data="billOrderList"
      :options="options">
      <ul class="order-wrapper">
        <li
          v-for="(item, index) in billOrderList"
          :key="index"
          class="order-item">
          <div class="item-header border-bottom-1px">
            <span>{{item.createTime|datetimeFormat}}</span>
            <i v-if="item.collectionMoney">代</i>
          </div>
          <div class="item-content border-bottom-1px">
            <p v-if="item.start" class="order-route">
              <span>{{item.startName}}</span>
              <icon-font
                name="icon-line"
                :size="20"
                color="#333333"/>
              <span>{{item.endName}}</span>
            </p>
            <p class="order-stat">
              <span v-if="item.weight">{{item.weight}}吨</span>
              <span v-if="item.volume">{{item.volume}}方</span>
              <span v-if="item.quantity">{{item.quantity}}件</span>
            </p>
            <p class="order-custom">
              {{item.consignerName}}
            </p>
            <p v-if="item.customerOrderNo" class="order-custom">
              客户单号：{{item.customerOrderNo}}
            </p>
          </div>
          <div class="item-footer">
            <div class="order-cost">
              <p class="cost-label">应付费用（{{orderSettlementTypeMap[item.settlementType]}}）</p>
              <p class="cost-money">{{item.totalFee|moneyFormat(4)}}<span>/元</span></p>
            </div>
            <div class="order-btns">
              <a @click="remove(item, index)">移出</a>
            </div>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>
'pickup',
<script>
import { mapGetters, mapActions } from 'vuex'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'pickup-order-list',
  // components: { ContentLoaderList },
  metaInfo: {
    title: '订单信息'
  },
  computed: {
    ...mapGetters('pickup', ['billOrderList', 'orderSettlementTypeMap']),
    options () {
      return {
        scrollbar: true
      }
    }
  },
  mounted () {
    setAppRightBtn([
      {
        text: '添加',
        iconType: 'add',
        action: () => {
          this.$router.push({
            name: 'pickup-bill-add',
            params: {
              id: this.$route.params.id
            }
          })
        }
      }
    ])
  },
  methods: {
    ...mapActions('pickup', ['getBillOrderList', 'removeBillOrder', 'editBillOrders']),
    async remove (item) {
      await this.removeBillOrder(item.id)
      await this.editBillOrders(this.$route.params.id)
      await this.getBillOrderList(this.$route.params.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getBillOrderList(to.params.id)
    })
  },
  beforeRouteLeave (to, from, next) {
    setAppRightBtn([{ text: '', action: () => {} }])
    next()
  }
}
</script>
<style lang="stylus" scoped>
  .order-item
    background-color: #ffffff;
    margin-bottom: 15px;
    padding: 10px 0 10px 15px;
    .item-header
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
        background-color: #FCAF3B;
        line-height: 16px;
        font-size: 12px;
        font-style: normal
        text-align: center
        color: #ffffff;
    .item-content
      padding: 10px 0
      .order-route
        margin-bottom: 5px;
        span
          line-height: 25px;
          font-size: 18px;
          color: #333333;
          font-weight: bold
        .icon-line
          margin: -5px 5px 0;
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
    .item-footer
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
          span
            font-size: 14px;
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

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
              <p class="cost-label">应收费用（{{settlementTypeMap[item.settlementType]}}）</p>
              <p class="cost-money">{{item.totalFee|moneyFormat(4)}}<span>/元</span></p>
            </div>
            <div class="order-btns">
              <a @click="remove(item, index)">移除</a>
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

export default {
  name: 'pickup-order-list',
  // components: { ContentLoaderList },
  metaInfo: {
    title: '订单信息'
  },
  computed: {
    ...mapGetters('pickup', ['billOrderList']),
    options () {
      return {
        scrollbar: true
      }
    }
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
  }
}
</script>
<style lang="stylus">
.example-index
  .van-list
    min-height 55Px
</style>

<template>
  <cube-scroll
    ref="scroll"
    :data="pickingData.list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul class="order-wrapper">
      <li
        v-for="(item, index) in pickingData.list"
        :key="index"
        class="order-item"
        @click="toDetail(item, index)">
        <div class="item-header border-bottom-1px">
          <span>{{item.createTime|datetimeFormat}}</span>
          <i v-if="item.collectionMoney">3</i>
        </div>
        <div class="item-content border-bottom-1px">
          <p class="order-route">
            <span>{{item.pickupNo}}</span>
          </p>
          <p class="order-stat">
            <span v-if="item.weight">{{item.weight}}吨</span>
            <span v-if="item.volume">{{item.volume}}方</span>
            <span v-if="item.quantity">{{item.quantity}}件</span>
          </p>
          <p v-if="item.assignCarType === 1" class="order-custom">
            {{item.carrierName}}
          </p>
          <p class="order-custom">
            <i class="assign-type">{{item.assignCarType === 2 ? '自送' : '外转'}}</i>
            <span>{{item.driverName}}</span>
            <span>{{item.carNo}}</span>
          </p>
        </div>
        <div class="item-footer">
          <div class="order-cost">
            <p class="cost-label">应付费用<template v-if="item.assignCarType === 1">（{{settlementTypeMap[item.settlementType]}}）</template></p>
            <p class="cost-money">{{item.totalFee|moneyFormat}}<span>/元</span></p>
          </div>
          <div class="order-btns">
            <a class="grey" @click.stop="locate(item, index)">位置</a>
            <a @click.stop="arrive(item, index)">到货</a>
          </div>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'pickup',
  computed: {
    ...mapGetters('pickup', ['pickingData', 'settlementTypeMap']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.pickingData.next,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['setPageStart', 'getPicking', 'arriveBill', 'removePicking', 'getPickupCount']),
    /** 下拉刷新 */
    async onPullingDown () {
      await this.setPageStart('pickingData')
      await this.getPickupCount()
      await this.getPicking()
    },
    /** 上拉加载 */
    async onPullingUp () {
      this.getPicking()
    },
    locate (item) {
      this.$router.push({
        name: 'pickup-track',
        params: {
          id: item.pickUpId
        },
        query: {
          type: 1
        }
      })
    },
    arrive (data, index) {
      const _this = this
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否确认到货？',
        confirmBtn: {
          text: '是',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '否',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        async onConfirm () {
          await _this.arriveBill(data.pickUpId)
          await _this.removePicking(index)
          await _this.getPickupCount()
          window.toast('到货成功')
        }
      }).show()
    },
    toDetail (item, index) {
      this.$router.push({
        name: 'pickup-detail',
        params: {
          id: item.pickUpId
        },
        query: {
          index: index
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.getDispatching()
    })
  }
}
</script>
<style scoped lang="stylus">
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

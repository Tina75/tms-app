<template>
  <div class="pickup-dispatch">
    <div class="dispatch-list">
      <cube-scroll
        ref="scroll"
        :data="dispatchingData.list"
        :options="options"
        @pulling-up="onPullingUp">
        <ul class="order-wrapper">
          <li
            v-for="(item, index) in dispatchingData.list"
            :key="index"
            class="order-item">
            <div class="item-header border-bottom-1px">
              <span :class="{'checked': chosenList.indexOf(item.id) >= 0}" class="check-icon" @click="chooseCurrentSwitch(item.id)">
                <icon-font
                  v-if="chosenList.indexOf(item.id) >= 0"
                  name="icon-xuanzhong"
                  :size="20"
                  color="#00A4BD"/>
              </span>
              <span>{{item.createTime|datetimeFormat}}</span>
              <i v-if="item.collectionMoney" class="order-tip">代</i>
            </div>
            <div class="item-content border-bottom-1px">
              <p class="order-route">
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
                <p class="cost-money">{{item.totalFee}}<span>/元</span></p>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="select-block">
      <div class="select-stat border-top-1px">
        <p class="select-all">
          <span :class="{'checked': chosenAll}" class="check-icon" @click="chooseAllSwitch">
            <icon-font
              v-if="chosenAll"
              name="icon-xuanzhong"
              :size="20"
              color="#00A4BD"/>
          </span>
          <span class="text">全选</span>
          <span class="label"><i>{{chosenList.length}}</i>单</span>
        </p>
        <p class="total-stat">
          <span class="text">合计</span>
          <span class="label"><i>{{chosenStat.weight}}</i>吨</span>
          <span class="label"><i>{{chosenStat.volume}}</i>方</span>
          <span class="label"><i>{{chosenStat.quantity}}</i>件</span>
        </p>
      </div>
      <div class="confirm-btn" @click="batchDispatch">确认</div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { mapGetters, mapActions } from 'vuex'
import NP from 'number-precision'

export default {
  name: 'DispatchingList',
  components: { IconFont },
  data () {
    return {
      chosenAll: false,
      chosenList: [],
      chosenStat: {
        weight: 0,
        volume: 0,
        quantity: 0
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['dispatchingData', 'settlementTypeMap']),
    options () {
      return {
        pullUpLoad: this.dispatchingData.next,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['setPageStart', 'getDispatching', 'createPickup']),
    /** 上拉加载 */
    async onPullingUp () {
      await this.getDispatching()
      if (this.chosenAll) {
        this.chosenList = this.dispatchingData.list.map(item => item.id)
      }
      this.setStat()
    },
    chooseAllSwitch () {
      if (this.chosenAll) {
        this.chosenList = []
      } else {
        this.chosenList = this.dispatchingData.list.map(item => item.id)
      }
      this.chosenAll = !this.chosenAll
      this.setStat()
    },
    chooseCurrentSwitch (id) {
      let index = this.chosenList.indexOf(id)
      if (index >= 0) {
        this.chosenList.splice(index, 1)
      } else {
        this.chosenList.push(id)
      }
      this.setStat()
    },
    setStat () {
      let weight = 0
      let volume = 0
      let quantity = 0
      this.dispatchingData.list.forEach(item => {
        if (this.chosenList.indexOf(item.id) >= 0) {
          weight = NP.plus(weight, item.weight)
          volume = NP.plus(volume, item.volume)
          quantity = NP.plus(quantity, item.quantity)
        }
      })
      this.chosenStat = {
        weight: weight,
        volume: volume,
        quantity: quantity
      }
    },
    async batchDispatch () {
      if (this.$route.params.id) {
        await this.addBillOrder(this.chosenList)
        await this.editBillOrders(this.$route.params.id)
      } else {
        await this.createPickup(this.chosenList)
        await this.setPageStart('dispatchingData')
        await this.getDispatching()
      }
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.chosenStat = {
        weight: 0,
        volume: 0,
        quantity: 0
      }
      vm.chosenList = []
      if (!vm.dispatchingData.list.length) {
        vm.getDispatching()
      }
    })
  }
}
</script>
<style lang="stylus">
.pickup-dispatch
  height: 100%
  display: flex
  padding-top: 15px;
  flex-direction column
  .dispatch-list
    overflow auto
    flex 1
    .order-item
      background-color: #ffffff;
      margin-bottom: 15px;
      padding: 10px 0 10px 15px;
      .item-header
        padding-bottom: 10px;
        span
          display: inline-block
          font-size: 14px;
          color: #666666
          line-height: 20px;
          vertical-align: middle
          &.check-icon
            margin-top: -3px;
            width: 18px;
            height: 18px;
            line-height: 20px;
            border-radius: 100%
            border: 1px solid #d1d1d1
            margin-right: 10px;
            &.checked
              margin-top: -5px;
              border: none
        .order-tip
          display: block
          float: right
          width 16px
          height: 16px
          margin-right: 15px;
          background-color: #FCAF3B;
          line-height: 18px;
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
  .select-block
    .select-stat
      height: 88px
      background-color: #fff;
      padding-left: 15px;
      p
        display: block
        vertical-align: middle
        line-height: 44px;
        &.select-all
          width: 130px;
        &.total-stat
          flex: 1
        .check-icon
          display: inline-block
          vertical-align: middle
          margin-top: -3px;
          width: 18px;
          height: 18px;
          border-radius: 100%
          border: 1px solid #d1d1d1
          margin-right: 10px;
        .checked
          margin-top: -5px;
          vertical-align: baseline;
          border: none
        .text
          margin-right: 10px;
          display: inline-block
          color: #333333;
          vertical-align: middle
          font-size: 15px;
        .label
          display: inline-block
          vertical-align: middle
          font-size: 15px;
          margin-right: 10px;
          color: #666666;
          i
            color: #00A4BD;
            font-style: normal
            margin-right: 5px;
    .confirm-btn
      height: 44px
      background-color: #00A4BD;
      color: #ffffff
      text-align: center
      font-size: 17px;
      line-height: 44px;
</style>

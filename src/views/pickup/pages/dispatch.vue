<template>
  <div class="pickup-dispatch">
    <div class="dispatch-list">
      <cube-scroll
        ref="scroll"
        :data="dispatchingData.list"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <ul class="order-wrapper">
          <li
            v-for="(item, index) in dispatchingData.list"
            :key="index"
            class="order-item">
            <div class="item-header border-bottom-1px">
              <span class="check-icon checked">
                <icon-font
                  name="icon-xuanzhong"
                  :size="20"
                  color="#00A4BD"/>
              </span>
              <span>{{item.createTime}}</span>
              <i v-if="item.collectionMoney" class="order-tip">代</i>
            </div>
            <div class="item-content border-bottom-1px">
              <p class="order-route">
                <span>{{item.start}}</span>
                <i/>
                <span>{{item.end}}</span>
              </p>
              <p class="order-stat">
                <span v-if="item.weight">{{item.weight}}吨</span>
                <span v-if="item.volume">{{item.volume}}方</span>
                <span v-if="item.quantity">{{item.quantity}}件</span>
              </p>
              <p class="order-custom">
                {{item.consignerName}}
              </p>
              <p class="order-custom">
                客户单号：{{item.customerOrderNo}}
              </p>
            </div>
            <div class="item-footer">
              <div class="order-cost">
                <p class="cost-label">应收费用（{{item.settlementType}}）</p>
                <p class="cost-money">{{item.totalFee}}<span>/元</span></p>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="select-block">
      <div class="select-stat">
        <p class="select-all">
          <span class="check-icon checked">
            <icon-font
              name="icon-xuanzhong"
              :size="20"
              color="#00A4BD"/>
          </span>
          <span class="text">全选</span>
          <span class="label"><i>{{chosenList.length}}</i>单</span>
        </p>
        <p class="total-stat">
          <span class="text">合计</span>
          <span class="label"><i>{{totelWeight}}</i>吨</span>
          <span class="label"><i>{{totalVolumn}}</i>方</span>
          <span class="label"><i>{{totalQuanity}}</i>件</span>
        </p>
      </div>
      <div class="confirm-btn">确认</div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DispatchingList',
  components: { IconFont },
  data () {
    return {
      chosenList: [],
      totelWeight: 10,
      totalVolumn: 10,
      totalQuanity: 10
    }
  },
  computed: {
    ...mapGetters(['dispatchingData']),
    options () {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions(['getDispatching']),
    /** 下拉刷新 */
    async onPullingDown () {
      this.getDispatching()
    },
    /** 上拉加载 */
    async onPullingUp () {
      this.getDispatching()
    },
    clickHandler () {},
    changeHandler () {}
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.getDispatching()
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
      height: 44px
      background-color: #fff;
      padding-left: 15px;
      display: flex
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

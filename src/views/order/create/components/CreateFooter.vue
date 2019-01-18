<template>
  <footer class="create-footer">
    <div class="footer-item">
      <div v-if="mode !== 'edit'" class="footer-item-select">
        <cube-checkbox v-model="orderOften" class="footer-item-select-radio">保存为常发订单</cube-checkbox>
      </div>
      <a class="footer-item-total"
         @click.prevent="showDetail = !showDetail">
        <span class="total-tip">费用合计：</span>
        <money-label :money="total" />
        <icon-font class="total-detail" name="icon-ico_up" />
      </a>
    </div>
    <div class="footer-item">
      <cube-button
        class="footer-item-button"
        @click="saveOrder">保存</cube-button>
      <cube-button
        v-if="mode !== 'edit'"
        class="footer-item-button"
        primary>立即发运</cube-button>
    </div>

    <div v-show="showDetail" class="detail-box">
      <div class="detail-data">
        <p>费用合计明细</p>
        <ul>
          <li><span>运输费：</span>{{ freightFee }}元</li>
          <li><span>装货费：</span>{{ feeInfo.loadFee | numberFormat }}元</li>
          <li><span>卸货费：</span>{{ feeInfo.unloadFee | numberFormat }}元</li>
          <li><span>提货费：</span>{{ feeInfo.pickupFee | numberFormat }}元</li>
          <li><span>保险费：</span>{{ feeInfo.insuranceFee | numberFormat }}元</li>
          <li><span>其他费：</span>{{ feeInfo.otherFee | numberFormat }}元</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import MoneyLabel from '../../components/MoneyLabel'
import { mapGetters, mapMutations } from 'vuex'
import NP from 'number-precision'

export default {
  name: 'CreateFooter',
  components: { MoneyLabel },
  filters: {
    numberFormat (number) { return NP.divide(number || 0, 100) }
  },
  data () {
    return {
      mode: this.$route.meta.mode,
      showDetail: false
    }
  },
  computed: {
    ...mapGetters('order/create', [
      'feeInfo',
      'freightFee'
    ]),
    orderOften: {
      get: mapGetters('order/create', [ 'orderOften' ]).orderOften,
      set: function (val) { this.SET_OFTEN_ORDER(val) }
    },
    total () {
      return NP.plus(
        NP.divide(this.feeInfo.pickupFee || 0, 100),
        NP.divide(this.feeInfo.loadFee || 0, 100),
        NP.divide(this.feeInfo.unloadFee || 0, 100),
        NP.divide(this.feeInfo.insuranceFee || 0, 100),
        NP.divide(this.feeInfo.otherFee || 0, 100),
        this.freightFee || 0
      )
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_OFTEN_ORDER' ]),
    saveOrder () {
      this.showDetail = false
      this.$emit('on-save-order')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .create-footer
    position fixed
    bottom 0
    left 0
    right 0
    height 88px
    background #ffffff
    z-index 1

    .footer-item
      display flex
      height 44px
      line-height 44px

      &-select
        flex none
        height 44px
        line-height 44px
        color #666666

        &-radio
          height 44px
          line-height 44px

      &-total
        flex 1
        display block
        margin-right 15px
        font-size 14px
        text-align right
        background #ffffff

        .total-tip
          color #333333
        .total-detail
          margin-left 10px
          vertical-align top
          color #C5C8CE

      &-button
        flex 1
        height 44px
        padding 0
        border-radius 0

        &:first-child
          background #27C4D3

  .detail-box
    position fixed
    left 0
    right 0
    top 0
    bottom 88px
    background rgba(0,0,0,.4)

    .detail-data
      position absolute
      bottom 0
      left 0
      right 0
      background #ffffff
      padding 25px 16px

      p
        margin-bottom 10px
        color #333333
        font-weight bold

      ul
        display flex
        flex-wrap wrap
        li
          flex none
          width 33.333333%
          margin-top 15px
          font-size 14px
          font-weight bold
          span
            font-size 12px
            color #999999
            font-weight normal
</style>

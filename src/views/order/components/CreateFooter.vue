<template>
  <footer class="create-footer">
    <div class="footer-item">
      <div class="footer-item-select">
        <cube-checkbox v-model="saveUsually" class="footer-item-select-radio">保存为常发订单</cube-checkbox>
      </div>
      <a class="footer-item-total"
         @click.prevent="showDetail = true">
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
        class="footer-item-button"
        primary>立即发运</cube-button>
    </div>

    <div v-show="showDetail" class="footer-detail-box">
      <div class="detail-box">
        <div class="detail-data">
          <p>费用合计明细</p>
          <ul>
            <li><span>运输费：</span>{{ transportFee || 0 }}元</li>
            <li><span>装货费：</span>{{ feeInfo.uploadFee || 0 }}元</li>
            <li><span>卸货费：</span>{{ feeInfo.unloadFee || 0 }}元</li>
            <li><span>提货费：</span>{{ feeInfo.pickupFee || 0 }}元</li>
            <li><span>保险费：</span>{{ feeInfo.ensuranceFee || 0 }}元</li>
            <li><span>其他费：</span>{{ feeInfo.otherFee || 0 }}元</li>
          </ul>
        </div>
        <cube-button
          class="detail-button"
          primary
          @click="showDetail = false">确定</cube-button>
      </div>
    </div>
  </footer>
</template>

<script>
import MoneyLabel from './MoneyLabel'
import { mapGetters } from 'vuex'
import NP from 'number-precision'

export default {
  name: 'CreateFooter',
  components: { MoneyLabel },
  data () {
    return {
      saveUsually: false,
      showDetail: false
    }
  },
  computed: {
    ...mapGetters('order', [
      'feeInfo',
      'transportFee'
    ]),
    total () {
      return NP.plus(
        this.feeInfo.pickupFee || 0,
        this.feeInfo.uploadFee || 0,
        this.feeInfo.unloadFee || 0,
        this.feeInfo.ensuranceFee || 0,
        this.feeInfo.otherFee || 0,
        this.transportFee || 0
      )
    }
  },
  methods: {
    saveOrder () {
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

  .footer-detail-box
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(0,0,0,.4)

    .detail-box
      position fixed
      bottom 0
      left 0
      right 0
      background #ffffff

      .detail-button
        height 44px
        padding 0
        border-radius 0

      .detail-data
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

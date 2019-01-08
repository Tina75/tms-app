<template>
  <footer class="create-footer">
    <div class="footer-item">
      <div class="footer-item-select">
        <cube-checkbox class="footer-item-select-radio" v-model="saveUsually">保存为常发订单</cube-checkbox>
      </div>
      <a class="footer-item-total"
        @click.prevent="showDetail = true">
        <span class="total-tip">费用合计：</span>
        <money-label money="9999" />
      </a>
    </div>
    <div class="footer-item">
      <cube-button
        class="footer-item-button">保存</cube-button>
      <cube-button
        class="footer-item-button"
        primary>立即发运</cube-button>
    </div>

    <div class="footer-detail-box" v-show="showDetail">
      <div class="detail-box">
        <div class="detail-data">
          <p>费用合计明细</p>
          <ul>
            <li><span>装货费：</span>750元</li>
            <li><span>装货费：</span>750元</li>
            <li><span>装货费：</span>750元</li>
            <li><span>装货费：</span>750元</li>
            <li><span>装货费：</span>750元</li>
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

export default {
  name: 'CreateFooter',
  components: { MoneyLabel },
  data () {
    return {
      saveUsually: false,
      showDetail: false
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


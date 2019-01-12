<template>
  <cube-scroll>
    <ul class="order-list">
      <li
        v-for="item in 'text'"
        class="order-list-item" :key="item"
        @click="$router.push({ name: 'order-often-detail' })">
        <p class="order-company order-container">南京大猪蹄子物流公司</p>

        <div class="order-body order-container border-top-1px border-bottom-1px">
          <p class="order-body-cities">
            南京 浦口区
            <icon-font name="icon-line" size="20" />
            济南 历下区
          </p>
          <ul class="order-body-info">
            <li class="order-body-info-item">猪饲料</li>
            <li class="order-body-info-item">20吨</li>
            <li class="order-body-info-item">37件</li>
          </ul>
          <p class="order-body-user">
            <span>用户名</span>
            <span>1999999999</span>
          </p>
          <p class="order-body-user">
            江苏省南京市秦淮区中山南路88号通福大厦13楼
          </p>
        </div>

        <div class="order-footer order-container">
          <money-label money="1200" />
          <span class="order-footer-settlement">月结</span>
          <div class="order-footer-button">
            <cube-button
              class="order-footer-button-item order-footer-button-delete order-footer-button-disabled"
              inline light outline>删除</cube-button>
            <cube-button
              class="order-footer-button-item order-footer-button-add"
              inline light outline>再来一单</cube-button>
          </div>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import MoneyLabel from '../../components/MoneyLabel'

export default {
  name: 'order-often',
  metaInfo: { title: '常发订单' },
  components: { MoneyLabel }
}
</script>

<style lang="stylus" scoped>
  .order-container
    padding 0 14px
  .order-list
    padding-bottom 10px
    &-item
      margin-top 10px
      background #ffffff

  .order-company
    height 33px
    line-height 33px

  .order-footer
    height 49px
    line-height 49px

    &-settlement
      font-size 12px
      color #666666
      margin-left  10px
    &-button
      float right
      &-item
        width 70px
        height 30px
        padding 0
        margin-left 10px
        border-radius 1px
        font-size 15px
        box-shadow none
      &-delete
        color #666666
        &:after
          border-color #DCDEE2
      &-disabled
        background #F8F8F9

  .order-body
    padding-top 14px
    padding-bottom 14px
    &-cities
      font-size 18px
      font-weight bold
      i
        margin 0 10px
    &-info
      margin 10px 0
      &-item
        display inline-block
        height 18px
        padding 0 4px
        margin-right 10px
        line-height 18px
        background #F8F8F9
    &-user
      font-size 12px
      color #666666
      line-height 1.5
      span
        margin-right 12px
</style>

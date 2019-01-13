<template>
  <div class="carrier-detail">
    <div class="company-header">
      <h4 class="company-name">北京百事物流有限公司</h4>
      <div class="company-other">
        <span class="company-icon"></span>
        <span class="company-phone">曹操 18817802222</span>
        <span class="company-payType">月结</span>
      </div>
    </div>

    <div class="company-remark">
      <h4 class="company-remark-title">备注</h4>
      <div>测试车窗外测试车窗外测试车窗外测试车窗外测试车窗外</div>
    </div>

    <div class="split-line" />

    <cell-group>
      <cell-item label="合作车辆" :route="{ name: 'Car' }">12</cell-item>
    </cell-group>

    <div class="fixed-button">
      <cube-button :primary="true">拨打电话</cube-button>
    </div>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'

export default {
  name: 'CarrierDetail',

  components: { CellGroup, CellItem }
}
</script>


<style lang="stylus" scoped>
.fixed-button
  position fixed
  bottom 0
  left 0
  right 0
  z-index 100
.split-line
  margin-top 15px
  background transparent
.carrier-detail
  >>>.cell-item
    min-height 50px
  .company
    &-header
      padding 20px 15px
      background-color #3A424B
      color #FFFFFF
    &-name
      font-weight 500
      font-size 18px
      line-height 18px
    &-other
      display flex
      margin-top 17px
      font-size 14px
    &-phone
      flex 1
    &-remark
      min-height 100px
      box-sizing border-box
      padding 16px 15px
      font-size 15px
      color #666666
      background #ffffff
      &-title
        margin-bottom 16px
        color #333
        font-weight 500
</style>

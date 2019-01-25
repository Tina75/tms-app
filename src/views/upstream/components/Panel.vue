<template>
  <div class="detail-panel">
    <div class="detail-panel-header">
      {{title}}
    </div>
    <div class="detail-panel-main">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail-panel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail-panel
  background #ffffff
  margin-top 15px
  padding-left 15px
  .detail-panel-header
    color #333
    font-size 16px
    line-height 49px
    font-weight 600
  border-bottom 1px solid #f3f5f9
  .detail-panel-main
    overflow hidden
</style>

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
  metaInfo: {
    title: 'detail-panel'
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail-panel-header
  color #333
  font-size 16px
  line-height 49px
  border-bottom 1px solid #f3f5f9
.detail-panel
  background #ffffff
  margin-bottom 15px
  padding-left 15px
</style>

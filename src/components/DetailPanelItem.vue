<template>
  <div class="detail-panel-item">
    <label v-if="label">{{label}}</label>
    <div class="cell-content">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 标题
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='stylus' scoped>
  .detail-panel-item
    padding: 10px 15px 10px 0
    min-height: 40px
    display: flex
    align-items start
    label
      display: block
      min-width 50px
      color: #666666;
      font-size: 15px;
      line-height: 22px;
    .cell-content
      flex 1
      text-align: right
      color: #333333
      font-size: 15px;
      line-height: 22px;
</style>

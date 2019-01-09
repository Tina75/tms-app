<template>
  <div class="cell-group">
    <slot v-if="tabName === name"></slot>
  </div>
</template>
<script>
export default {
  props: {
    // 标题
    tabName: {
      type: String,
      default: ''
    },
    // 链接图标
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='stylus' scoped>
  .cell-group
    width: 100%;
    background-color: #fff;
    margin-bottom: 12px;
</style>

<template>
  <div class="detail-panel">
    <p class="panel-title border-bottom-1px">{{title}}</p>
    <slot/>
  </div>
</template>
<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang='stylus' scoped>
  .detail-panel
    width: 100%;
    background-color: #fff;
    padding-left: 15px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    .panel-title
      height: 50px
      font-weight bold
      line-height: 50px;
      color: #333333
      font-size: 16px;
</style>

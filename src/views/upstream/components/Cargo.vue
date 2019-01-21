<template>
  <div class="cargo-detail">
    <div class="cargo-name">
      {{data.name}}
    </div>
    <div class="cargo-info">
      <span>{{data.weight || 0}}吨</span>
      <span>{{data.volume || 0}}方</span>
      <span>{{data.packageUnit || '-'}}</span>
      <span>{{data.num || 0 }}件</span>
      <span>{{data.cost || 0 }}元</span>
      <span>{{data.remark1}}</span>
      <span>{{data.remark2}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cargo-detail',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.cargo-detail
  padding 10px
  margin-right 15px
  margin-bottom 10px
  background #f3f5f9
.cargo-name
  font-size 15px
  color #000
  line-height 30px
.cargo-info
  font-size 12px
  color #666
  span
    margin-right 5px
</style>

<template>
  <cube-scroll class="scroll-box">
    <ul class="rule-list">
      <li
        class="rule-item border-bottom-1px"
        @click="chooseThis">计费规则</li>
      <li
        class="rule-item border-bottom-1px"
        @click="chooseThis">计费规则</li>
      <li
        class="rule-item border-bottom-1px"
        @click="chooseThis">计费规则</li>
      <li
        class="rule-item"
        @click="chooseThis">计费规则</li>
    </ul>
  </cube-scroll>
</template>

<script>
export default {
  name: 'order-charge-rule',
  metaInfo: { title: '选择计费规则' },
  methods: {
    chooseThis () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .rule-list
    margin 10px 0
    background #ffffff

    .rule-item
      height 50px
      line-height 50px
      padding 0 15px
      font-size 15px
      color #333333
</style>

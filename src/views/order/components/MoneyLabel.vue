<template>
  <span class="money">{{ value }}</span>
</template>

<script>
export default {
  name: 'MoneyLabel',
  props: {
    money: {
      type: [ String, Number ],
      required: true
    }
  },
  computed: {
    value () { return this.money }
  }
}
</script>

<style lang="stylus" scoped>
  .money
    font-size 18px
    color #FA8C15

    &:before
      content "￥"
      font-size 12px
</style>

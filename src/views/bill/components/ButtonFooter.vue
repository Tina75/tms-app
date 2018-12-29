<template>
  <footer class="button-footer">
    <cube-button
      v-for="(item, index) in buttonList"
      :key="item.label"
      class="button-item"
      primary
      :disabled="item.disabled"
      :outline="index !== buttons.length - 1"
      @click="doOperate(item.func)">
      {{ item.label }}
    </cube-button>
  </footer>
</template>

<script>
export default {
  name: 'ButtonFooter',
  props: {
    buttons: {
      type: Array, // [{ label, disabled, func }]
      required: true
    }
  },
  data () {
    return {
      buttonList: this.buttons
    }
  },
  watch: {
    buttons (val) { this.buttonList = val }
  },
  methods: {
    doOperate (func) {
      func()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .button-footer
    display flex
    justify-content space-around
    position fixed
    left 0
    right 0
    bottom 0
    padding 14px 2px
    border-top 1px solid #DCDCDC
    background #ffffff
    z-index 1

  .button-item
    flex 1
    height 40px
    margin 0 4px
    padding 0
    line-height 40px
</style>

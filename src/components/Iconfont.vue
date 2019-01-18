<template>
  <i
    class="iconfont"
    :class="fontClass"
    :style="styles" />
</template>

<script>
const BASE_SIZE = 37.5
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: void 0
    },
    size: {
      type: [String, Number],
      default: void 0
    }
  },
  computed: {
    fontClass () {
      return this.name ? `${this.name}` : ''
    },
    styles () {
      let style = {}
      if (this.color) {
        style.color = this.color
      }
      if (this.size) {
        style['font-size'] = `${this.size / BASE_SIZE}rem`
      }
      return style
    }
  }
}
</script>

<style lang="stylus" scoped>
  .iconfont
    vertical-align middle
</style>

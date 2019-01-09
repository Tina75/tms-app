<template>
  <i
    class="icon iconfont"
    :class="fontClass"
    :style="styles" />
</template>

<script>
const BASE_SIZE = 37.5
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    color: String,
    size: [String, Number]
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
  .icon
    vertical-align middle
</style>

<template>
  <div
    v-show="visible"
    class="wrapper cube-popup cube-popup_mask"
    @click="close">
    <cube-loading :size="28"></cube-loading>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    status: { type: Boolean, default: false }
  },

  computed: {
    visible () {
      return this.status
    }
  },

  methods: {
    close () {
      this.$emit('update:status', false)
    }
  }
}

</script>
<style lang='stylus' scoped>
.wrapper
  text-align center
  height 100%
  width 100%
  position absolute
  top 40%
  left 46%
</style>

<template>
  <transition name="cube-picker-fade">
    <cube-popup
      v-show="show"
      ref="popup"
      type="my-popup"
      position="center"
      :mask-closable="false"
      @mask-click="toggle()"
    >
      <transition name="cube-picker-move">
        <div v-show="show" class="input-popup">
          <div class="input-popup__title">包装尺寸(毫米)</div>
          <input >
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'show'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {

      }
    }
  },
  computed: {
  },
  watch: {
    show: 'toggle'
  },
  methods: {
    toggle(show) {
      this.$refs.popup[show ? 'show' : 'hide']()
      if (show) {
        this.inputValue = this.value || ''
      }
      this.$emit('show', show)
    },
    onConfirm() {
      this.$emit('confirm', this.inputValue)
      this.toggle()
    }
  }
}
</script>

<style lang='stylus'>
.input-popup
  background #fff
  width 344px
</style>

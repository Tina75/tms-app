<template>
  <div class="cargo-info-size-dialog">
    <cube-input
      v-model="length"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="长"
      autofocus
      @blur="inputBlurHandler" />
    <cube-input
      v-model="width"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="宽"
      @blur="inputBlurHandler" />
    <cube-input
      v-model="height"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="高"
      @blur="inputBlurHandler" />
  </div>
</template>

<script>
import precesion from '@/components/Form/js/precision'

export default {
  name: 'SizeInput',
  data () {
    return {
      length: '',
      width: '',
      height: ''
    }
  },
  watch: {
    length (val) { this.changeHandler(val, 'length') },
    width (val) { this.changeHandler(val, 'width') },
    height (val) { this.changeHandler(val, 'height') }
  },
  methods: {
    inputBlurHandler () {
      this.$emit('blur', Number(this.length), Number(this.width), Number(this.height))
    },
    changeHandler (val, field) {
      if (val === '') {
        this.$nextTick(() => { this[field] = 0 })
        return
      }
      const number = precesion(val, 1)
      if (number !== val) this.$nextTick(() => { this[field] = number })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cargo-info-size-dialog
    display flex
    justify-content space-around
    padding 10px 5px
    &-item
      flex 1
      margin 0 5px
      >>> input
        text-align center
</style>

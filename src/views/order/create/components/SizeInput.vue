<template>
  <div class="cargo-info-size-dialog">
    <cube-input
      class="cargo-info-size-dialog-item"
      v-model="length"
      type="number"
      placeholder="长"
      autofocus
      @blur="inputBlurHandler" />
    <cube-input
      class="cargo-info-size-dialog-item"
      v-model="width"
      type="number"
      placeholder="宽"
      autofocus
      @blur="inputBlurHandler" />
    <cube-input
      class="cargo-info-size-dialog-item"
      v-model="height"
      type="number"
      placeholder="高"
      autofocus
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
      if (number !== val) this.$nextTick(() => { this[field]  = number })
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



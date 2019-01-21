<template>
  <div class="cargo-info-size-dialog">
    <cube-input
      v-model="inLength"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="长"
      autofocus
      @blur="inputBlurHandler('inLength')" />
    <cube-input
      v-model="inWidth"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="宽"
      @blur="inputBlurHandler('inWidth')" />
    <cube-input
      v-model="inHeight"
      class="cargo-info-size-dialog-item"
      type="number"
      placeholder="高"
      @blur="inputBlurHandler('inHeight')" />
  </div>
</template>

<script>
import precesion from '@/components/Form/js/precision'

export default {
  name: 'SizeInput',
  props: {
    length: {
      type: [Number, String],
      default: ''
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      inLength: '',
      inWidth: '',
      inHeight: ''
    }
  },
  watch: {
    inLength (val) { this.changeHandler(val, 'inLength') },
    inWidth (val) { this.changeHandler(val, 'inWidth') },
    inHeight (val) { this.changeHandler(val, 'inHeight') }
  },
  mounted () {
    this.inLength = this.length
    this.inWidth = this.width
    this.inHeight = this.height
  },
  methods: {
    inputBlurHandler (field) {
      this.$emit('blur', Number(this.inLength), Number(this.inWidth), Number(this.inHeight))
    },
    changeHandler (val, field) {
      if (val === '') {
        this.$nextTick(() => { this[field] = '' })
        return
      } else {
        this.$nextTick(() => { this[field] = Number(this[field]) })
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

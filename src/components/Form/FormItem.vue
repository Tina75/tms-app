<template>
  <div class="form-item-box">
    <div class="form-item border-bottom-1px">
      <label class="form-item-label" :class="{ 'form-item-required': required }">
        <img v-if="labelImage" class="form-item-label-image" :src="labelImage" >
        {{ label }}
      </label>

      <div class="form-item-input-box">
        <input
          v-model="inputValue"
          class="form-item-input"
          :class="inputAlignment"
          :type="inputType"
          :placeholder="inputPlaceHolder"
          :maxlength="maxlength"
          :readonly="inputReadonly"
          :disabled="inputDisabled"
          @click="inputClickHandler"
          @input="inputChangeHandler"
          @blur="inputBlurHandler"
          @focus="inputFocusHandler">
      </div>

      <a v-if="clickIcon"
         class="form-item-icon border-left-1px"
         @click.prevent="iconClickHandler">
        <icon-font :name="clickIcon" color="#189cb2" size="20" />
      </a>

      <icon-font
        v-if="this.type === 'click' && this.showArrow"
        class="form-item-arrow"
        name="icon-ico_right" />
    </div>
  </div>

</template>

<script>
import props from './js/formItemProps'
// import computed from './js/formItemProps'

export default {
  name: 'FormItem',
  props,
  data () {
    return {
      inputValue: this.value,
      picker: null
    }
  },
  computed: {
    inputType () {
      if (this.type === 'number') return 'number'
      else return 'text'
    },
    inputReadonly () { return this.type === 'picker' || this.readonly },
    inputDisabled () { return this.disabled },
    inputPlaceHolder () {
      let ph
      if (this.placeholder) ph = this.placeholder
      if (this.type === 'picker') return (ph || '请选择') + (this.required ? '(必选)' : '')
      return (ph || '请输入') + (this.required ? '(必填)' : '')
    },
    inputAlignment () {
      return 'form-item-input-align-' + this.align
    }
  },
  watch: {
    value (val) { this.inputValue = val },
    inputValue (newVal, oldVal) { if (this.type === 'number' && isNaN(Number(newVal))) this.$nextTick(() => { this.inputValue = oldVal }) }
  },
  methods: {
    // 点击图标触发事件
    iconClickHandler () { this.$emit('on-icon-click') },
    // 点击输入框触发事件
    inputClickHandler () {
      if (this.type === 'click') this.$emit('on-click')
    },
    // 输入框事件
    inputChangeHandler () { this.inputEmit() },
    inputBlurHandler () {
      if (this.type === 'click') return
      if (this.required && (this.inputValue === '' || this.inputValue === undefined)) {
        window.toast(`${('请填写' + this.label) || this.requiredMsg}`)
      }
      this.inputEmit()
    },
    inputFocusHandler () { this.inputEmit() },
    inputEmit () {
      let value = this.inputValue
      if (this.type === 'number' && value !== '') value = Number(value)
      this.$emit('input', value)
      return value
    }
  }
}
</script>

<style lang="stylus" scoped>
  .border-left-1px:before
    border-color #E4E7EC
  .border-bottom-1px:after
    border-color #E4E7EC

  .form-item-input::-webkit-input-placeholder
    color #C5C8CE
  .form-item-input:-moz-placeholder
    color #C5C8CE
  .form-item-input::-moz-placeholder
    color #C5C8CE
  .form-item-input:-ms-input-placeholder
    color #C5C8CE

  .form-item-box
    padding-left 16px
    background #ffffff

  .form-item
    display flex
    align-items center
    position relative
    min-height 50px
    padding-right 16px
    line-height 50px

    &-label
      flex none
      margin-right 10px
      font-size 15px

      &-image
        display inline-block
        width 18px
        height 18px
        margin-right 10px
        border-radius 2px
        vertical-align text-top

    &-required:after
      content "*"
      margin-left 2px
      color red

    &-icon
      flex none
      height 25px
      margin-left 10px
      padding-left 16px
      line-height 25px

    &-arrow
      flex none
      margin-left 10px
      color #C5C8CE

    &-input-box
      flex auto
      height 50px

      .form-item-input
        display block
        width 100%
        height 30px
        margin-top 10px
        color #666666

        &-align-left
          text-align left
        &-align-right
          text-align right
        &-align-center
          text-align center
</style>

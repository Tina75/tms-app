<template>
  <div class="form-item-box">
    <div class="form-item border-bottom-1px">
      <label class="form-item-label" :class="{ 'form-item-required': required }">
        <i class="form-item-label-icon" v-if="labelIcon" />
        {{ label }}
      </label>

      <div class="form-item-input-box">
        <input
          v-model="inputValue"
          :type="inputType"
          class="form-item-input"
          :class="inputAlignment"
          :placeholder="inputPlaceHolder"
          :maxlength="maxlength"
          :readonly="inputReadonly"
          :disabled="inputDisabled"
          @click="inputClickHandler"
          @input="inputChangeHandler"
          @blur="inputBlurHandler"
          @focus="inputFocusHandler">
      </div>

      <a class="form-item-icon border-left-1px"
        v-if="clickIcon"
        @click.prevent="iconClickHandler">{{ clickIcon }}</a>

      <i class="form-item-arrow" v-if="this.type === 'click' && this.showArrow" />
    </div>
  </div>

</template>

<script>
import props from './js/formItemProps'
import computed from './js/formItemProps'

export default {
  name:'FormItem',
  props,
  data () {
    return {
      inputValue: this.value
    }
  },
  watch: {
    value (val) { this.inputValue = val }
  },
  computed: {
    inputType () {
      if ([ 'number', 'money', 'telephone' ].indexOf(this.type) > -1) return 'number'
      else return 'text'
    },
    inputReadonly () { return this.type === 'click' || this.readonly },
    inputDisabled () { return this.disabled },
    inputPlaceHolder () {
      let ph
      if (this.placeholder) ph = this.placeholder
      if (this.type === 'click') return (ph || '请选择') + (this.required ? '(必选)' : '')
      return (ph || '请输入') + (this.required ? '(必填)' : '')
    },
    inputAlignment () {
      return 'form-item-input-align-' + this.align
    }
  },
  methods: {
    // 点击图标触发事件
    iconClickHandler () { this.$emit('on-icon-click') },
    // 点击输入框触发事件
    inputClickHandler () { if (this.type === 'click') this.$emit('on-click') },
    // 输入框事件
    inputChangeHandler () {
      this.$emit('input', this.inputValue)
    },
    inputBlurHandler () {
      this.$emit('input', this.inputValue)
    },
    inputFocusHandler () {
      this.$emit('input', this.inputValue)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .border-left-1px:before
    border-color #E4E7EC
  .border-bottom-1px:after
    border-color #E4E7EC

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

      &-icon
        display inline-block
        width 20px
        height 20px
        margin-right 10px
        vertical-align middle
        background #adefcb

    &-required:after
      content "*"
      margin-left 2px
      color red

    &-icon
      flex none
      width 50px
      height 25px
      margin-left 10px
      line-height 25px
      text-align center

    &-arrow
      flex none
      width 20px
      height 20px
      margin-left 10px
      background #adefcb

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


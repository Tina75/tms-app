<template>
  <div class="form-item-box">
    <div class="form-item border-bottom-1px" :class="{'form-item-textarea': type === 'textarea'}">
      <label v-if="label" class="form-item-label" :class="{ 'form-item-required': required }">
        <img v-if="labelImage" class="form-item-label-image" :src="labelImage" >
        {{ label }}
      </label>

      <div class="form-item-input-box">
        <cube-input
          v-if="type !== 'switch' && type !== 'textarea' && type !== 'click'"
          class="form-item-input"
          :class="inputAlignment"
          :type="inputType"
          :placeholder="inputPlaceHolder"
          :maxlength="Number(maxlength)"
          :readonly="inputReadonly"
          :disabled="inputDisabled"
          :clearable="clearable"
          @blur="inputBlurHandler"
          @focus="inputFocusHandler" />

        <div
          v-if="type === 'click'"
          class="form-item-input form-item-click"
          :class="inputAlignment"
          :style="inputValue.length ? 'line-height: 1.5' : 'color: #C5C8CE'"
          @click="inputClickHandler">
          {{ inputValue || inputPlaceHolder }}
        </div>

        <cube-switch
          v-if="type === 'switch'"
          v-model="inputValue"
          class="form-item-switch" />

        <textarea
          v-if="type === 'textarea'"
          v-model="inputValue"
          class="form-item-input"
          :placeholder="inputPlaceHolder"
          :maxlength="maxlength"
          @blur="inputBlurHandler"
          @focus="inputFocusHandler"/>
        <p v-if="this.type === 'textarea' && this.maxlength !== Infinity"
           class="form-item-counter">
          {{this.inputValue.length}}/{{this.maxlength}}
        </p>
      </div>

      <a v-if="clickIcon"
         class="form-item-icon border-left-1px"
         @click.prevent="iconClickHandler">
        <icon-font :name="clickIcon" color="#189cb2" size="20" />
      </a>

      <icon-font
        v-if="this.type === 'click' && this.inputShowArrow"
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
    inputReadonly () { return this.type === 'click' || this.readonly },
    inputDisabled () { return this.disabled },
    inputShowArrow () { return this.showArrow },
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
    inputValue (newVal, oldVal) {
      if (this.type === 'number' && isNaN(Number(newVal))) this.$nextTick(() => { this.inputValue = oldVal })
      this.inputEmit()
    }
  },
  methods: {
    // 点击图标触发事件
    iconClickHandler () { this.$emit('on-icon-click') },
    // 点击输入框触发事件
    inputClickHandler () {
      if (this.type === 'click') this.$emit('on-click')
    },
    inputBlurHandler () {
      if (this.type === 'click') return
      if (this.required && (this.inputValue === '' || this.inputValue === undefined)) {
        window.toast(`${('请填写' + this.label) || this.requiredMsg}`)
      }
      this.$emit('on-blur', this.inputValue)
    },
    inputFocusHandler () { this.$emit('on-focus', this.inputValue) },
    inputEmit () {
      if (this.type === 'number' && this.inputValue !== '') {
        this.inputValue = Number(this.inputValue)
      }
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
    // align-items center
    position relative
    min-height 50px
    padding-right 16px
    line-height 50px

    &-label
      flex none
      margin-right 5px
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
      color red

    &-icon
      flex none
      height 25px
      margin-left 10px
      margin-top 12px
      padding-left 16px
      line-height 25px

    &-arrow
      flex none
      margin-left 10px
      color #C5C8CE

    &-input-box
      flex auto
      min-height 50px

      .form-item-input
        width 100%
        min-height 40px
        margin-top 5px
        font-size 15px
        color #666666
        &:after
          border-style none

      .form-item-click
        margin 14px 0
        min-height 22px
        line-height 22px

      .form-item-switch
        float right
        margin-top 11px

      textarea
        border-style none
        font-size 15px
      .form-item-counter
        margin-top 5px
        font-size 13px
        color #999999
        text-align right

  .form-item-textarea
    display block
    height auto
    padding-top 16px
    padding-bottom 10px
    line-height 1
</style>

<style lang="stylus">
  .form-item-input
    input
      padding-left 0
      padding-right 0

    .cube-input-clear
      line-height 1.2
      padding-top 0
      padding-bottom 0
      padding-left 15px
    &-align-left, &-align-left input
      text-align left
    &-align-right, &-align-right input
      text-align right
    &-align-center, &-align-center input
      text-align center
</style>

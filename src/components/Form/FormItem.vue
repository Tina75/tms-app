<template>
  <div class="form-item-box">
    <div :class="{ 'border-bottom-1px': bottomLine }">
      <div class="form-item" :class="{'form-item-textarea': type === 'textarea'}">
        <label v-if="label" class="form-item-label" :class="{ 'form-item-required': inputRequired }">
          <img v-if="labelImage" class="form-item-label-image" :src="labelImage" >
          {{ label }}
        </label>

        <div class="form-item-input-box">
          <!-- 输入框 type = text || number  -->
          <cube-input
            v-if="type === 'text' || type === 'number'"
            v-model="inputValue"
            class="form-item-input"
            :class="inputAlignment"
            :type="inputType"
            :autofocus="autofocus"
            :placeholder="inputPlaceHolder"
            :maxlength="inputMaxLength"
            :readonly="inputReadonly"
            :disabled="inputDisabled"
            :clearable="clearable"
            @blur="inputBlurHandler"
            @focus="inputFocusHandler" />

          <!-- 选择器 type = selece -->
          <cube-select
            v-if="type === 'select'"
            v-model="inputValue"
            class="form-item-input"
            :class="inputAlignment"
            :options="options"
            :placeholder="inputPlaceHolder"
            :title="inputPlaceHolder"
            :disabled="inputDisabled"
            @change="selectChangeHandler"
            @picker-show="pickerShowHandler"
            @picker-hide="pickerHideHandler" />

          <!-- 点击按钮 type = click -->
          <div
            v-if="type === 'click'"
            class="form-item-input form-item-click"
            :class="inputClickClass"
            :style="(inputValue !== undefined && inputValue !== '') ? 'line-height: 1.5; color: #666666' : 'color: #C5C8CE'"
            @click="inputClickHandler">
            {{ inputValue || inputPlaceHolder }}
          </div>

          <!-- 开关按钮 type = switch -->
          <cube-switch
            v-if="type === 'switch'"
            v-model="inputValue"
            class="form-item-switch" />

          <!-- 文本框 type = textarea -->
          <textarea
            v-if="type === 'textarea'"
            v-model="inputValue"
            class="form-item-input"
            :rows="rows"
            :placeholder="inputPlaceHolder"
            :maxlength="inputMaxLength"
            :readonly="inputReadonly"
            :disabled="inputDisabled"
            :autofocus="autofocus"
            @blur="inputBlurHandler"
            @focus="inputFocusHandler"/>
          <p v-if="textareaShowCounter"
             class="form-item-counter">
            {{this.inputValue ? this.inputValue.length : 0}}/{{this.inputMaxLength}}
          </p>
        </div>

        <a v-if="clickIcon"
           class="form-item-icon border-left-1px"
           @click.prevent="iconClickHandler">
          <icon-font :name="clickIcon" color="#189cb2" size="20" />
        </a>

        <icon-font
          v-if="inputShowArrow"
          class="form-item-arrow"
          name="icon-ico_right" />
      </div>

      <cube-validator
        ref="$validator"
        v-model="valid"
        :model="inputValue"
        :rules="rule"
        :message="rule.message || {}" />
    </div>

  </div>

</template>

<script>
import props from './js/formItemProps'

export default {
  name: 'FormItem',
  inject: {
    rules: {
      from: 'rules',
      default: null
    }
  },
  props,
  data () {
    return {
      inputValue: this.value,
      picker: null,

      valid: true,
      rule: {}
    }
  },
  computed: {
    inputType () {
      if (this.type === 'number') return 'number'
      else return 'text'
    },
    inputRequired () {
      return !!this.rule.required
    },
    inputReadonly () { return this.type === 'click' || this.readonly },
    inputDisabled () { return this.disabled },
    inputShowArrow () { return this.showArrow && (this.type === 'click' || this.type === 'select') },
    inputPlaceHolder () {
      let ph
      if (this.placeholder) ph = this.placeholder
      if (this.type === 'picker') return (ph || '请选择') + (this.inputRequired ? '(必选)' : '')
      return (ph || '请输入') + (this.inputRequired ? '(必填)' : '')
    },
    inputMaxLength () {
      const maxlength = Number(this.maxlength)
      if (isNaN(maxlength)) return Infinity
      return maxlength
    },
    inputAlignment () {
      return 'form-item-input-align-' + this.align
    },
    inputClickClass () {
      let classes = 'form-item-input-align-' + this.align
      if (this.ellipsis) classes += ' ' + 'form-item-click-ellipsis'
      return classes
    },
    textareaShowCounter () {
      return this.type === 'textarea' && this.inputMaxLength !== Infinity && this.inputMaxLength
    }
  },
  watch: {
    value (val) { this.inputValue = val },
    inputValue (newVal, oldVal) {
      if (this.type === 'number' && isNaN(Number(newVal))) this.$nextTick(() => { this.inputValue = oldVal })
      this.inputEmit()
    }
  },
  created () {
    this.rulesParser()
  },
  methods: {
    iconClickHandler () { if (!this.inputDisabled) this.$emit('on-icon-click') },
    inputClickHandler () { if (this.type === 'click' && !this.inputDisabled) this.$emit('on-click') },
    inputBlurHandler () {
      if (this.type === 'click') return
      this.$emit('on-blur', this.inputValue)
      this.doValidate()
    },
    inputFocusHandler () { this.$emit('on-focus', this.inputValue) },
    selectChangeHandler (value, index, text) { this.$emit('change', value, index, text) },
    pickerShowHandler () { this.$emit('picker-show') },
    pickerHideHandler () {
      this.$emit('picker-hide')
      this.doValidate()
    },
    inputEmit () {
      if (this.type === 'number' && this.inputValue !== '') {
        this.inputValue = Number(this.inputValue)
      }
      this.$emit('input', this.inputValue)
      this.doValidate()
    },

    rulesParser () {
      if (!this.prop || !this.rules) return
      this.rule = this.rules[this.prop]
    },
    async doValidate () {
      const valid = this.$refs.$validator.validate()
      this.valid = valid
      return valid
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
    &:last-of-type
      .border-bottom-1px:after
        content none
  .form-item
    display flex
    align-items center
    position relative
    min-height 50px
    padding-right 16px
    line-height 50px

    &-label
      flex none
      margin-right 40px
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
      padding-left 16px
      line-height 25px

    &-arrow
      flex none
      margin-left 10px
      color #C5C8CE

    &-input-box
      flex auto
      width 0
      min-height 50px

      .form-item-input
        width 100%
        min-height 40px
        margin-top 5px
        font-size 15px
        color #666666
        outline none
        &:after
          border-style none

      .form-item-click
        margin 14px 0
        min-height 22px
        line-height 22px
        &-ellipsis
          height 22px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis

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

    .form-item-input-box
      width 100%
</style>

<style lang="stylus">
  .form-item-box .cube-validator-msg
    padding-right 16px
    padding-bottom: 5px;
    text-align right
    font-size 12px

  .form-item-input-box
    .cube-select
      padding-right 0
      padding-left 0
      &-icon
        display none

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

<template>
  <div class="form-item-box">
    <div :class="{ 'border-bottom-1px': bottomLine }">
      <div class="form-item" :class="{'form-item-textarea': type === 'textarea'}">
        <label v-if="label" class="form-item-label" :class="{ 'form-item-required': inputRequired }">
          <img v-if="labelImage" class="form-item-label-image" :src="labelImage" >
          {{ label }}
        </label>

        <div class="form-item-input-box">
          <cube-loading v-if="type === 'loading'" class="form-item-loading" :size="20" />

          <!-- 输入框 type = text || number || phone -->
          <cube-input
            v-if="inputType"
            v-model="inputValue"
            class="form-item-input"
            :class="inputExtraClass"
            :style="invalidStyle"
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
            ref="$picker"
            v-model="inputValue"
            class="form-item-input"
            :class="inputExtraClass"
            :options="options"
            :placeholder="inputPlaceHolder"
            :title="label"
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
            {{ inputValue !== undefined && inputValue !== '' ? inputValue : inputPlaceHolder }}
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
            class="form-item-input form-item-textarea"
            :style="invalidStyle"
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
        v-if="rule && !resetValidator"
        ref="$validator"
        v-model="valid"
        :class="{ 'validate-message': !valid }"
        :model="inputValue"
        :rules="rule"
        :messages="rule.message || {}" />
    </div>

  </div>

</template>

<script>
import Vue from 'vue'
import { Validator } from 'cube-ui'
import props from './js/formItemProps'
import precision from './js/precision'

Vue.use(Validator)

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
      valid: true,
      resetValidator: false,
      rule: null,
      rows: 2,
      picker: null
    }
  },
  computed: {
    inputType () {
      const type = this.type
      if (type === 'text' || type === 'number' || type === 'phone') return 'text'
      if (type === 'textarea' && this.value) {
        this.initTextAreaRow(this.value)
      }
      return ''
    },
    inputRequired () {
      return !!this.rule && !!this.rule.required
    },
    inputReadonly () { return this.type === 'click' || this.readonly },
    inputDisabled () { return this.disabled },
    inputShowArrow () { return this.showArrow && (this.type === 'click' || this.type === 'select') },
    inputPlaceHolder () {
      let ph
      if (this.placeholder) ph = this.placeholder
      if (this.type === 'select') return (ph || '请选择') + (this.inputRequired ? '(必选)' : '')
      return (ph || '请输入') + (this.inputRequired ? '(必填)' : '')
    },
    inputMaxLength () {
      if (this.type === 'phone' && +this.value[0] === 1) {
        return 15
      }
      const maxlength = Number(this.maxlength)
      if (isNaN(maxlength)) return Infinity
      return maxlength
    },
    inputExtraClass () {
      return 'form-item-input-align-' + this.align + (this.disabled ? ' form-item-input-disabled' : '')
    },
    inputClickClass () {
      let classes = 'form-item-input-align-' + this.align
      if (this.ellipsis) classes += ' ' + 'form-item-click-ellipsis'
      return classes
    },
    textareaShowCounter () {
      return this.type === 'textarea' && this.inputMaxLength !== Infinity && this.inputMaxLength
    },
    invalidStyle () {
      return { color: this.valid ? '#666666' : '#F35851' }
    }
  },
  watch: {
    value (val) {
      if (this.type === 'phone' && val && +val[0] === 1) {
        this.inputValue = (val + '').replace(/(^\d{3}|\d{4}\B)/g, '$1  ').trim()
      } else {
        this.inputValue = val
      }
    },
    inputValue (newVal, oldVal) {
      switch (this.type) {
        case 'number':
          if (isNaN(Number(newVal))) {
            this.$nextTick(() => {
              this.inputValue = oldVal
              this.inputEmit()
            })
            return
          }
          const value = precision(newVal, Number(this.precision))
          if (String(value) !== newVal) {
            this.$nextTick(() => {
              this.inputValue = value
              this.inputEmit()
            })
            return
          }
          break
      }
      this.inputEmit()
    }
  },
  created () {
    this.rulesParser()
  },
  methods: {
    inputBlurTrigger () { Array.from(document.getElementsByTagName('input')).forEach($input => { $input.blur() }) },
    iconClickHandler () { if (!this.inputDisabled) this.$emit('on-icon-click', this.prop) },
    inputClickHandler () {
      if (this.type === 'click' && !this.inputDisabled) {
        this.inputBlurTrigger()
        this.$emit('on-click', this.prop)
      }
    },
    inputBlurHandler (e) {
      if (this.type === 'click') return
      this.$emit('on-blur', e, this.prop)
      this.doValidate()
    },
    inputFocusHandler (e) {
      this.$emit('on-focus', e, this.prop)
      if (this.focusOnEnd && this.type !== 'textarea') {
        this.$nextTick(() => this.moveToEnd(e.target))
      }
    },
    selectChangeHandler (value, index, text) { this.$emit('change', value, index, text, this.prop) },
    pickerShowHandler () {
      this.picker = this.$refs.$picker.picker
      this.inputBlurTrigger()
      this.$emit('picker-show', this.prop)
    },
    pickerHideHandler () {
      this.$emit('picker-hide', this.prop)
      this.doValidate()
    },
    inputEmit () {
      switch (this.type) {
        case 'number':
          if (this.inputValue !== '') {
            this.inputValue = Number(this.inputValue)
          }
          break
        case 'phone':
          return this.$emit('input', this.inputValue.replace(/\s/g, ''), this.prop)
      }
      this.$emit('input', this.inputValue, this.prop)
    },

    rulesParser () {
      if (!this.prop || !this.rules) return
      this.rule = this.rules[this.prop]
      if (!this.rule || !this.rule.messages) return
      for (let key in this.rule.messages) {
        Validator.addMessage(key, this.rule.messages[key])
      }
    },
    async doValidate () {
      if (!this.rule) return true
      this.valid = await this.$refs.$validator.validate()
      return this.valid
    },
    setValid () {
      this.valid = true
      this.resetValidator = true
      this.$nextTick(() => { this.resetValidator = false })
    },
    moveToEnd(el) {
      const length = el.value.length
      if (typeof el.createTextRange !== 'undefined') {
        const range = el.createTextRange()
        range.moveStart('character', length)
        range.collapse(false)
        range.select()
      } else if (typeof el.selectionStart === 'number') {
        el.selectionStart = el.selectionEnd = length
      }
      if (this.type === 'text' || this.type === 'number') {
        el.scrollLeft = 10000 // 尽量大，直接显示到末尾
      }
    },
    initTextAreaRow (inputText) {
      let fromIndex = 0
      this.rows = 2
      while (true) {
        let index = inputText.indexOf('\n', fromIndex)
        if (index !== -1) {
          fromIndex = index + 1
          this.rows++
        } else {
          break
        }
      }
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
        margin-left 2px
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
        line-height 1.5
      .form-item-counter
        margin-top 5px
        font-size 13px
        color #999999
        text-align right

      .form-item-loading
        height 50px
        display flex
        justify-content flex-end
        align-items center

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
    line-height 20px
    text-align right
    font-size 12px
    span
      color #F35851 !important
  .validate-message .cube-validator-msg
    padding-bottom 10px

  .cube-select_disabled
    background #ffffff

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
      color inherit

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
    &-disabled, &-disabled input
      color #C5C8CE !important

  .form-item-textarea
    resize none
</style>

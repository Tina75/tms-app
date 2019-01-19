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
        <div v-show="show" class="box-popup">
          <div class="box-popup__group border-bottom-1px">
            <input
              ref="inputEl"
              v-model="inputValue"
              class="box-popup__selected cube-font-16 cube-c-black cube-c-placeholder"
              :autofocus="true"
              :placeholder="placeholder"
              :maxlength="maxlength"
              @keydown="onKeydown"
              @focus="onFocus"
              @blur="onBlur"
            >
            <span class="box-popup__confirm cube-font-weight--m cube-font-18" @click="onConfirm">确定</span>
          </div>
          <div class="cube-validator-msg-def">{{!valid ? '最多' + maxlength + '个字符' : ' '}}</div>
          <div class="box-popup__box-wrap">
            <div
              v-for="item in checkboxs"
              :key="item.text"
              :class="{'selected': item.selected}"
              class="box-popup__box cube-flex-center"
              @click="toggleItem(item)"
              v-text="item.text"
            />
          </div>
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
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    split: {
      type: String,
      default: '，'
    },
    maxlength: {
      type: [String, Number],
      default: 10
    }
  },
  data() {
    return {
      inputValue: '',
      valid: true
    }
  },
  computed: {
    checkboxs() {
      return this.options.map(item => ({
        text: item,
        selected: this.inputValue.includes(item)
      }))
    }
  },
  watch: {
    show: 'toggle'
  },
  methods: {
    toggleItem(item) {
      const split = this.split
      let input = this.inputValue
      const text = item.text
      if (item.selected) {
        input = input.replace(new RegExp(`${split}?${text}`, 'g'), '')
        if (input[0] === split) {
          input = input.slice(1)
        }
      } else {
        input = input + (input ? split : '') + text
      }
      this.check(input)
      if (this.valid) {
        item.selected = !item.selected
        this.inputValue = input
      }
      this.$refs.inputEl.focus()
    },
    toggle(show) {
      this.$refs.popup[show ? 'show' : 'hide']()
      if (show) {
        this.inputValue = this.value || ''
        this.valid = true
        // this.$refs.inputEl.focus()
      }
      this.$emit('show', show)
    },
    check(input = this.inputValue) {
      this.valid = input.length <= 10
    },
    onConfirm() {
      this.$emit('confirm', this.inputValue)
      this.toggle()
    },
    // 添加/删除末尾分隔符逻辑
    onFocus(e) {
      const value = this.inputValue
      const length = value.length
      const split = this.split
      const splitIndex = length - split.length
      if (length && value.lastIndexOf(split) !== splitIndex && value.length < this.maxlength - 1) {
        this.inputValue = value + split
      }
      // 直接选中末尾
      this.$nextTick(() => {
        e.target.scrollLeft = 100000
      })
    },
    onBlur() {
      const value = this.inputValue
      const length = value.length
      const split = this.split
      const splitIndex = length - split.length
      if (length && value.lastIndexOf(split) === splitIndex) {
        this.inputValue = value.slice(0, splitIndex)
      }
    },
    onKeydown(event) {
      this.check(this.inputValue + 'a')
    }
  }
}
</script>

<style lang='stylus'>
.box-popup
  background #fff
  width 344px
  .cube-validator-msg-def
    text-align center
    height 25px
    padding-top 5px
    box-sizing border-box
    line-height 20px
  &__group
    display flex
    line-height 22px
  &__confirm
    color #00A4BD
    padding 14px 20px 14px 10px
  &__selected
    flex 1
    padding 14px 12px
    -webkit-appearance none
  &__box-wrap
    display flex
    padding 0 12px 20px
    flex-wrap wrap
  &__box
    width 70px
    height 40px
    box-sizing border-box
    font-size 16px
    border 1px solid #DCDEE2
    margin 5px
    border-radius 1px
    &.selected
      color #00A4BD
      border-color #00A4BD
</style>

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
        <div v-show="show" class="dimension-popup">
          <div class="dimension-popup__title cube-c-black cube-font-18 cube-font-weight--m">包装尺寸(毫米)</div>
          <div class="dimension-popup__group">
            <input
              v-for="item in options"
              :key="item.key"
              v-model="item.value"
              type="number"
              class="dimension-popup__input cube-c-placeholder"
              :placeholder="item.placeholder"
              @input="checkValid"
            >
          </div>
          <div class="cube-validator-msg-def"> {{!valid ? '支持输入数字和1位小数' : ''}}</div>
          <div class="dimension-popup__btns">
            <a class="cube-dialog-btn border-top-1px" @click="toggle()">取消</a>
            <a
              class="cube-dialog-btn border-top-1px cube-dialog-btn_highlight"
              @click.stop="onConfirm"
            >确定</a>
          </div>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
// 支持数字和1位小数
const pattern = /^(\d+(\.\d{1})?$)$/
export default {
  name: 'DimensionPopup',
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
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valid: true,
      options: [
        {
          key: 'length',
          value: '',
          placeholder: '长'
        },
        {
          key: 'width',
          value: '',
          placeholder: '宽'
        },
        {
          key: 'height',
          value: '',
          placeholder: '高'
        }
      ]
    }
  },
  computed: {},
  watch: {
    show: 'setValue'
  },
  methods: {
    setValue(show) {
      this.toggle(show)
      if (show) {
        const value = this.value
        let key
        this.options.forEach(config => {
          key = config.key
          config.value = !Number.isNaN(value[key]) ? value[key] : ''
        })
      }
    },
    toggle(show) {
      this.$refs.popup[show ? 'show' : 'hide']()
      if (show) {
        this.inputValue = this.value || ''
      }
      this.$emit('show', show)
      this.valid = true
    },
    onConfirm() {
      if (this.valid) {
        this.$emit(
          'confirm',
          this.options.reduce((result, item) => {
            result[item.key] = item.value === '' ? '' : +item.value
            return result
          }, {})
        )
        this.toggle()
      }
    },
    checkValid() {
      this.valid = this.options.every(item => {
        return pattern.test(item.value) || !item.value
      })
    }
  }
}
</script>

<style lang='stylus'>
.dimension-popup
  background #fff
  width 344px
  .cube-validator-msg-def
    text-align center
    padding 10px 0
    height 40px
    vertical-align middle
    font-size 14px
  &__title
    text-align center
    padding 30px 0
  &__group
    display flex
    overflow hidden
    justify-content space-around
    width 100%
  &__input
    -webkit-appearance none
    border 1px solid #DCDEE2
    width 100px
    height 44px
    text-align center
    font-size 16px
    padding 0
    margin 0
  &__btns
    display flex
</style>

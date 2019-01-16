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
          <div class="dimension-popup__group cube-pb-30">
            <input
              v-for="item in options"
              :key="item.key"
              v-model="item.value"
              type="number"
              class="dimension-popup__input cube-c-placeholder"
              :placeholder="item.placeholder"
            >
          </div>
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
      options: [
        {
          key: 'length',
          value: 0,
          placeholder: '长'
        },
        {
          key: 'width',
          value: 0,
          placeholder: '宽'
        },
        {
          key: 'height',
          value: 0,
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
          config.value = !Number.isNaN(value[key]) ? +value[key] : 0
        })
      }
    },
    toggle(show) {
      this.$refs.popup[show ? 'show' : 'hide']()
      if (show) {
        this.inputValue = this.value || ''
      }
      this.$emit('show', show)
    },
    onConfirm() {
      this.$emit(
        'confirm',
        this.options.reduce((result, item) => {
          result[item.key] = +item.value
          return result
        }, {})
      )
      this.toggle()
    }
  }
}
</script>

<style lang='stylus'>
.dimension-popup
  background #fff
  width 344px
  &__title
    text-align center
    padding 30px 0
  &__group
    display flex
    overflow hidden
    justify-content space-around
    width 100%
  &__input
    border 1px solid #DCDEE2
    width 100px
    height 44px
    text-align center
    font-size 16px
  &__btns
    display flex
</style>

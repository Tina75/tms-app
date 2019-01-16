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
              v-model="inputValue"
              class="box-popup__selected cube-font-16 cube-c-black cube-c-placeholder"
              :placeholder="placeholder"
            >
            <span class="box-popup__confirm cube-font-weight--m cube-font-18" @click="$emit('confirm', inputValue)">确定</span>
          </div>
          <div class="box-popup__box-wrap">
            <div
              v-for="item in checkboxs"
              :key="item.name"
              :class="{'selected': item.selected}"
              class="box-popup__box cube-flex-center"
              @click="toggleItem(item)"
              v-text="item.name"
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
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: '',
      data: ['纸箱', '木箱', '铁桶', '纤袋', '麻袋', '木袋']
    }
  },
  computed: {
    checkboxs() {
      return this.data.map((item) => ({
        name: item,
        selected: this.inputValue.includes(item)
      }))
    }
  },
  watch: {
    show: 'toggle',
    value: 'setValue'
  },
  methods: {
    toggleItem(item) {
      const split = ','
      let input = this.inputValue
      if (item.selected) {
        input = input.replace(new RegExp(`${split}?${item}`, 'g'), '')
        if (input[0] === split) {
          input = input.slice(1)
        }
      } else {
        input = input + (input ? split : '') + item
      }
      item.selected = !item.selected
      this.inputValue = input
    },
    toggle(show) {
      this.$refs.popup[show ? 'show' : 'hide']()
      if (show) {
        this.inputValue = this.value || ''
      }
      this.$emit('show', show)
    }
  }
}
</script>

<style lang='stylus'>
.box-popup
  background #fff
  width 344px
  &__group
    display flex
    line-height 22px
  &__confirm
    color #00A4BD
    padding 14px 10px
  &__selected
    flex 1
    padding 14px 12px
  &__box-wrap
    display flex
    padding 15px 12px
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

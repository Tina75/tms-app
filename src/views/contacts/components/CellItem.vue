<template>
  <div class="normal-cell" @click="$emit('click')">
    <div class="normal-cell__group">
      <slot name="left">
        <i v-if="leftIcon" :class="leftIcon" class="normal-cell__icon iconfont cube-font-18 cube-mr-10"/>
      </slot>
      <span class="normal-cell__label cube-font-15 cube-c-black" v-text="label"/>
    </div>
    <div class="normal-cell__group">
      <slot name="right">
        <i v-if="rightIcon" :class="rightIcon" class="normal-cell__icon iconfont cube-font-16 cube-mr-5"/>
      </slot>
      <span v-if="rightTitle" class="cube-font--15 cube-c-grey" v-text="rightTitle"/>
      <i v-if="showArrow" class="cube-font-12 cube-ml-5 iconfont icon-ico_right cube-font-weight" style="color:#C5C8CE"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    rightTitle: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang='stylus'>
.normal-cell
  padding 0 15px
  background #fff
  box-sizing border-box
  display flex
  align-items center
  justify-content space-between
  &__icon
    color #6C798E
    vertical-align middle
    position relative
    top -1px
  &__group
    display flex
    align-items center
    line-height 50px
</style>

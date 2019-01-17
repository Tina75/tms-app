<template>
  <div class="contact-item border-bottom-1px cube-ellipsis" @click="$emit('click', item, index)">
    <div class="contact-item__prefix cube-flex-center">
      <slot name="left">
        <span v-if="useNameIcon" v-text="prefix"/>
        <i v-else class="iconfont cube-font-22" :class="icon"/>
      </slot>
    </div>
    <div class="contact-item__content cube-ml-15 cube-ellipsis" :class="{'cube-ellipsis':nowrap}">
      <slot>
        <span class="cube-c-black cube-font-17" v-text="item.name"/>
        <span class="cube-c-light-grey cube-font-14" :class="{'cube-ellipsis':nowrap}" v-text="item.detail"/>
      </slot>
    </div>
    <slot name="right">
      <i
        v-if="rightIcon"
        class="contact-item__right-icon"
        :class="rightIcon"
        @click.stop="$emit('phoneCall', item, index)"
      />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'icon-ico_accept'
    },
    rightIcon: {
      type: [String, Boolean],
      default: 'iconfont icon-ico_call'
    },
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: [String, Number],
      default: ''
    },
    useNameIcon: {
      type: Boolean,
      default: false
    },
    nowrap: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    prefix() {
      return this.item.name ? this.item.name[0] : ''
    }
  }
}
</script>

<style lang='stylus' >
.contact-item
  display flex
  background #fff
  align-items center
  padding 10px 15px
  &:last-of-type:after
    content none
  &:after
    margin-left 70px
  &__prefix
    flex-shrink 0
    height 40px
    width 40px
    background #E4E7EC
    font-size 17px
    color #fff
    border-radius 100%
  &__right-icon
    font-size 30px
    color #00A4BD
  &__content
    flex 1
    display flex
    flex-direction column
    justify-content space-around
    white-space pre-wrap
    span
      line-height 1.1em
      min-height 1.1em
      &:last-of-type
        margin-top 2px
</style>

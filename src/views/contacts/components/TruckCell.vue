<template>
  <div class="truck-item cube-mb-15 cube-ellipsis" @click="$emit('click', item, index)">
    <div class="truck-item__content cube-ellipsis">
      <slot>
        <span class="cube-c-black cube-font-17">
          <span v-text="item.title"/>
          <span v-if="item.tag" class="truck-tag" v-text="item.tag" />
        </span>
        <div class="cube-c-light-grey cube-ellipsis cube-font-14 cube-mt-5">
          <span v-for="(it, index) in item.info" :key="index" class="truck-tag-gray" v-text="it" />
        </div>
        <span class="cube-c-light-grey cube-ellipsis cube-font-14 cube-mt-5" v-text="item.detail"/>
      </slot>
    </div>
    <slot name="right">
      <i
        v-if="rightIcon"
        class="truck-item__right-icon"
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
.truck-item
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
    height 75px
    display flex
    flex-direction column
    justify-content space-around
  .truck-tag
    display inline-block
    margin-left 5px
    font-size 10px
    line-height 10px
    text-align center
    color #00A4BD
    padding 2px 3px
    border 1px solid #00A4BD
    border-radius 1px
    vertical-align top
  .truck-tag-gray
    display inline-block
    font-size 14px
    line-height 14px
    text-align center
    color #333
    padding 3px 4px
    border-radius 1px
    background-color #F8F8F9
    vertical-align top
    margin-left 6px
    &:first-child
      margin-left 0
</style>

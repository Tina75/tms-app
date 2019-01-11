<template>
  <div class="contact-item border-bottom-1px cube-ellipsis" @click="$emit('click', item)">
    <div class="contact-item__prefix cube-flex-center">
      <span v-if="useNameIcon" v-text="prefix"/>
      <span v-else class="iconfont icon-ico_accept"/>
    </div>
    <div class="contact-item__content cube-ml-15 cube-ellipsis">
      <span class="cube-c-black cube-ellipsis cube-font-17" v-text="item.name"/>
      <span class="cube-c-light-grey cube-ellipsis cube-font-14" v-text="item.detail"/>
    </div>
    <i
      class="contact-item__tel iconfont icon-ico_call"
      @click.stop="$emit('phoneCall', item)"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    useNameIcon: {
      type: Boolean,
      default: false
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
  &__tel
    font-size 30px
    color #00A4BD
  &__content
    flex 1
    height 40px
    display flex
    flex-direction column
    justify-content space-around
</style>

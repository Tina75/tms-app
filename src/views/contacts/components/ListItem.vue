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
        <span class="cube-c-black cube-font-17 cube-ellipsis" v-text="item.name"/>
        <p
          v-if="isList"
          class="cube-c-light-grey cube-font-14 cube-mt-5"
          :class="{'cube-ellipsis':nowrap}"
        >
          <span v-for="(content, i) in list" :key="i" class="cube-mr-10" v-text="content"/>
        </p>
        <span v-else class="cube-c-light-grey cube-font-14 cube-mt-5" :class="{'cube-ellipsis':nowrap}" v-text="item.detail||''"/>
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
    isList() {
      return this.item.detail && this.item.detail instanceof Array
    },
    prefix() {
      return this.item.name ? this.item.name[0] : ''
    },
    list() {
      return this.isList ? this.item.detail.filter(v => !!v) : ''
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
  &:first-of-type // 列表页暂时没有写搜索框的时候要和标题有分割线
    margin-top 5px
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
    span,
    p
      line-height 1.1em
      min-height 1.1em
</style>

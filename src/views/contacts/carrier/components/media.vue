<template>
  <div class="media">
    <div class="media_hd">
      <slot name="image">
        <img :src="icon" class="media_thumb" alt="" >
      </slot>
    </div>
    <div class="media_bd">
      <h4 class="media_title">
        <slot name="title">
          <span v-text="title" />
        </slot>
      </h4>
      <p class="media_desc">
        <slot name="desc">
          <span v-text="desc" />
        </slot>
      </p>
    </div>
    <div class="media_ft">
      <slot name="extra">
        <span v-text="extra"/>
      </slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.media
  position relative
  display flex
  align-items center
  padding 10px 15px
  overflow hidden
  background #fff
  &:first-child
    margin-top 0
  &:active
    background-color #ececec
  &::before
    content " "
    position absolute
    left 0
    top 0
    right 0
    height 1px
    border-top 1px solid #E4E7EC
    color #E4E7EC
    transform-origin 0 0
    transform scaleY(0.5)
    left 70px
  &_hd
    margin-right 15px
    height 40px
    width 40px
    line-height 40px
    text-align center
  &_bd
    flex 1
    min-width 0
  &_ft
    margin-left 15px
    height 30px
    width 30px
    line-height 30px
    text-align center
  &_thumb
    width 100%
    min-height 100%
    vertical-align top
    border 0
  &_title
    margin 0 0 8px 0
    font-size 17px
    color #333
    font-weight 400
    line-height 18px
    width auto
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-wrap normal
    word-wrap break-word
    word-break break-all
  &_desc
    margin 0
    color #999
    font-size 14px
    line-height 14px
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2
</style>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    desc: {
      type: String,
      default: ''
    },

    extra: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="form-title border-bottom-1px">
    <img v-if="image" class="form-title-image" :src="image">
    {{ title }}

    <p class="form-title-extra">
      <slot name="extra" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-title
    height 50px
    padding 0 18px
    line-height 50px
    font-size 16px
    font-weight bold
    color #333333
    background #ffffff

    &-image
      display inline-block
      width 18px
      height 18px
      margin-right 10px
      border-radius 2px
      vertical-align text-top

    &-extra
      float right
      font-size 15px
      color #189cb2
</style>

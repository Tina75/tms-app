<template>
  <div class="form-title border-bottom-1px">
    <i class="form-title-icon" v-if="icon" />
    <img class="form-title-icon" v-if="image" :src="image">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'FormTitle',
  props: {
    title: String,
    icon: String,
    image: String
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

    &-icon
      display inline-block
      width 20px
      height 20px
      margin-right 10px
      vertical-align middle
      background #adefcb
</style>


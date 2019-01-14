<template>
  <div class="medias">
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.medias
    margin-top 10px
    position relative;
    overflow hidden
  &:first-child
    margin-top 0
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
</style>

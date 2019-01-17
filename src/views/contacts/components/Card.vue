<template>
  <div class="card">
    <h4 class="card_hd">
      <slot name="title">
        <span v-text="title" />
      </slot>
    </h4>
    <div class="card_bd">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  background #ffffff
  &_hd
    font-size 15px
    font-weight 400
    color #333
    line-height 13px
    padding 16px 15px
</style>

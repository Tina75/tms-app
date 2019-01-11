<template>
  <div class="tab-title">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'tab-title',
  metaInfo: {
    title: 'tab-title'
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.tab-title
  padding 10px 0
  text-align center
  font-size 18px
  line-height 25px
  color #333
  background #fff
</style>

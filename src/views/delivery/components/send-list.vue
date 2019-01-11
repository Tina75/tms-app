<!-- 待派车列表 -->
<template>
  <delivery-list
    :ref-name="refKey"
    :list="SendList"
    @refresh="refresh"
    @loadmore="loadmore"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeliveryList from './DeliveryList'
export default {
  name: 'send-list',
  components: { DeliveryList },
  data () {
    return {
      refKey: 'send'
    }
  },

  computed: {
    ...mapGetters(['SendList'])
  },

  created () {
    this.refresh()
  },

  methods: {
    ...mapActions(['getSend', 'clearSend']),

    refresh() {
      this.clearSend()
      this.getSend()
      // .then(() => {
      //   this.$refs[this.refKey].forceUpdate()
      // })
    },
    loadmore() {
      this.getSend()
      // this.$refs[this.refKey].forceUpdate()
    }
  }
}

</script>
<style lang='stylus' scoped>
.list
  background #EFEFEF
  &-item
    background white
    margin-top 15px
    padding 10px 0
    font-size 14px
    color #666666
    position relative
    &__time
      height 20px
      line-height 20px
      position relative
    &__time:after
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-top 6px
    &__money:before
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-bottom 10px
    &__body
      padding-left 15px

    &__city
      color #333
      font-size 18px
      margin-top 20px
      font-weight bold
    &__count
      background #efefef
      display inline-block
      margin 5px 8px 5px 0
      border-radius 3px
      padding 3px 5px 2px 5px
      font-size 12px
    &__number
      line-height 25px
      margin-bottom 10px
    &__btn
      position absolute
      right 15px
      bottom 15px
      font-size 14px
      min-width 50px
    &__flag
      background #FA8C16
      color white
      border-radius 2px
      display inline-block
      height 18px
      font-size 12px
      line-height 20px
      padding 0 3px
      position absolute
      right 15px
      top 0
</style>

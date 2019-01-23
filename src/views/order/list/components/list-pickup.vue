<!-- 全部 -->
<template>
  <base-list
    :ref-name="refKey"
    :list="PickupList"
    @refresh="refresh"
    @loadmore="loadmore"
    @edit-order="editOrderById"
    @edit-bill ="editBillById"
    @delete = "deleteById"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseList from './BaseList'
export default {
  name: 'list-pickup',
  components: { BaseList },
  data () {
    return {
      refKey: 'pickup'
    }
  },

  computed: {
    ...mapGetters('order/list', ['PickupList'])
  },

  created () {
    this.refresh()
  },

  methods: {
    ...mapActions('order/list', ['getPickup', 'clearPickup', 'deleteOrder', 'setPickupList', 'getTabCount']),

    refresh() {
      this.clearPickup()
      this.getPickup()
    },
    loadmore() {
      this.getPickup()
    },
    async deleteById(id) {
      await this.deleteOrder(id)
      await this.setPickupList(this.PickupList.filter(item => item.id !== id))
      this.getTabCount()
    },
    editOrderById(id) { // 修改订单
      this.$router.push({ name: 'order-edit', params: { id } })
    },
    editBillById(id, type) {
      // TODO: 提货单和送货单不同
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

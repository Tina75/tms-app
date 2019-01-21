<template>
  <delivery-list
    :list="DispatchList"
    @refresh="refresh"
    @loadmore="loadmore"
    @on-dispatch="onDispatch"
    @on-item-click="onItemClick"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeliveryList from './DeliveryList'
export default {
  name: 'dispatch-list',
  components: { DeliveryList },

  computed: {
    ...mapGetters('delivery', ['DispatchList'])
  },

  created () {
    this.refresh()
  },

  methods: {
    ...mapActions('delivery', ['getDispatch', 'clearDispatch']),
    refresh() {
      this.clearDispatch()
      this.getDispatch()
    },
    loadmore() {
      this.getDispatch()
    },
    onDispatch(info) {
      this.$router.push({ name: 'delivery-workbench', params: { info } })
    },
    onItemClick(id) {
      this.$router.push({ name: 'order-detail', params: { id } })
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>

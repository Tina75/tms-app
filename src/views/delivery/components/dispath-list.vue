<template>
  <delivery-list
    :list="DispatchList"
    @refresh="refresh"
    @loadmore="loadmore"/>

    <!-- <cube-scroll
    ref="scroll"
    :data="DispatchList"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul>
      <li v-for="item in DispatchList" :key="item.id" >
        <delivery-list-item :info="item"/>
      </li>
    </ul>
  </cube-scroll> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeliveryList from './DeliveryList'
export default {
  name: 'dispatch-list',
  components: { DeliveryList },
  data () {
    return {
    }
  },

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
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>

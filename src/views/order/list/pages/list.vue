<template>
  <div class="page">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      show-slider
      class="tab-bar"
      @change="updateView">
      <cube-tab v-for="item in tabs" :key="item.label" :label="item.label">
        <p class="tab-label">{{item.label}}</p>
        <p v-if="TabCount" class="tab-count">{{TabCount[item.value]}}</p>
      </cube-tab>
    </cube-tab-bar>
    <div class="wrapper">
      <component :is="current"/>
    </div>
  </div>
</template>

<script>
import ListAll from '../components/list-all'
import ListPickup from '../components/list-pickup'
import ListDelivery from '../components/list-delivery'
import ListSending from '../components/list-sending'
import ListArrival from '../components/list-arrival'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'order-list',
  metaInfo: { title: '订单管理' },
  components: { ListAll, ListPickup, ListDelivery, ListSending, ListArrival },
  data () {
    return {
      current: '',
      selectedLabel: '全部',
      tabs: [
        { label: '全部', componentName: 'list-all', value: 'all' },
        { label: '待提货', componentName: 'list-pickup', value: 'pickup' },
        { label: '待送货', componentName: 'list-delivery', value: 'delivery' },
        { label: '在途', componentName: 'list-sending', value: 'sending' },
        { label: '已完成', componentName: 'list-arrival', value: 'arrival' }
      ]
    }
  },

  computed: {
    ...mapGetters('order/list', ['TabCount', 'AllList', 'PickupList', 'DeliveryList', 'SendingList', 'ArrivalList'])
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      switch (vm.selectedLabel) {
        case '全部':
          if (vm.AllList.length) {
            vm.clearAll()
            vm.getAll()
          }
          break
        case '待送货':
          if (vm.DeliveryList.length) {
            vm.clearDelivery()
            vm.getDelivery()
          }
          break
        case '待提货':
          if (vm.PickupList.length) {
            vm.clearPickup()
            vm.getPickup()
          }
          break
        case '在途':
          if (vm.SendingList.length) {
            vm.clearSending()
            vm.getSending()
          }
          break
        case '已完成':
          if (vm.ArrivalList.length) {
            vm.clearArrival()
            vm.getArrival()
          }
          break
      }
    })
  },

  mounted() {
    this.updateView(this.selectedLabel)
    this.getTabCount()
  },
  methods: {
    ...mapActions('order/list', ['getTabCount',
      'getAll', 'clearAll',
      'getDelivery', 'clearDelivery',
      'getPickup', 'clearPickup',
      'getSending', 'clearSending',
      'getArrival', 'clearArrival']),
    updateView(label) {
      this.current = this.tabs.find(item => item.label === label).componentName
    }
  }
}

</script>
<style lang="stylus" scoped>
.page .wrapper
  height calc(100% - 50px)
.tab-bar
  background white
  height 50px
  font-size 15px
  .tab-label
    margin-top: 5px;
    font-size: 13px;
    line-height: 18px;
    color: #333333;
    margin-bottom: 5px;
  .tab-count
    font-size: 13px;
    line-height: 18px;
    min-height 18px
    color: #666666;
    margin-bottom: 5px;
  .cube-tab_active
    .tab-label, .tab-count
      color: #00A4BD;

</style>

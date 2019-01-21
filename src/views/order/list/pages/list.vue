<template>
  <div class="page">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      show-slider
      class="tab-bar"
      @change="updateView">
      <cube-button class="btn-light" @click="$router.back()">返回上一页</cube-button>

      <cube-tab v-for="item in tabs" :key="item.label" :label="item.label">
        <p class="tab-label">{{item.label}}</p>
        <p v-if="TabCount" class="tab-count">{{TabCount[item.value]}}</p>
      </cube-tab>
    </cube-tab-bar>
    <div class="wrapper">
      <keep-alive>
        <component :is="current"/>
      </keep-alive>
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
        { label: '已到货', componentName: 'list-arrival', value: 'arrival' }
      ]
    }
  },

  computed: {
    ...mapGetters('order/list', ['TabCount'])
  },

  mounted() {
    this.updateView(this.selectedLabel)
    this.getTabCount()
  },
  methods: {
    ...mapActions('order/list', ['getTabCount']),
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

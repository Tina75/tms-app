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
      <keep-alive>
        <component :is="current"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DispatchList from '../components/dispath-list.vue'
import SendList from '../components/send-list'
import SendingList from '../components/sending-list'
import ArrivalList from '../components/arrival-list'
export default {
  name: 'delivery-list',
  metaInfo: { title: '送货管理' },
  components: { DispatchList, SendList, SendingList, ArrivalList },
  data () {
    return {
      current: '',
      selectedLabel: '待调度',
      tabs: [
        { label: '待调度', componentName: 'dispatch-list', value: 'dispatch' },
        { label: '待发运', componentName: 'send-list', value: 'send' },
        { label: '在途', componentName: 'sending-list', value: 'sending' },
        { label: '已到货', componentName: 'arrival-list', value: 'arrival' }]
    }
  },

  computed: {
    ...mapGetters('delivery', ['TabCount'])
  },

  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.getTabCount()
    })
  },
  mounted() {
    this.updateView(this.selectedLabel)
  },
  methods: {
    ...mapActions('delivery', ['getTabCount']),
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

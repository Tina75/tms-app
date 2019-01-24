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
import { mapGetters, mapActions } from 'vuex'
import DispatchList from '../components/list/dispath-list.vue'
import SendList from '../components/list/send-list'
import SendingList from '../components/list/sending-list'
import ArrivalList from '../components/list/arrival-list'
import { setAppRightBtn } from '@/libs/bridgeUtil'

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
    ...mapGetters('delivery',
      ['TabCount',
        'DispatchList',
        'SendList',
        'SendingList',
        'ArrivalList'])
  },

  watch: {
    current (value) {
      this.setRightBtn()
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      const tab = to.query.tab
      if (tab) { vm.selectedLabel = vm.tabs[tab - 1].label }
      vm.getTabCount()
      vm.setRightBtn()
      switch (vm.selectedLabel) {
        case '待调度':
          if (vm.DispatchList.length) {
            vm.clearDispatch()
            vm.getDispatch()
          }
          break
        case '待发运':
          if (vm.SendList.length) {
            vm.clearSend()
            vm.getSend()
          }
          break
        case '在途':
          if (vm.SendingList.length) {
            vm.clearSending()
            vm.getSending()
          }
          break
        case '已到货':
          if (vm.ArrivalList.length) {
            vm.clearArrival()
            vm.getArrival()
          }
          break
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    setAppRightBtn([{ text: '', action: () => {} }])
    next()
  },

  mounted() {
    setAppRightBtn([{ text: '调度', action: () => { this.$router.push({ name: 'delivery-workbench-multi' }) } }])
    this.updateView(this.selectedLabel)
  },
  methods: {
    ...mapActions('delivery', ['getTabCount',
      'getDispatch', 'clearDispatch',
      'getSend', 'clearSend',
      'getSending', 'clearSending',
      'getArrival', 'clearArrival']),
    updateView(label) {
      this.current = this.tabs.find(item => item.label === label).componentName
    },
    setRightBtn() {
      if (this.current === 'dispatch-list') {
        setAppRightBtn([{ text: '调度', action: () => { this.$router.push({ name: 'delivery-workbench-multi' }) } }])
      } else {
        setAppRightBtn([{ text: '', action: () => {} }])
      }
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

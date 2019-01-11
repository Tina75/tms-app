<template>
  <div class="page">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      show-slider
      class="tab-bar"
      @change="updateView"/>
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
      selectedLabel: '待发运',
      tabs: [{ label: '待调度', componentName: 'dispatch-list' }, { label: '待发运', componentName: 'send-list' }, { label: '在途', componentName: 'sending-list' }, { label: '已到货', componentName: 'arrival-list' }]
    }
  },

  computed: {
    ...mapGetters(['DispatchList'])
  },

  mounted() {
    this.updateView(this.selectedLabel)
  },
  methods: {
    ...mapActions(['getDispatch']),
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

</style>

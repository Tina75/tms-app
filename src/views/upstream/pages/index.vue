<template>
  <div class="upstream page">
    <div v-if="totalCnt" class="header">
      <cube-tab-bar
        v-model="selectedLabel"
        show-slider
        class="tab-bar">
        <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.label" :value="item.label">
          <p class="tab-label">{{item.label}}</p>
          <p class="tab-count">{{statusCnt[item.key]}}</p>
        </cube-tab>
      </cube-tab-bar>
    </div>
    <div v-if="totalCnt" class="list-bar">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item) in tabs" :key="item.label" :label="item.label">
          <CardList :card-list="UpstreamList[item.key]" :keys="item.key"/>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
    <no-data v-else message="老板，还没有上游给您派单多找找关系啊～">
      <img slot="img" src="@/assets/img-no-upstream.png">
    </no-data>
  </div>
</template>
<script>
import CardList from '../components/CardList'
import NoData from '@/components/NoData'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'upstream',
  metaInfo: {
    title: '上游来单'
  },
  components: {
    CardList,
    NoData
  },
  data () {
    return {
      selectedLabel: '全部',
      cache: {},
      tabs: [
        {
          label: '全部',
          key: 'all',
          data: []
        },
        {
          label: '待接收',
          key: 'waitAccept',
          data: []
        },
        {
          label: '已接收',
          key: 'accepted',
          data: []
        },
        {
          label: '已拒绝',
          key: 'rejected',
          data: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['statusCnt', 'UpstreamList', 'upstreamNext']),
    totalCnt () {
      return this.statusCnt['rejected'] + this.statusCnt['accepted'] + this.statusCnt['waitAccept']
    }
  },
  watch: {
    selectedLabel (val) {
      this.tabChange(val)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUpstreamStatusCnt()
      if (vm.selectedLabel) {
        vm.tabChange(vm.selectedLabel)
      }
    })
  },
  mounted () {
    // this.selectedLabel = this.tabs[0].label
  },
  methods: {
    ...mapActions(['getUpstreamStatusCnt', 'initList']),
    async tabChange (val) {
      let key = ''
      this.tabs.map(el => {
        if (el.label === val) {
          key = el.key
        }
      })
      if (!this.cache[key]) {
        await this.initList({ key })
        // this.cache[key] = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.upstream
  user-select none
  background #EFEFEF
  .header
    background #fff
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
  .list-bar
    height calc(100% - 50px)
    overflow-y auto
</style>
<style lang="stylus">
.upstream
  .cube-tab-panels-group
    height 100%
  .cube-tab-panels
    height 100%
  .cube-tab-panel
    height 100%
</style>

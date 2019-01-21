<template>
  <div class="upstream page">
    <div class="header">
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
    <div class="list-bar">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item) in tabs" :key="item.label" :label="item.label">
          <cube-scroll
            ref="scroll"
            :data="UpstreamList[item.key]"
            :options="scrollOptions"
            @pulling-down="onPullingDown(item.key)"
            @pulling-up="onPullingUp(item.key)">
            <CardList :card-list="UpstreamList[item.key]" :keys="item.key"/>
          </cube-scroll>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </div>
</template>
<script>
import CardList from '../components/CardList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'upstream',
  metaInfo: {
    title: '上游来单'
  },
  components: {
    CardList
  },
  data () {
    return {
      selectedLabel: '',
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
      ],
      scrollOptions: {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
        pullUpLoad: true,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    ...mapGetters(['statusCnt', 'UpstreamList'])
  },
  watch: {
    selectedLabel (val) {
      this.tabChange(val)
    }
  },
  mounted () {
    this.selectedLabel = this.tabs[0].label
    this.getUpstreamStatusCnt()
  },
  methods: {
    ...mapActions(['getUpstreamStatusCnt', 'initList', 'reFresh', 'loadMore']),
    onPullingDown (key) {
      this.reFresh({ key })
    },
    onPullingUp (key) {
      this.loadMore({ key })
    },
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

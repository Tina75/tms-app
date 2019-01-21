<template>
  <div class="receipt page">
    <div class="header">
      <cube-tab-bar
        v-model="selectedLabel"
        show-slider
        class="tab-bar">
        <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.label" :value="item.label">
          <p class="tab-label">{{item.label}}</p>
          <p class="tab-count">{{receiptStatusCnt[item.key]}}</p>
        </cube-tab>
      </cube-tab-bar>
    </div>
    <div class="list-bar">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item) in tabs" :key="item.label" :label="item.label">
          <cube-scroll
            ref="scroll"
            :data="item.data"
            :options="scrollOptions"
            @pulling-down="onPullingDown(item.key)"
            @pulling-up="onPullingUp(item.key)">
            <CardList :ref="item.key" :status="item.receiptStatus" @change="(data) => { dataChange(item.key, data) }"/>
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
  name: 'receipt',
  metaInfo: {
    title: '回单管理'
  },
  components: {
    CardList
  },
  data () {
    return {
      selectedLabel: '',
      tabs: [
        {
          label: '全部',
          key: 'total',
          receiptStatus: '',
          data: []
        },
        {
          label: '代签收',
          key: 'waiting_sign',
          receiptStatus: '-1',
          data: []
        },
        {
          label: '待回收',
          key: 'waiting_recovery',
          receiptStatus: '0',
          data: []
        },
        {
          label: '待返厂',
          key: 'waiting_return_factory',
          receiptStatus: '1',
          data: []
        },
        {
          label: '已返厂',
          key: 'already_returned_factory',
          receiptStatus: '2',
          data: []
        }
      ],
      scrollOptions: {
        pullDownRefresh: true,
        pullUpLoad: true,
        directionLockThreshold: 0
      },
      keywords: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['receiptStatusCnt']),
    tabIndex () {
      return this.$route.query.tab || 0
    }
  },
  mounted () {
    this.selectedLabel = this.tabs[this.tabIndex].label
    this.getReceiptStatusCnt()
  },
  methods: {
    ...mapActions(['getReceiptStatusCnt']),
    onPullingDown (ref) {
      this.$refs[ref][0].refresh()
    },
    onPullingUp (ref) {
      this.$refs[ref][0].load()
    },
    dataChange (key, data) {
      this.tabs.map(el => {
        if (el.key === key) {
          el.data = data
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  background #fff
.tab-bar
  background white
  height 50px
  font-size 15px
  .tab-label
    margin-top: 5px
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
.receipt
  .cube-tab-panels-group
    height 100%
  .cube-tab-panels
    height 100%
  .cube-tab-panel
    height 100%
</style>

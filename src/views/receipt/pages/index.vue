<template>
  <div class="receipt page">
    <div v-if="receiptStatusCnt.totalCnt" class="header">
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
    <div v-if="receiptStatusCnt.totalCnt" class="list-bar">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item) in tabs" :key="item.label" :label="item.label">
          <CardList :card-list="receiptList[item.key]" :keys="item.key"/>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
    <no-data v-else  class="emty-data"  message="老板，还没有回单记得催一催哦～">
      <img slot="img" src="@/assets/img-no-receipt.png">
    </no-data>
  </div>
</template>
<script>
import CardList from '../components/CardList'
import NoData from '@/components/NoData'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'receipt',
  metaInfo: {
    title: '回单管理'
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
          key: 'total',
          data: []
        },
        {
          label: '待签收',
          key: 'waiting_sign',
          data: []
        },
        {
          label: '待回收',
          key: 'waiting_recovery',
          data: []
        },
        {
          label: '待返厂',
          key: 'waiting_return_factory',
          data: []
        },
        {
          label: '已返厂',
          key: 'already_returned_factory',
          data: []
        }
      ],
      scrollOptions: {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
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
    ...mapGetters(['receiptStatusCnt', 'receiptList']),
    tabIndex () {
      return this.$route.query.tab || 0
    }
  },
  watch: {
    selectedLabel (val) {
      this.tabChange(val)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getReceiptStatusCnt()
      if (vm.selectedLabel) {
        vm.tabChange(vm.selectedLabel)
      }
    })
  },
  // mounted () {
  //   this.selectedLabel = this.tabs[this.tabIndex].label
  // },
  methods: {
    ...mapActions(['getReceiptStatusCnt', 'initReceiptList']),
    async tabChange (val) {
      let key = ''
      this.tabs.map(el => {
        if (el.label === val) {
          key = el.key
        }
      })
      if (!this.cache[key]) {
        await this.initReceiptList({ key })
        // this.cache[key] = true
      }
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
.emty-data
  max-height 100%
</style>
<style lang="stylus">
.receipt
  .cube-tab-panels-group
    height 100%
  .cube-tab-panels
    height 100%
  .cube-tab-panel
    height 100%
.cube-dialog-title-def
  font-weight 600
.cube-input
  border-color #F9F9F9
  background-color rgba(249,249,249,1)
.cube-dialog-btn:first-child
  color #333
</style>

<template>
  <div class="receipt page">
    <div class="header">
      <cube-tab-bar
        v-model="selectedLabel"
        :data="tabs"
        show-slider
        class="tab-bar"/>
    </div>
    <div class="list-bar">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item) in tabs" :key="item.label" :label="item.label">
          <cube-scroll
            ref="scroll"
            :data="cardList"
            :options="scrollOptions"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp">
            <CardList :ref="item.key" :status="item.acceptStatus" @change="(data) => { dataChange(item.key, data) }"/>
            <!-- <Card
              v-for="(el, index) in cardList"
              :key="index"
              :data="el"
              @card-action="handleClick"
              @click.native="toDetail(el.shipperOrderId)"/> -->
          </cube-scroll>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </div>
</template>
<script>
import CardList from '../components/CardList'
import * as Api from '../libs/api'
export default {
  name: 'receipt',
  metaInfo: {
    title: 'receipt'
  },
  components: {
    CardList
  },
  data () {
    return {
      selectedLabel: '全部',
      tabs: [
        {
          label: '全部',
          key: 'all',
          receiptStatus: '',
          data: []
        },
        {
          label: '代签收',
          key: 'waitReceipt',
          receiptStatus: '-1',
          data: []
        },
        {
          label: '待回收',
          key: 'waitRecycle',
          receiptStatus: '0',
          data: []
        },
        {
          label: '待返厂',
          key: 'waitBack',
          receiptStatus: '1',
          data: []
        },
        {
          label: '已返厂',
          key: 'backedFactory',
          receiptStatus: '2',
          data: []
        }
      ],
      cardList: [],
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
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      Api.initList(this.keywords)
        .then(response => {
          this.cardList = response.data.data.list
        })
    },
    onPullingDown () {
      this.initList()
    },
    onPullingUp () {
      this.keywords.pageNo += 1
      Api.initList(this.keywords)
        .then(response => {
          this.cardList = this.cardList.concat(response.data.data.list)
        })
    },
    toDetail (id) {
      // 路由跳转
      this.$router.push({
        params: { id },
        name: 'receipt-detail'
      })
    },
    handleClick () {

    },
    // 接受
    recept () {},
    // 拒绝
    refuse () {}
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

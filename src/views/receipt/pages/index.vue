<template>
  <div class="receipt-order">
    <div class="header">
      <Title>回单管理</Title>
      <cube-tab-bar
        v-model="selectedLabel"
        :data="tabs"
        show-slider
        class="tab-bar"
        @click="clickHandler"
        @change="changeHandler"/>
    </div>
    <div class="list-bar">
      <Card
        v-for="(el, index) in cardList"
        :key="index"
        :data="el"
        @click.native="toDetail(el.shipperOrderId)"/>
    </div>
  </div>
</template>
<script>
import Title from '@/views/upstream/components/Title'
import Card from '../components/Card'
import Server from '@/libs/server'
import router from '@/router'
export default {
  name: 'receipt-order',
  metaInfo: {
    title: 'receiptOrder'
  },
  components: {
    Title,
    Card
  },
  data () {
    return {
      selectedLabel: '代签收',
      tabs: [
        {
          label: '代签收'
        },
        {
          label: '待回收'
        },
        {
          label: '待反厂'
        },
        {
          label: '已反厂'
        }
      ],
      cardList: [],
      keywords: {
        pageNo: 0,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      Server({
        mock: true,
        method: 'post',
        url: '/busconnector/shipper/list',
        params: this.keywords
      }).then(response => {
        console.log(response)
        this.cardList = response.data.data.list
      })
    },
    clickHandler (label) {
    },
    changeHandler (label) {
    },
    toDetail (id) {
      // 路由跳转
      router.push({
        params: {
          id
        },
        name: 'upstream-detail'
      })
    },
    changePage (current) {
      debugger
      this.selectedLabel = this.tabs[current]
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
</style>

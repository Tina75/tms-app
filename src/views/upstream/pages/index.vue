<template>
  <div class="upstream">
    <div class="header">
      <Title>上游来单</Title>
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
import Title from '../components/Title'
import Card from '../components/Card'
import Server from '@/libs/server'
import router from '@/router'
export default {
  name: 'upstream',
  metaInfo: {
    title: 'upstream'
  },
  components: {
    Title,
    Card
  },
  data () {
    return {
      selectedLabel: '全部',
      tabs: [
        {
          label: '全部'
        },
        {
          label: '待接收'
        },
        {
          label: '已接收'
        },
        {
          label: '已拒绝'
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
.upstream
  user-select none
.header
  background #fff
.tab-bar
  background white
  height 50px
  font-size 15px
</style>

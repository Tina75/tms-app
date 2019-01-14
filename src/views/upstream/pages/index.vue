<template>
  <div class="upstream page">
    <div class="header">
      <!-- <Title>上游来单</Title> -->
      <cube-tab-bar
        v-model="selectedLabel"
        :data="tabs"
        show-slider
        class="tab-bar"
        @click="clickHandler"
        @change="changeHandler"/>
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
            <Card
              v-for="(el, index) in cardList"
              :key="index"
              :data="el"
              @card-action="handleClick"
              @click.native="toDetail(el.shipperOrderId)"/>
          </cube-scroll>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </div>
</template>
<script>
import Card from '../components/Card'
import router from '@/router'
import * as API from '../libs/api'
export default {
  name: 'upstream',
  metaInfo: {
    title: 'upstream'
  },
  components: {
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
      API.initList(this.keywords)
        .then(response => {
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
    onPullingDown () {
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    onPullingUp () {
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    handleClick (type, id) {
      if (type === 'recept') {
        this.recept(id)
      } else if (type === 'refuse') {
        this.refuse(id)
      }
    },
    // 接受
    recept (id) {
      API.receipt(id)
        .then(() => {
          this.initList()
        })
    },
    // 拒绝
    refuse (id) {
      API.refuse(id)
        .then(() => {
          this.initList()
        })
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

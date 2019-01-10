<template>
  <div class="page">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      show-slider
      class="tab-bar"
      @change ="handleChange"
      @click="handleClick"/>
    <div class="wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :initial-index="initialIndex"
        :show-dots="false"
        :options="slideOptions"
        @change="changePage">
        <cube-slide-item>
          <cube-scroll
            ref="scroll"
            :data="DispatchList"
            :options="scrollOptions"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp">
            <ul class="list-wrapper">
              <li v-for="item in DispatchList" :key="item.orderId" class="list-item">
                <div class="list-item__time">
                  <span class="cube-ml-15">{{item.createTime | datetimeFormat}}</span>
                  <span v-if="item.collectionMoney>0" class="list-item__flag">代</span>
                </div>
                <div class="list-item__body">
                  <p class="list-item__city">{{item.start}} → {{item.end}}</p>
                  <div>
                    <span class="list-item__count">{{item.weight}}吨</span>
                    <span class="list-item__count">{{item.volume}}方</span>
                    <span class="list-item__count">{{item.quantity}}件</span>
                  </div>
                  <p class="cube-mt-5">{{item.consignerName}}</p>
                  <p class="list-item__number">客户单号：{{item.customerOrderNo}}</p>
                </div>
                <div class="list-item__money">
                  <p class="cube-c-black cube-font-12 cube-ml-15">应收费用({{item.settlementType|settlementTypeFormat}})</p>
                  <div class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{item.pickupFee |moneyFormat}}</span>/元</div>
                  <cube-button class="list-item__btn" :outline="true"  :inline="true" >调度</cube-button>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
            :data="DispatchList"
            :options="scrollOptions">
            <ul class="list-wrapper">
              <li v-for="(item, index) in DispatchList" :key="index" class="list-item">
                <div class="top">
                  <img :src="item.avatar" class="avatar">
                  <!-- <span class="time">{{resolveTitle(item)}}</span> -->
                </div>
                <div class="middle is-bold line-height">{{item.orderId}}</div>
                <!-- <div>{{resolveQuestionFollowers(item)}}</div> -->
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
            :data="DispatchList"
            :options="scrollOptions">
            <ul class="list-wrapper">
              <li v-for="(item, index) in DispatchList" :key="index" class="list-item">
                <div class="top">
                  <img :src="item.avatar" class="avatar">
                  <!-- <span class="time">{{resolveTitle(item)}}</span> -->
                </div>
                <div class="middle is-bold line-height">{{item.orderId}}</div>
                <!-- <div>{{resolveQuestionFollowers(item)}}</div> -->
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'delivery-list',
  metaInfo: { title: '送货管理' },
  data () {
    return {
      selectedLabel: '待调度',
      tabs: [{ label: '待调度' }, { label: '待发运' }, { label: '在途' }, { label: '已到货' }],
      initialIndex: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        pullDownRefresh: true,
        pullUpLoad: true,
        directionLockThreshold: 0
      }
    }
  },

  computed: {
    ...mapGetters(['DispatchList'])
  },

  created() {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(1)
      vm.getDispatch()
    })
  },
  methods: {
    ...mapActions(['getDispatch']),
    handleClick() {

    },
    handleChange() {

    },
    changePage (current) {
      this.selectedLabel = this.tabs[current].label
      console.log(current)
    },
    onPullingDown() {
    // 模拟更新数据
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
    // 模拟更新数据
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    }
  }
}

</script>
<style lang='stylus' >
.tab-bar
  background white
  height 50px
  font-size 15px
.list
  background #EFEFEF
  &-item
    background white
    margin-top 15px
    padding 10px 0
    font-size 14px
    color #666666
    position relative
    &__time
      height 20px
      line-height 20px
      position relative
    &__time:after
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-top 6px
    &__money:before
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-bottom 10px
    &__body
      padding-left 15px

    &__city
      color #333
      font-size 18px
      margin-top 20px
      font-weight bold
    &__count
      background #efefef
      display inline-block
      margin 5px 8px 5px 0
      border-radius 3px
      padding 3px 5px 2px 5px
      font-size 12px
    &__number
      line-height 25px
      margin-bottom 10px
    &__btn
      color #189CB2
      position absolute
      right 15px
      bottom 15px
      font-size 14px
      min-width 50px
    &__flag
      background #FA8C16
      color white
      border-radius 2px
      display inline-block
      height 18px
      font-size 12px
      line-height 20px
      padding 0 3px
      position absolute
      right 15px
      top 0
</style>

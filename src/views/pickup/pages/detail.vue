<template>
  <div class="pickup-detail">
    <cube-scroll-nav @change="changeHandler">
      <div slot="prepend" class="status-block">
        <h2>{{statusMap[pickupDetail.status]}}</h2>
        <p>{{pickupDetail.createTime|datetimeFormat}}</p>
      </div>
      <cube-scroll-nav-panel
        v-for="(item, index) in pageData"
        :key="index"
        :label="item.name">
        <ul>
          <component :is="item.component"/>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div class="handle-btns">
      <a class="light-btn">查看位置</a>
      <a>确定</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PickupInfo from '../components/PickupInfo'
import OrderList from '../components/OrderList'
import CostDetail from '../components/CostDetail'

export default {
  name: 'pickup-detail',
  metaInfo: {
    title: '提货管理详情'
  },
  components: { PickupInfo, OrderList, CostDetail },
  data () {
    return {
      pageData: [
        {
          name: '提货单信息',
          component: 'PickupInfo'
        },
        {
          name: '货物明细',
          component: 'OrderList'
        },
        {
          name: '应收费用',
          component: 'CostDetail'
        }
      ],
      statusMap: {
        1: '待提货',
        2: '提货中',
        3: '已提货'
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['pickupDetail'])
  },
  methods: {
    ...mapActions('pickup', ['getPickupDetail']),
    changeHandler (label) {
      console.log('changed to:', label)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPickupDetail(to.params.id)
    })
  }
}
</script>
<style lang="stylus" scoped>
.pickup-detail
  height: 100%
  background-color: #EFEFEF;
  display: flex
  flex-direction column
  .cube-scroll-nav
    flex: 1
  .handle-btns
    height: 45px
    display: flex
    a
      flex: 1
      background: #27A3BD;
      text-align: center
      height: 45px
      line-height: 45px
      font-size: 17px
      color: #ffffff
      &.light-btn
        background: #32C4D3;
  .status-block
    height: 90px
    background-color: #252A2F
    padding: 25px 15px
    h2
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 5px
    p
      color: #ffffff
      font-size: 15px;
  >>> .cube-scroll-content
    width 100%
    .cube-scroll-nav-bar-items
      display: flex
      .cube-scroll-nav-bar-item
        flex 1
        padding-top: 15px;
        padding-bottom: 15px;
  >>> .cube-scroll-nav-panel
    .cube-sticky-ele
      height 0
      visibility: hidden
</style>

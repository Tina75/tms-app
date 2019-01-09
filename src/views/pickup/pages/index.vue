<template>
  <div class="pickup">
    <cube-tab-bar
      v-model="currentTab"
      :data="tabs"
      :show-slider="true"
      :use-transition="true"
      @change="changeHandler">
    </cube-tab-bar>
    <div class="scroll-list-wrap">
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DispatchingList from '../components/DispatchingList'
import BePickingList from '../components/BePickingList'
import PickingList from '../components/PickingList'
import PickedList from '../components/PickedList'

export default {
  name: 'pickup',
  metaInfo: {
    title: '提货管理'
  },
  components: { DispatchingList, BePickingList, PickingList, PickedList },
  data () {
    return {
      currentTab: 'DispatchingList',
      tabs: [
        {
          label: '待调度',
          value: 'DispatchingList'
        },
        {
          label: '待提货',
          value: 'BePickingList'
        },
        {
          label: '提货中',
          value: 'PickingList'
        },
        {
          label: '已提货',
          value: 'PickedList'
        }
      ]
    }
  },
  methods: {
    clickHandler () {},
    changeHandler (label, value) {
      this.currentComponent = value
    }
  }
}
</script>
<style scoped lang="stylus">
.pickup
  background-color: #EFEFEF;
  .cube-tab-bar
    background-color: #ffffff;
    height: 50px
    margin-bottom: 15px;
  .order-item
    background-color: #ffffff;
    margin-bottom: 15px;
    padding: 10px 0 10px 15px;
    .item-header
      padding-bottom: 10px;
      span
        font-size: 14px;
        color: #666666
        line-height: 20px;
      i
        display: block
        float: right
        width 16px
        height: 16px
        margin-right: 15px;
        background-color: #FCAF3B;
        line-height: 16px;
        font-size: 12px;
        font-style: normal
        text-align: center
        color: #ffffff;
    .item-content
      padding: 10px 0
      .order-route
        margin-bottom: 5px;
        span
          line-height: 25px;
          font-size: 18px;
          color: #333333;
          font-weight: bold
      .order-stat
        margin-bottom: 10px;
        span
          display: inline-block
          vertical-align: middle
          background-color: #F3F5F9;
          margin-right: 5px;
          padding: 0 5px
          color #333333
          font-size: 12px;
          line-height: 17px;
      .order-custom
        font-size: 14px;
        line-height: 20px;
        color: #666666;
    .item-footer
      padding-top: 10px;
      display: flex
      flex-direction row
      align-items center
      .order-cost
        flex 1
        .cost-label
          color: #333333
          font-size: 12px;
          line-height: 17px;
          text-align: left
        .cost-money
          color: #FA8C16
          font-size: 20px;
          line-height: 28px;
          text-align: left
          span
            font-size: 14px;
      .order-btns
        margin-right: 15px;
        a
          display: inline-block
          padding: 5px 13px
          text-align: center
          line-height: 20px;
          font-size: 14px;
          border-radius: 3px;
          border-style: solid;
          border-width: 1px;
          border-color: #00A4BD;
          color: #00A4BD;
          &:not(:last-child)
            margin-right: 15px;
          &.grey
            color: #999999
            border-color: #999999;
</style>

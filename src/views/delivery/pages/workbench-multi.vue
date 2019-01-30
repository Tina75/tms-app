<!-- 调度工作台 -->
<template>
  <div class="page">
    <dispatch-city
      :start-code.sync="startCode"
      :end-code.sync="endCode" />
    <cube-scroll
      ref="scroll"
      :data="DispatchList"
      :options="options"
      class="scroll-wrap"
      @pulling-down="refresh"
      @pulling-up="loadmore">
      <ul>
        <li v-for="item in DispatchList" :key="item.id" >
          <workbench-list-item :info="item" @update-city="updateCity"/>
        </li>
      </ul>
    </cube-scroll>
    <div class="footer">
      <div class="footer-calc">
        <div class="select">
          <cube-checkbox v-model="checkAll" class="cube-font-18">
            <span class="cube-font-15">全选</span>
          </cube-checkbox>
          <span class="cube-c-green">{{totalCount}}</span>单
          <span class="ploy">分摊策略：{{allocationStrategy}} <i class="iconfont icon-ico_up"/></span>
        </div>
        <div class="total">
          合计&nbsp;
          <div v-if="totalWeight"><span class="cube-c-green">{{totalWeight}}</span>吨&nbsp;</div>
          <div v-if="totalVolume"><span class="cube-c-green">{{totalVolume}}</span>方&nbsp;</div>
          <div v-if="totalQuantity"><span class="cube-c-green">{{totalQuantity}}</span>件</div>
        </div>
      </div>
      <cube-button class="btn-bottom"  @click="doDispatch">确定</cube-button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import DispatchCity from '../components/dispach-city'
import WorkbenchListItem from '../components/ListItemWorkbench.vue'
export default {
  name: 'delivery-workbench-multi',
  components: { DispatchCity, WorkbenchListItem },
  metaInfo: { title: '调度' },
  data () {
    return {
      startCode: -1,
      endCode: -1,
      checkAll: false,
      allocationStrategy: ''
    }
  },

  computed: {
    ...mapGetters('delivery', ['DispatchList']),
    options() {
      return {
        pullDownRefresh: { pullDownRefresh: 60, stopTime: 600, txt: '刷新成功' },
        pullUpLoad: true,
        scrollbar: false
      }
    },
    totalWeight() {
      return this.getCountByKey('weight')
    },
    totalVolume() {
      return this.getCountByKey('volume')
    },
    totalQuantity() {
      return this.getCountByKey('quantity')
    },
    totalCount() {
      return this.DispatchList.filter(item => item.checked === true).length
    }
  },
  watch: {
    checkAll: function(val) {
      this.DispatchList.forEach(item => { item.checked = val })
      this.updateCity()
    }
  },

  activated () {
    this.refresh()
    this.startCode = -1
    this.endCode = -1
    this.checkAll = false
  },

  methods: {
    ...mapActions('delivery', ['getDispatch', 'clearDispatch', 'dispatchOrder']),
    refresh() {
      this.clearDispatch()
      this.getDispatch().then(() => { this.checkAll = false })
      this.updateCity()
    },
    loadmore() {
      this.getDispatch()
    },
    getCountByKey(key) {
      let checkedList = this.DispatchList.filter(item => item.checked === true)
      return checkedList.length && checkedList.reduce((obj1, obj2) => {
        let obj = {}
        obj[key] = obj1[key] + obj2[key]
        return obj
      })[key]
    },
    doDispatch() {
      let ids = this.DispatchList.filter(item => item.checked).map(ele => ele.id)
      if (this.startCode <= 0) return window.toast('请选择发货城市')
      if (this.endCode <= 0) return window.toast('请选择收货城市')
      if (!ids.length) return window.toast('请至少选择一单')
      const data = {
        start: this.startCode,
        end: this.endCode,
        orderIds: ids
      }
      this.$createDialog({
        type: 'confirm',
        title: '提醒',
        // icon: 'cubeic-alert',
        content: '是否确认做送货调度，创建运单',
        onConfirm: () => {
          this.dispatchOrder(data).then(() => {
            window.toast('创建成功')
            this.$router.back()
          })
        } }).show()
    },
    updateCity() {
      const firstOne = this.DispatchList.find(item => item.checked === true)
      if (firstOne && this.startCode < 0 && this.endCode < 0) {
        this.startCode = firstOne.start
        this.endCode = firstOne.end
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
.scroll-wrap
  height calc(100% - 190px)
.footer
  width 100%
  position fixed
  bottom 0
  z-index 10
  background white
  font-size 15px
  &-calc
    padding-right 15px
    // display flex
    // display -webkit-flex
    // align-items center
    color #666666
    .ploy
      float right
  .total
    height 44px
    line-height 44px
    padding-left 40px
    div
      display inline-block
  .select
    height 44px
    line-height 44px
    div
      display inline-block

  .btn-bottom
    padding 15px
    font-size 17px
    font-weight bold

</style>

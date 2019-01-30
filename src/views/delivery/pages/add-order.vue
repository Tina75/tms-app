<!-- 调度工作台 -->
<template>
  <div class="page">
    <!-- <dispatch-city
      :start-code.sync="startCode"
      :end-code.sync="endCode" /> -->
    <cube-scroll
      ref="scroll"
      :data="DispatchList"
      :options="options"
      class="scroll-wrap"
      @pulling-down="refresh"
      @pulling-up="loadmore">
      <ul>
        <li v-for="item in DispatchList" :key="item.id" >
          <workbench-list-item :info="item"/>
        </li>
      </ul>
    </cube-scroll>
    <div class="footer">
      <div class="footer-calc">
        <div class="select">
          <cube-checkbox v-model="checkAll" class="cube-font-18">
            <span class="cube-font-15 cube-c-black">全选</span>
          </cube-checkbox>
          <span class="cube-c-green">{{totalCount}}</span>单
          <span class="ploy" @click.stop="showPicker">分摊策略：{{allocationStrategy|allocationStrategy}} <i class="iconfont icon-ico_up cube-font-12"/></span>
        </div>
        <div class="total">
          合计&nbsp;&nbsp;&nbsp;
          <div v-if="totalWeight"><span class="cube-c-green">{{totalWeight}}</span>吨&nbsp;</div>
          <div v-if="totalVolume"><span class="cube-c-green">{{totalVolume}}</span>方&nbsp;</div>
          <div v-if="totalQuantity"><span class="cube-c-green">{{totalQuantity}}</span>件</div>
        </div>
      </div>
      <!-- <div class="footer-calc">
        <cube-checkbox v-model="checkAll">全选</cube-checkbox>
        <span class="cube-c-green">{{totalCount}}</span>单
        <div style="float:right">
          合计&nbsp;
          <div v-if="totalWeight"><span class="cube-c-green">{{totalWeight}}</span>吨&nbsp;</div>
          <div v-if="totalVolume"><span class="cube-c-green">{{totalVolume}}</span>方&nbsp;</div>
          <div v-if="totalQuantity"><span class="cube-c-green">{{totalQuantity}}</span>件</div>
        </div>
      </div> -->
      <cube-button class="btn-bottom"  @click.stop="save">保存</cube-button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
// import DispatchCity from '../components/dispach-city'
import WorkbenchListItem from '../components/ListItemWorkbench.vue'
export default {
  name: 'delivery-add-order',
  components: { WorkbenchListItem },
  metaInfo: { title: '添加订单' },
  data () {
    return {
      // startCode: -1,
      // endCode: -1,
      checkAll: false,
      allocationStrategy: ''
    }
  },

  computed: {
    ...mapGetters('delivery', ['DispatchList', 'Waybill']),
    ...mapGetters(['UserConfig']),
    options() {
      return {
        pullDownRefresh: { pullDownRefresh: 60, stopTime: 600, txt: '刷新成功' },
        pullUpLoad: { txt: { noMore: '没有更多数据了', more: '' } },
        scrollbar: { fade: true }
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
    },
    DispatchList: function(newList) {
      if (newList && newList.length) {
        const firstOne = newList[0]
        this.startCode = firstOne.start
        this.endCode = firstOne.end
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.refresh()
      vm.getWaybillDetail(to.params.id).then(() => {
        vm.allocationStrategy = vm.Waybill.allocationStrategy
      })
    })
  },
  mounted() {
  },
  methods: {
    ...mapActions('delivery', ['getWaybillDetail', 'getDispatch', 'clearDispatch', 'dispatchOrder', 'addBillOrder', 'updatetBillOrders']),
    refresh() {
      this.clearDispatch()
      this.getDispatch().then(() => { this.checkAll = false })
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
    async save() {
      let ids = this.DispatchList.filter(item => item.checked).map(ele => ele.id)
      this.addBillOrder(ids)
      await this.updatetBillOrders(this.$route.params.id)
      this.$router.back()
    },
    showPicker() {
      this.$createActionSheet({
        title: '请选择',
        pickerStyle: true,
        data: [
          { content: '按订单数分摊', value: 1 },
          { content: '按件数分摊', value: 2 },
          { content: '按重量分摊', value: 3 },
          { content: '按体积分摊', value: 4 }
        ],
        onSelect: (item, index) => {
          this.allocationStrategy = item.value
        }
      }).show()
    },
    doDispatch() {
      let ids = this.DispatchList.filter(item => item.checked).map(ele => ele.id)
      // if (!this.startCode) return window.toast('请选择始发地')
      // if (!this.endCode) return window.toast('请选择目的地')
      if (!ids.length) return window.toast('请至少选择一单')
      const data = {
        start: this.startCode,
        end: this.endCode,
        orderIds: ids,
        allocationStrategy: this.allocationStrategy
      }
      this.dispatchOrder(data).then(() => { this.$router.back() })
    }
  }
}

</script>
<style lang='stylus' scoped>
.scroll-wrap
  margin-bottom 64px
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
    color #333
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
    font-size 17px
    padding 15px
    font-weight bold

</style>

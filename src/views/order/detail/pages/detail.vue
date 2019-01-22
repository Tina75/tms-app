<template>
  <div class="order-detail">
    <cube-scroll-nav @change="changeHandler">
      <div slot="prepend" class="status-block">
        <h2>{{Detail.status | orderType}}</h2>
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
    <!-- <div class="handle-btns"> -->
    <!-- <cube-button  v-if="deleteBtnVisable(Detail)"  primary @click="handleClickDelete(Detail.id)">删除</cube-button>
      <cube-button v-if="editOrderBtnVisable(Detail)" class="btn-light" @click="handleClickEditOrder(Detail.id)">编辑</cube-button> -->
    <!-- <cube-button v-if="editBillBtnVisable(Detail)" @click="handleClickEditBill(Detail.id)">改单</cube-button> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrderBaseInfo from '../components/OrderBaseInfo'
import ReceiveAndSend from '../components/ReceiveAndSend'
import OrderCargoList from '../components/OrderCargoList'
import CostDetail from '../components/CostDetail'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'order-detail',
  metaInfo: {
    title: '订单详情'
  },
  components: { OrderBaseInfo, OrderCargoList, CostDetail, ReceiveAndSend },
  data () {
    return {
      pageData: [
        {
          name: '基本信息',
          component: 'OrderBaseInfo'
        },
        {
          name: '收发货人',
          component: 'ReceiveAndSend'
        },
        {
          name: '货物明细',
          component: 'OrderCargoList'
        },
        {
          name: '应付费用',
          component: 'CostDetail'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('order/detail', ['Detail'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDetail(to.params.id)
    })
  },
  beforeRouteLeave(to, from, next) {
    setAppRightBtn([{ text: '', action: () => {} }])
    next()
  },
  watch: {
    'Detail.status': function(val) {
      this.initTitleBtns()
    }
  },
  activated() {
    this.initTitleBtns()
  },

  methods: {
    ...mapActions('order/detail', ['getDetail']),
    changeHandler (label) {
      console.log('changed to:', label)
    },
    initTitleBtns() {
      let btnList = []
      if (this.deleteBtnVisable(this.Detail)) {
        btnList.push({ text: '删除', iconType: 'delete', action: () => { this.handleClickDelete(this.Detail) } })
      }
      if (this.editOrderBtnVisable(this.Detail)) {
        btnList.push({ text: '编辑', iconType: 'edit', action: () => { this.handleClickEditOrder(this.Detail.id) } })
      }
      setAppRightBtn(btnList)
    },
    handleClickDelete(info) {
      let msg = '确认删除订单？删除之后可以在电脑端订单回收站恢复'
      if (info.status === 50) { // 已回单
        msg = '订单删除后，提货单和运单将一并删除，且订单不支持再还原'
      } else if (info.status === 20 && info.pickup === 1) {
        msg = '订单删除后，提货单将一并删除，且订单不支持再还原'
      }
      this.$createDialog({
        type: 'confirm',
        title: '确认删除订单？',
        content: msg,
        onConfirm: () => {
          this.$emit('delete', info.id)
        }
      }).show()
    },
    handleClickEditOrder(id) {
      console.log(id)
      this.$router.push({ name: 'order-edit', params: { id } })
    },
    handleClickEditBill(id) {
      // this.$emit('editBill', id)
      // TODO:
    },

    deleteBtnVisable(item) {
      let arr = []
      const list = ['1000', '1001', '2000', '2001'] // 见文档
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      return list.includes(arr.join(''))
    },
    editOrderBtnVisable(item) {
      let arr = []
      const list = ['1000', '2000']
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      return list.includes(arr.join(''))
    },
    editBillBtnVisable(item) {
      let arr = []
      const list = ['1001', '1010', '2001', '2010', '3010', '3011', '4010', '4011', '5010', '5011']
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      return list.includes(arr.join(''))
    }
  }
}
</script>
<style lang="stylus" scoped>
  .order-detail
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
      .btn-light
          background #27C4D3
    .status-block
      height: 90px
      line-height 90px
      background-color: #252A2F
      padding: 0 15px
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
        // border-bottom 1px solid #ebebeb
        .cube-scroll-nav-bar-item
          flex 1
          padding-top: 15px;
          padding-bottom: 15px;
    >>> .cube-scroll-nav-panel
      .cube-sticky-ele
        height 0
        visibility: hidden
    >>> .cube-btn
          border-radius 0
</style>

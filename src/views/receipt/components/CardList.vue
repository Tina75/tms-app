<template>
  <cube-scroll
    ref="scroll"
    :data="cardList"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <Card
      v-for="(el, index) in cardList"
      :key="index"
      :data="el"
      @card-action="handleClick"
      @click.native="toDetail(el.id)"/>
  </cube-scroll>
</template>
<script>
import Card from '../components/Card'
import * as API from '../libs/api'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'upstream-list',
  components: {
    Card
  },
  props: {
    keys: {
      type: String,
      default: ''
    },
    cardList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['receiptNext']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.receiptNext[this.keys]
      }
    }
  },
  methods: {
    ...mapActions(['getReceiptStatusCnt', 'initReceiptList', 'receiptReFresh', 'receiptLoadMore']),
    toDetail (id) {
      // 路由跳转
      this.$router.push({
        params: { id },
        name: 'receipt-detail'
      })
    },
    onPullingDown () {
      this.receiptReFresh({ key: this.keys })
    },
    onPullingUp () {
      this.receiptLoadMore({ key: this.keys })
    },
    handleClick (type, item) {
      if (type === 'receipt') {
        this.receipt(item)
      } else if (type === 'uploadPic') {
        this.uploadPic(item)
      } else if (type === 'updatePic') {
        this.updatePic(item)
      } else if (type === 'backFactory') {
        this.backFactory(item)
      }
    },
    // 回收
    receipt (item) {
      this.$createDialog({
        type: 'prompt',
        title: '回收',
        prompt: {
          value: '',
          placeholder: '请输入回收人',
          maxlength: 15
        },
        onConfirm: (e, promptValue) => {
          const params = {
            orderIds: [item.id],
            recoveryName: promptValue,
            receiptStatus: 1,
            ids: [item.receiptOrder.orderId]
          }
          API.updateReceipt(params)
            .then(res => {
              this.getReceiptStatusCnt()
              this.initReceiptList({ key: this.keys })
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '回收成功'
              }).show()
            })
        }
      }, false).show()
    },
    // 返厂
    backFactory (item) {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '返厂',
        prompt: {
          value: '',
          placeholder: '请输入接收人',
          maxlength: 15
        },
        onConfirm: (e, promptValue) => {
          const params = {
            orderIds: [item.id],
            returnName: promptValue,
            receiptStatus: 2,
            ids: [item.receiptOrder.orderId]
          }
          API.updateReceipt(params)
            .then(res => {
              this.getReceiptStatusCnt()
              this.initReceiptList({ key: this.keys })
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '返厂成功'
              }).show()
            })
        }
      }, false).show()
    },
    uploadPic (item) {
      this.$router.push({
        query: { id: item.receiptOrder.id, type: 'add', tab: this.keys },
        name: 'receipt-upload'
      })
    },
    updatePic (item) {
      this.$router.push({
        query: { id: item.receiptOrder.id, type: 'update', orderId: item.id, tab: this.keys },
        name: 'receipt-upload'
      })
    }
  }
}
</script>

<template>
  <div>
    <Card
      v-for="(el, index) in cardList"
      :key="index"
      :data="el"
      @card-action="handleClick"
      @click.native="toDetail(el.id)"/>
  </div>
</template>
<script>
import Card from '../components/Card'
import * as API from '../libs/api'
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions(['getReceiptStatusCnt', 'initReceiptList']),
    toDetail (id) {
      // 路由跳转
      this.$router.push({
        params: { id },
        name: 'receipt-detail'
      })
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
          placeholder: '请输入回收人'
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
          placeholder: '请输入接收人'
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
        query: { id: item.receiptOrder.id, type: 'add' },
        name: 'receipt-upload'
      })
    },
    updatePic (item) {
      this.$router.push({
        query: { id: item.receiptOrder.id, type: 'update', orderId: item.id },
        name: 'receipt-upload'
      })
    }
  }
}
</script>

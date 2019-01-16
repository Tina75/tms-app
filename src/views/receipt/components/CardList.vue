<template>
  <div>
    <Card
      v-for="(el, index) in cardList"
      :key="index"
      :data="el"
      @card-action="handleClick"
      @click.native="toDetail(el.shipperOrderId)"/>
  </div>
</template>
<script>
import Card from '../components/Card'
import * as API from '../libs/api'
export default {
  name: 'upstream-list',
  components: {
    Card
  },
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cardList: [],
      keywords: {
        pageNo: 1,
        pageSize: 10
      },
      disabled: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.keywords.pageNo = 1
      const params = Object.assign({}, this.keywords, { receiptStatus: this.status })
      API.initList(params)
        .then(response => {
          this.cardList = response.data.data.list
          this.$emit('change', this.cardList)
        })
    },
    load () {
      this.keywords.pageNo += 1
      const params = Object.assign({}, this.keywords, { receiptStatus: this.status })
      API.initList(params)
        .then(response => {
          this.cardList = this.cardList.concat(response.data.data.list)
          this.$emit('change', this.cardList)
        })
    },
    refresh () {
      this.init()
    },
    toDetail (id) {
      // 路由跳转
      this.$router.push({
        params: { id },
        name: 'receipt-detail'
      })
    },
    handleClick (type, id) {
      if (type === 'receipt') {
        this.receipt(id)
      } else if (type === 'uploadPic') {
        this.uploadPic(id)
      } else if (type === 'updatePic') {
        this.updatePic(id)
      } else if (type === 'backFactory') {
        this.backFactory(id)
      }
    },
    // 回收
    receipt (id) {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '回收',
        prompt: {
          value: '',
          placeholder: '请输入回收人'
        },
        onConfirm: (e, promptValue) => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: `Prompt value: ${promptValue || ''}`
          }).show()
        }
      }).show()
    },
    uploadPic (id) {
      this.$router.push({
        params: { id, type: 'add' },
        name: 'receipt-upload'
      })
    },
    updatePic (id) {
      this.$router.push({
        params: { id, type: 'update' },
        name: 'receipt-upload'
      })
    },
    // 返厂
    backFactory (orderIds) {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '返厂',
        prompt: {
          value: '',
          placeholder: '请输入接收人'
        },
        onConfirm: (e, promptValue) => {
          const params = {
            orderIds,
            returnName: promptValue,
            receiptStatus: this.data.receiptStatus,
            ids: []
          }
          API.updateReceipt(params)
            .then(res => {
              console.log(res)
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: `Prompt value: ${promptValue || ''}`
              }).show()
            })
        }
      }).show()
    }
  }
}
</script>

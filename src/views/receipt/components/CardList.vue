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
    backFactory (id) {
    }
  }
}
</script>

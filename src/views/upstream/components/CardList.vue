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
      const params = Object.assign({}, this.keywords, { acceptStatus: this.status })
      API.initList(params)
        .then(response => {
          this.cardList = response.data.data.list
          this.$emit('change', this.cardList)
        })
    },
    load () {
      this.keywords.pageNo += 1
      const params = Object.assign({}, this.keywords, { acceptStatus: this.status })
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
        name: 'upstream-detail'
      })
    },
    handleClick (type, id) {
      if (type === 'recept') {
        this.recept(id)
      } else if (type === 'refuse') {
        this.refuse(id)
      }
    },
    // 接受
    recept (id) {
      API.receipt(id)
        .then(() => {
          this.init()
        })
    },
    // 拒绝
    refuse (id) {
      this.$createDialog({
        type: 'confirm',
        title: '确认拒绝订单',
        onConfirm: () => {
          API.refuse(id)
            .then(() => {
              this.init()
            })
        }
      }).show()
    }
  }
}
</script>

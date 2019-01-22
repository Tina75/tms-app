<template>
  <cube-scroll
    ref="scroll"
    :data="cardList"
    :options="options"
    @pulling-down="onPullingDown()"
    @pulling-up="onPullingUp()">
    <Card
      v-for="(el, index) in cardList"
      :key="index"
      :data="el"
      @card-action="handleClick"
      @click.native="toDetail(el.shipperOrderId)"/>
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
    ...mapGetters(['upstreamNext']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.upstreamNext[this.keys]
      }
    }
  },
  methods: {
    ...mapActions(['getUpstreamStatusCnt', 'initList', 'reFresh', 'loadMore']),
    toDetail (id) {
      // 路由跳转
      this.$router.push({
        params: { id },
        name: 'upstream-detail'
      })
    },
    onPullingDown () {
      this.reFresh({ key: this.keys })
    },
    onPullingUp () {
      this.loadMore({ key: this.keys })
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
          window.toast('接收成功')
          this.getUpstreamStatusCnt()
          this.initList({ key: this.keys })
        })
    },
    // 拒绝
    refuse (id) {
      this.$createDialog({
        type: 'confirm',
        title: '确认拒绝订单?',
        onConfirm: () => {
          API.refuse(id)
            .then(() => {
              window.toast('拒绝成功')
              this.getUpstreamStatusCnt()
              this.initList({ key: this.keys })
            })
        }
      }).show()
    }
  }
}
</script>

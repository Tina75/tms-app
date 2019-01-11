<template>
  <div class="order-detail"/>
</template>

<script>

export default {
  name: 'pickup-order-detail',
  components: {},
  metaInfo: {
    title: '订单详情'
  },
  data () {
    return {
      tabData: [
        {
          label: '一',
          anchor: 'text1'
        },
        {
          label: '二',
          anchor: 'text2'
        },
        {
          label: '三',
          anchor: 'text3'
        },
        {
          label: '四',
          anchor: 'text4'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
.order-detail
  height: 100%
  .content-box
    height: 500px
    background-color: #cccccc;
    margin-bottom: 20px;
</style>

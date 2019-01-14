<template>
  <div class="status-bar">
    <p class="status">{{status | orderStatus}}</p>
    <p class="time" >{{time | datetimeFormat}}</p>
  </div>
</template>
<script>
import { orderStatus } from '../libs'
export default {
  name: 'status-bar',
  metaInfo: {
    title: 'status-bar'
  },
  filters: {
    orderStatus
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.status-bar
  padding 20px 15px
  color #fff
  background #333
  .status
    font-size 24px
  .time
    font-size 15px
    margin-top 10px
</style>

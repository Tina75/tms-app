<template>
  <div class="status-bar">
    <p class="status">{{status}}</p>
    <p class="time">{{time}}</p>
  </div>
</template>
<script>
export default {
  name: 'status-bar',
  metaInfo: {
    title: 'status-bar'
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
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

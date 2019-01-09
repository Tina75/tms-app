<template>
  <div class="main">
    <img :src="img" class="img">
    <div class="message">老板，您还没有记录{{content}}信息 赶快新增一个，方便联系哦～</div>
    <div>
      <cube-button
        :primary="true">
        新增{{content}}
      </cube-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    img: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}

</script>
<style lang='stylus' scoped>
.main
  height 100%
  width 100%
  background-color #ffffff
  text-align center
  .img
    height 182px
    width 185px
    margin-top 121px
  .message
    margin 0px 89px
    font-size 14px
    color #666666
    line-height 24px
    position relative
    top -48px
  .cube-btn
    margin 0px 118px
    width 140px
    height 40px
    padding 0
    line-height 40px
    font-size 17px
    font-weight 500
</style>

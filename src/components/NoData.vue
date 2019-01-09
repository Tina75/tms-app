<template>
  <div class="main">
    <div class="img"/>
    <span>没找到相关数据~</span>
  </div>
</template>

<script>
export default {
  name: 'no-data'
}

</script>
<style lang='stylus' scoped>
.main
  height 100%
  width 100%
  text-align center
  span
    color #999
    font-size 17px
  .img
    height 50%
    width 100%
    background url(../assets/img-no-data.png) no-repeat bottom center
    background-size 117px
    position relative

</style>

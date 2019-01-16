<template>
  <div class="loading-button"> <!--必须加个父标签，，否则用定位布局时因cube在点击时动态设置classname出现定位闪现-->
    <cube-button :primary="true" :disabled="loading" v-on="$listeners">
      <cube-loading v-if="loading" class="cube-flex-center" :size="25"/>
      <span v-else>{{action}}</span>
    </cube-button>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: '确定'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='stylus' >
.loading-button
  height 44px
  .cube-btn
    padding 0
    height 100%
</style>

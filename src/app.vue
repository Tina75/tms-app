<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <loading :status.sync="showLoading"></loading>
  </div>
</template>
<script>
import Loading from '@/components/Loading'

export default {
  name: 'app',
  components: { Loading },
  data () {
    return {
      showLoading: false
    }
  },
  mounted () {
    window.toast = (msg) => {
      this.$createToast({
        time: 2000,
        txt: msg,
        type: 'txt'
      }).show()
    }
    window.loadingStart = () => {
      this.showLoading = true
    }
    window.loadingEnd = () => {
      this.showLoading = false
    }
    window.alert = (msg, fn) => {
      this.$createDialog({
        type: 'alert',
        title: '',
        content: msg,
        icon: 'cubeic-alert',
        onConfirm: () => {
          if (typeof fn === 'function') fn()
        }
      }).show()
    }
  }
}
</script>

<style lang="stylus">
@import './assets/style/mixin.styl';
html,body
  height: 100%
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50
  font-size 14px
  height 100%
  background #F3F3F3
  *
    box-sizing border-box
  .page
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    .list-no-data
      height 50px
      line-height 50px
      text-align center
      color #999
  .scroll-list-wrap
    height: 100%
    overflow-x: hidden
    overflow-y: auto
</style>

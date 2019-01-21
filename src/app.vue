<template>
  <div id="app" class="cube-default-background">
    <keep-alive>
      <router-view :key="$route.path"/>
    </keep-alive>
    <loading :status.sync="loadingStatus"/>
  </div>
</template>
<script>
import Loading from '@/components/Loading'

export default {
  name: 'app',
  components: { Loading },
  data() {
    return {
      loadingStatus: false
    }
  },
  created() {
    // 全局toast
    window.toast = msg => {
      this.$createToast({
        time: 2000,
        txt: msg,
        type: 'txt'
      }).show()
    }
    // 全局loading
    window.loading = (status = true) => {
      this.loadingStatus = status
    }
    // 全局alert
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
    // 全局弹窗
    window.confirm = ({
      title = '',
      icon = 'cubeic-alert',
      content = '',
      onConfirm = () => {}
    } = {}) => {
      console.info({
        type: 'confirm',
        title,
        content,
        icon,
        onConfirm
      })
      this.$createDialog({
        type: 'confirm',
        title,
        content,
        icon,
        onConfirm
      }).show()
    }
  }
}
</script>

<style lang="stylus">
@import './assets/font/iconfont.css'
@import './assets/style/helper.styl'
html,
body
  height 100%
  // user-select: all
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50
  font-size 14px
  min-height 100%
  height 100%
  *
    box-sizing border-box
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
.empty-list-image
  width 179px
  height 133px
  // .page
  // position: absolute
  // z-index: 10
  // top: 0
  // left: 0
  // width: 100%
  // height: 100%
  // overflow-x: hidden
  // overflow-y: auto
  // .list-no-data
  // height 50px
  // line-height 50px
  // text-align center
  // color #999
  // .scroll-list-wrap
  // height: 100%
  // overflow-x: hidden
  // overflow-y: auto
</style>

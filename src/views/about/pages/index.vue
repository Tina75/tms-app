<template>
  <div class="about-us">
    <div class="banner">
      <icon-font
        name="yzg-logo-1"
        :size="34"
        color="#189CB2"
        class="link-icon">
      </icon-font>
      <icon-font
        name="yzg-ico-text"
        :size="26"
        color="#25292E"
        class="link-icon">
      </icon-font>
      <p>司机版V{{curVersion}}</p>
    </div>
    <cell-group>
      <cell-item
        label="检查新版本"
        :link-icon="true"
        @tap="checkUpdate">
        <p class="version-text">{{(Number(versionText) === 0) ? '已是最新版本' : '可更新'}}</p>
      </cell-item>
      <cell-item
        label="公司介绍"
        :route="{name: 'company-introduce'}">
      </cell-item>
      <cell-item
        label="用户协议"
        :route="{name: 'user-agreement'}">
      </cell-item>
    </cell-group>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'
import IconFont from '@/components/Iconfont'
import { mapGetters, mapActions } from 'vuex'
import bridge from '@/libs/dsbridge'

export default {
  name: 'about-us',
  metaInfo: {
    title: '关于我们'
  },
  data () {
    return {
      dialog: false,
      disabled: false,
      curVersion: '',
      showingDialog: null
    }
  },
  components: { CellGroup, CellItem, IconFont },
  computed: {
    ...mapGetters(['versionText'])
  },
  methods: {
    ...mapActions(['getLastVersion']),
    checkUpdate () {
      this.dialog = true
      console.log(this.versionText)
      if (Number(this.versionText) === 0) {
        this.showingDialog = this.$createDialog({
          title: '提示',
          content: `当前软件已经是最新版本</br>版本号：${this.curVersion}`,
          confirmBtn: {
            text: '好的'
          },
          onConfirm () {
            this.dialog = false
          }
        })
        this.showingDialog.show()
      } else {
        this.showingDialog = this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: `已检测到有新版本可更新</br>版本号${this.versionText}`,
          onConfirm: () => {
            this.dialog = false
            if (this.System.os === 'IOS') {
              window.location.href = 'itms-apps://itunes.apple.com/cn/app/yun-da-da-huo-zhu-ban/id1434800212'
            } else {
              window.location.href = 'market://details?id=com.yundada56.consignor'
            }
          },
          onCancel: () => {
            this.dialog = false
          }
        })
        this.showingDialog.show()
      }
    },
    getCurVersion () {
      this.curVersion = bridge.call('user.getClientInfo').data.ClientInfo.split('/')[2]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getCurVersion()
      vm.getLastVersion()
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.dialog) {
      this.showingDialog.hide()
      this.dialog = false
      next(false)
    } else {
      next()
    }
  }

}
</script>
<style lang="stylus" scoped>
  .about-us
    height: 100%;
    background-color: #F3F3F3
    .banner
      text-align: center
      padding: 40px 0 35px
      .iconfont
        display: inline-block
        vertical-align: middle
      .yzg-logo-1
        margin-top: 3px;
        margin-right: 5px;
      p
        margin-top: 12px;
        text-align: center
        font-size:15px;
        color: #999999
        line-height:21px;
    .version-text
      font-size: 14px;
      color: #999999;
</style>

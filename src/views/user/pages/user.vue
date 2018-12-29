<template>
  <div class="user">
    <cell-group>
      <cell-item
        label="头像"
        :link-icon="true"
        @tap="changeAvatar">
        <img
          v-if="userInfo.avatarUrl"
          class="user-avatar"
          :src="`${imgHost}${userInfo.avatarUrl}?x-oss-process=image/resize,m_fill,h_60,h_60`">
        <img
          v-else
          class="user-avatar"
          src="../../../assets/image-default-avatar.png">
      </cell-item>
    </cell-group>
    <cell-group>
      <cell-item
        label="姓名"
        :route="{name: 'user-name'}">
        {{userInfo.name}}
      </cell-item>
      <cell-item
        label="手机号"
        :route="{name: 'user-phone'}">
        {{userInfo.phone}}
      </cell-item>
    </cell-group>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'
import bridge from '@/libs/dsbridge'
import { mapGetters, mapActions } from 'vuex'
import { uploadOSS } from '@/libs/ossUtil'

export default {
  name: 'user',
  metaInfo: {
    title: '个人信息'
  },
  data () {
    return {
      disabled: false,
      imgHost: process.env.VUE_APP_IMG_HOST
    }
  },
  components: { CellGroup, CellItem },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo', 'editUserInfo']),
    changeAvatar () {
      const _this = this
      bridge.call('ui.selectPictures', { size: 600, maxBytes: 50 * 1024, num: 1 }, function (result) {
        if (result.data.images[0]) {
          bridge.call('ui.getBase64Picture', { key: result.data.images[0] }, function (result) {
            let baseData = 'data:image/jpeg;base64,' + result.data.image
            _this.uploadOSS(baseData)
          })
        }
      })
    },
    async uploadOSS (baseData) {
      const avatar = await uploadOSS(baseData)
      if (avatar && avatar.length !== 0) {
        await this.editUserInfo({
          type: 1,
          value: avatar
        }).then(() => {
          this.getUserInfo()
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUserInfo()
    })
  }
}
</script>
<style lang="stylus" scoped>
  .user
    height: 100%;
    background-color: #F3F3F3
    padding-top: 10px;
    .user-avatar
      width 60px
      height: 60px
      border-radius: 9px
</style>

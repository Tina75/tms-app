<template>
  <div class="receipt-detail">
    <div class="gallery">
      <ul>
        <li
          v-for="(item, index) in fileUrlList"
          :key="index">
          <i
            class="del-img"
            @click="deleteFile(index)">
          </i>
          <img
            :src="item | imgUrlFormat"
            @click="showImages(index)">
        </li>
        <li
          v-if="fileUrlList.length < maxLength"
          class="add-img"
          @click="addImg">
          <icon-font
            name="yzg-hebingxingzhuang5"
            :size="46"
            color="#C9C9C9"
            class="link-icon">
          </icon-font>
        </li>
      </ul>
    </div>
    <cube-button
      :disabled="!fileUrlList.length"
      @click="submitFiles">
      确认上传
    </cube-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconFont from '@/components/Iconfont'
import bridge from '@/libs/dsbridge'
import { uploadOSS } from '@/libs/ossUtil'

export default {
  name: 'receipt-detail',
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: { IconFont },
  data () {
    return {
      title: '',
      showingDialog: null,
      dialog: false,
      maxLength: 0
    }
  },
  computed: {
    ...mapGetters(['fileUrlList'])
  },
  mounted () {
    this.title = this.$route.name === 'receipt-detail' ? '回单照片' : '上传车况'
  },
  methods: {
    ...mapActions(['getReceiptFileUrlList', 'getConditionFileUrlList', 'addFile', 'deleteFile', 'uploadReceipt', 'uploadLocation', 'uploadCondition']),
    submitFiles () {
      if (!this.fileUrlList.length) {
        return false
      }
      this.dialog = true
      if (this.maxLength === 4) {
        this.showingDialog = this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否确认上传这些回单图片',
          onConfirm: () => {
            this.dialog = false
            this.uploadReceipt({
              billId: this.$route.query.billId,
              orderId: this.$route.params.id
            }).then(() => {
              this.$createToast({
                txt: '上传成功',
                type: 'txt'
              }).show()
              this.$router.back()
            })
          },
          onCancel: () => {
            this.dialog = false
          }
        })
        this.showingDialog.show()
      } else {
        this.showingDialog = this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否确认上传这些车况图片',
          onConfirm: () => {
            this.dialog = false
            // this.reportLocation()
            this.uploadCondition({
              billId: this.$route.params.id,
              billType: this.$route.query.type
            }).then(() => {
              this.$createToast({
                txt: '上传成功',
                type: 'txt'
              }).show()
              this.$router.back()
            })
          },
          onCancel: () => {
            this.dialog = false
          }
        })
        this.showingDialog.show()
      }
    },
    addImg () {
      const _this = this
      bridge.call('ui.selectPictures', { size: 600, maxBytes: 50 * 1024, num: (this.maxLength - this.fileUrlList.length) }, function (result) {
        if (result.data.images.length > 0) {
          result.data.images.forEach((item) => {
            bridge.call('ui.getBase64Picture', { key: item }, function (result) {
              let baseData = 'data:image/jpeg;base64,' + result.data.image
              _this.uploadOSS(baseData)
            })
          })
        }
      })
    },
    showImages (index) {
      this.$router.push({ name: 'image-preview', params: { imgs: this.fileUrlList, index: index } })

      // const params = {
      //   $props: {
      //     imgs: this.fileUrlList.map(item => this.imgHost + item),
      //     initialIndex: index,
      //     loop: false
      //   }
      // }
      // this.$createImagePreview({ ...params }).show()
    },
    async uploadOSS (baseData) {
      const img = await uploadOSS(baseData)
      this.addFile(img)
    },
    getGeographic () {
      return new Promise((resolve, reject) => {
        bridge.call('user.getLocationInfoAsync', {}, function (result) {
          if (result.data && result.data.lat && result.data.lon) {
            resolve(result.data)
          } else {
            reject(new Error('获取位置失败'))
          }
        })
      })
    },
    getTelephone () {
      return new Promise((resolve, reject) => {
        try {
          resolve(bridge.call('user.getUserInfo').data.userInfo.phone)
        } catch (e) {
          reject(new Error('获取手机号失败'))
        }
      })
    },
    getDeviceId () {
      return new Promise((resolve, reject) => {
        try {
          resolve(bridge.call('user.getClientInfo').data.ClientInfo.split('/')[0])
        } catch (e) {
          reject(new Error('获取设备Id失败'))
        }
      })
    },
    async reportLocation () {
      const location = await this.getGeographic()
      const phone = await this.getTelephone()
      const deviceId = await this.getDeviceId()
      this.uploadLocation({
        deviceId: deviceId,
        phone: phone,
        lon: location.lon,
        lat: location.lat
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from && (from.name !== 'image-preview')) {
        if (to.name === 'receipt-detail') {
          vm.maxLength = 4
          vm.getReceiptFileUrlList(to.params.id)
        } else {
          vm.maxLength = 6
          vm.getConditionFileUrlList({
            billId: to.params.id,
            billType: to.query.type
          })
        }
      }
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
  .receipt-detail
    height: 100%;
    background-color: #F3F3F3
    display: flex
    flex-direction: column
    .gallery
      padding: 15px 10px
      flex 1
      ul
        display: flex
        flex-direction row
        justify-content start
        align-content start
        flex-wrap: wrap
        width: 100%;
        li
          position: relative
          width: 110px;
          height: 110px
          margin-bottom: 10px;
          margin-right: 12px;
          &:nth-child(3n+3)
            margin-right: 0
          img
            width: 110px;
            height: 110px
          .del-img
            position: absolute
            display: block
            left: -8px;
            top: -8px;
            width: 20px;
            height: 20px
            background-image: url(../../../assets/icon-del-pic.png)
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
        .add-img
          background-color: #eeeeee
          line-height: 110px;
          text-align: center
    .cube-btn
      height: 45px
      padding: 0
      font-size: 18px;
      line-height: 45px
</style>

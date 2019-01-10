<template>
  <!-- <div
    v-show="exceptionPhotos && exceptionPhotos.length < 6"
    class="upload-div"
    @click="addImg">
    <icon-font
      name="yzg-hebingxingzhuang5"
      color="#CECECE"
      :size="50">
    </icon-font>
  </div> -->
  <div>
    <ul class="image-list">
      <li
        v-for="(item, index) in exceptionPhotos"
        :key="item.url"
        class="cube-mt-10">
        <img
          src="./images/icon-del-pic.png"
          class="pic-item-delete"
          @click.stop="deletePic(index)">
        <img
          :src="item.url"
          alt="图片加载失败"
          class="pic-item"
          @click="previewPic(exceptionPhotos,index)">
      </li>
      <li
        v-show="exceptionPhotos && exceptionPhotos.length < 6"
        class="pic-item-add"
        @click="addImg">
        <!-- <icon-font
          name="yzg-hebingxingzhuang5"
          color="#CECECE"
          :size="50">
        </icon-font> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { uploadOSS } from './ossUtil'
import bridge from '@/libs/dsbridge'

export default {
  name: 'odd-upload',
  metaInfo: { title: '上报异常' },
  data () {
    return {
      exceptionPhotos: [
        {
          url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg?x-oss-process=image/resize,m_fill,h_220,w_220'
        }
        // , {
        //   url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg'
        // }, {
        //   url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png'
        // }
      ]
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    addImg () {
      const vm = this
      const limit = 6 - this.exceptionPhotos.length
      bridge.call('ui.selectPictures', { size: 1200, maxBytes: 300 * 1024, num: limit }, function (result) {
        if (result.data.images.length > 0) {
          result.data.images.forEach((item) => {
            bridge.call('ui.getBase64Picture', { key: item }, function (result) {
              let baseData = 'data:image/jpeg;base64,' + result.data.image
              vm.uploadOSS(baseData)
            })
          })
        }
      })
    },
    async uploadOSS (baseData) {
      window.loadingStart()
      const img = await uploadOSS(baseData)
      if (img) {
        this.exceptionPhotos.push(img)
      } else {
        window.toast('图片上传失败')
      }
      window.loadingEnd()
    },
    previewPic (imgs, index = 0) {
      this.$router.push({ name: 'image-preview', params: { imgs, index } })
    }
  }
}

</script>
<style lang='stylus' scoped>
li
  width 110px
  height 110px
  position relative
  .pic-item-add
    background #F1F1F1
    line-height 110px
    text-align center
  .pic-item-delete
    position absolute
    width 24px
    top -7px
    left -5px
</style>

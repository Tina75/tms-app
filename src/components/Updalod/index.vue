<template>
  <div class="content">
    <ul class="content-pic-box cube-mt-10">
      <li
        v-for="(item, index) in exceptionPhotos"
        :key="item.url"
        class="image-item">
        <img
          src="./images/icon-del-pic.png"
          class="pic-item-delete"
          @click.stop="deletePic(index)">
        <img
          :src="item.url"
          alt="图片加载失败"
          class="pic-item"
          @click="previewPic(exceptionPhotoList,index)">
        <cube-input
          v-model="item.title"/>
      </li>
      <li
        v-show="exceptionPhotos && exceptionPhotos.length < 6"
        class="pic-item-add"
        @click="addImg">
        <icon-font
          name="yzg-hebingxingzhuang5"
          color="#CECECE"
          :size="50"/>
        <span>点击上传</span>
      </li>
    </ul>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { uploadOSS } from './ossUtil'
import bridge from '@/libs/dsbridge'

export default {
  name: 'odd-upload',
  components: { IconFont },
  metaInfo: { title: '图片上传' },
  data () {
    return {
      exceptionPhotos: [
        {
          url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg',
          title: ''
        }, {
          url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg',
          title: ''
        }, {
          url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png',
          title: ''
        }
      ],
      exceptionPhotoList: [
        'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg',
        'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg',
        'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png'
      ]
    }
  },
  watch: {
    exceptionPhotos (newVal) {
      this.exceptionPhotoList = []
      newVal.forEach(element => {
        this.exceptionPhotoList.push(element.url)
      })
    }
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
    deletePic (i) {
      this.exceptionPhotos.splice(i, 1)
    },
    previewPic (imgs, index = 0) {
      this.$router.push({ name: 'image-preview', params: { imgs, index } })
    }
  }
}

</script>
<style lang='stylus' scoped>
.content
  padding-top 15px
  font-size 16px
  color #555555
  background white
  &-pic-box
    display flex
    display -webkit-flex
    justify-content space-between
    flex-wrap wrap
    li
      width 100px
      height 100px
      position relative
    .pic-item
      width 100px
      height 100px
      border-radius 5px
  .pic-item-add
    background #F1F1F1
    line-height 100px
    text-align center
    border-radius 5px
    margin-bottom 10px
  .pic-item-delete
    position absolute
    width 24px
    top -12px
    right -10px
.image-item
  margin-bottom 50px
</style>

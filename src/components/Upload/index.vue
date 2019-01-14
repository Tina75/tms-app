<template>
  <div class="content">
    <ul class="content-pic-box cube-mt-10">
      <li
        v-for="(item, index) in uploadPhotos"
        :key="index"
        class="image-item">
        <span @click="deletePic(index)">
          <icon-font
            name="icon-shanchu-tupian"
            class="pic-item-delete"
            color="red"
            :size="20"/>
        </span>
        <img
          :src="item.url"
          alt="图片加载失败"
          class="pic-item"
          @click="previewPic(uploadPhotoList,index)">
        <cube-input v-if="inputShow" v-model="item.title" :maxlength="maxlength"/>
      </li>
      <li
        v-show="uploadPhotos && uploadPhotos.length < maxCount"
        class="pic-item-add"
        @click="addImg">
        <icon-font
          name="icon-zengjia"
          color="#CECECE"
          :size="30"/>
        <p class="addImg-p">点击上传</p>
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
  props: {
    uploadPhotos: {
      type: Array,
      default: Array
    },
    maxCount: { // 图片数量限制
      type: [Number, String],
      default: 10
    },
    inputShow: { // 照片标题输入框，默认显示
      type: Boolean,
      default: true
    },
    maxlength: { // 输入框 字数限制
      type: [Number, String],
      default: 10
    }
  },
  data () {
    return {
      uploadPhotoList: []
    }
  },
  watch: {
    uploadPhotos (newVal) {
      this.uploadPhotoList = []
      newVal.forEach(element => {
        this.uploadPhotoList.push(element.url)
      })
    }
  },
  methods: {
    addImg () {
      const vm = this
      const limit = this.maxCount - this.uploadPhotos.length
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
        this.uploadPhotos.push(img)
      } else {
        window.toast('图片上传失败')
      }
      window.loadingEnd()
    },
    deletePic (i) {
      this.uploadPhotos.splice(i, 1)
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
    justify-content flex-start
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
    text-align center
    border-radius 5px
    margin-bottom 10px
    padding 25px 0
    .addImg-p
      color #999999
      font-size 12px
      line-height: 35px;
  .pic-item-delete
    position absolute
    width 24px
    top -7px
    right -13px
.image-item
  margin-bottom 50px
  margin-right 15px
</style>

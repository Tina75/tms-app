<template>
  <div class="content">
    <ul class="content-pic-box cube-mt-10">
      <li
        v-for="(item, index) in exceptionPhotos"
        :key="index"
        class="image-item">
        <img
          :src="item.url"
          alt="图片加载失败"
          class="pic-item"
          @click="previewPic(exceptionPhotoList,index)">
        <p v-if="item.title">{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'odd-upload',
  metaInfo: { title: '图片展示' },
  props: {
    exceptionPhotos: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      exceptionPhotoList: []
      // exceptionPhotoList: [
      //   'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
      //   'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
      //   'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png?x-oss-process=image/resize,m_fill,h_100,w_100'
      // ]
    }
  },
  mounted () {
    if (this.exceptionPhotos.length) {
      this.exceptionPhotoList = []
      this.exceptionPhotos.forEach(element => {
        this.exceptionPhotoList.push(element.url)
      })
    }
  },
  methods: {
    previewPic (imgs, index = 0) {
      this.$router.push({ name: 'image-preview', params: { imgs, index } })
    }
  }
}

</script>
<style lang='stylus' scoped>
.content
  padding-top 15px
  margin-top -10px
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
  .pic-item-delete
    position absolute
    width 24px
    top -12px
    right -10px
.image-item
  margin-top 10px
  margin-bottom 30px
  text-align center
  line-height 21px
  color #666666
</style>

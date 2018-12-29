<template>
  <div class="page scroll-list-wrap">
    <div class="content">
      <h3>异常环节</h3>
      <cube-checker
        v-model="exceptionPlot"
        :options="exceptionPlotOptions"
        class="cube-font-16"
        type="radio" />
      <br><br>
      <h3>异常类型</h3>
      <cube-checker
        v-model="exceptionType"
        :options="exceptionTypeOptions"
        class="cube-font-16"
        type="radio" />
      <br><br>
      <h3>详细说明</h3>
      <cube-textarea
        v-model="exceptionDesc"
        class="text-area"
        :maxlength="200"
        :autofocus="true"
        :indicator="{remain:true,negative:true}"
        placeholder="请输入异常情况的具体内容">
      </cube-textarea>
      <ul class="content-pic-box cube-mt-10">
        <li
          v-for="(url, index) in exceptionPhotos"
          :key="url"
          class="cube-mt-10">
          <img
            src="../../../assets/icon-del-pic.png"
            class="pic-item-delete"
            @click.stop="deletePic(index)">
          <img
            :src="url | imgUrlFormat"
            alt="图片加载失败"
            class="pic-item"
            @click="previewPic(exceptionPhotos,index)">
        </li>
        <li
          v-show="exceptionPhotos && exceptionPhotos.length<6"
          class="pic-item-add cube-mt-10"
          @click="addImg">
          <icon-font
            name="yzg-hebingxingzhuang5"
            color="#CECECE"
            :size="50">
          </icon-font>
        </li>
        <li></li>
      </ul>
    </div>
    <cube-button
      class="submit"
      @click="submit">
      提交
    </cube-button>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { mapActions } from 'vuex'
import { uploadOSS } from '@/libs/ossUtil'
import bridge from '@/libs/dsbridge'
import { TYPE_CODES, PLOT_CODES } from '../js/type.js'

export default {
  name: 'odd-upload',
  metaInfo: { title: '上报异常' },
  components: { IconFont },
  data () {
    return {
      billId: -1,
      billType: -1,
      exceptionPlot: 1, // 异常环节
      exceptionType: 1,
      exceptionDesc: '',
      exceptionPhotos: []
    }
  },
  computed: {
    exceptionPlotOptions () {
      return PLOT_CODES
    },
    exceptionTypeOptions () {
      return TYPE_CODES[this.exceptionPlot]
    }
  },
  watch: {
    exceptionPlot: function (value) {
      this.exceptionType = 1 // 默认选中第一个
    }
  },
  mounted () {
    this.billId = this.$route.params.id
    this.billType = this.$route.query.type
  },

  methods: {
    ...mapActions(['uploadOdd']),

    addImg () {
      const _this = this
      const limit = 6 - this.exceptionPhotos.length
      bridge.call('ui.selectPictures', { size: 1200, maxBytes: 300 * 1024, num: limit }, function (result) {
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
    submit () {
      if (this.exceptionDesc.trim().length < 1) {
        window.toast('请输入异常情况的具体内容')
        return
      }

      const params = {
        billId: Number(this.billId),
        billType: Number(this.billType),
        exceptionPlot: this.exceptionPlot, // 异常环节
        exceptionType: this.exceptionType,
        exceptionDesc: this.exceptionDesc,
        exceptionPhotos: this.exceptionPhotos
      }

      this.uploadOdd(params).then((res) => {
        window.toast('上报成功')
        this.$router.back()
      })
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
>>> .cube-checker-item
      width 108px
      padding 10px 0 8px 0
      margin-top 10px
      vertical-align middle
.page
  background #ffffff
.content
  padding 15px 10px
  font-size 16px
  color #555555
  background white
  margin-bottom 60px
  h3
    font-size 18px
    color #222121
    margin-bottom 10px
  &-pic-box
    display flex
    display -webkit-flex
    justify-content space-between
    flex-wrap wrap
    li
      width 110px
      height 110px
      position relative
    .pic-item
      width 110px
      height 110px
  .pic-item-add
    background #F1F1F1
    line-height 110px
    text-align center
  .pic-item-delete
    position absolute
    width 24px
    top -7px
    left -5px
.submit
  position fixed
  bottom 0
  left 0
  font-size 18px
</style>

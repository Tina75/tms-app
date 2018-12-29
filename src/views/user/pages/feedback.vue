<template>
  <div class="feedback">
    <h2>建议内容</h2>
    <div class="feedback_content">
      <cube-textarea
        v-model="content"
        placeholder="请输入您宝贵的建议"
        :auto-expand="true"
        :indicator="false"
        :maxlength="max">
      </cube-textarea>
      <span class="feedback_max">{{content.length}}/{{max}}</span>
    </div>
    <h2>上传图片</h2>
    <div class="feedback_pic">
      <div
        v-for="(item,index) in urlList"
        :key="index"
        class="feedback_item"
        @click="viewPic(index)">
        <img :src="item | imgUrlFormat">
        <i
          class="feedback_item--clear"
          name="clear"
          @click.stop="removeFile(index)" />
      </div>
      <div
        v-if="urlList && urlList.length < 3"
        class="feedback_default"
        @click="uploadUrl" />
    </div>
    <div class="feedback_submit">
      <cube-button
        :primary="true"
        :disabled="disabled"
        @click="submit">
        提交
      </cube-button>
    </div>
  </div>
</template>
<script>
import { uploadOSS } from '@/libs/ossUtil'
import bridge from '@/libs/dsbridge'
import { mapActions } from 'vuex'
export default {
  name: 'UserFeedback',
  metaInfo: {
    title: '意见反馈'
  },
  data () {
    return {
      content: '',
      max: 200,
      urlList: [],
      initialIndex: 0,
      disabled: false,
      maxLength: 3
    }
  },
  methods: {
    ...mapActions(['submitFeedback']),
    removeFile (idx) {
      this.urlList.splice(idx, 1)
    },
    viewPic (idx) {
      this.$router.push({ name: 'image-preview', params: { imgs: this.urlList, index: idx } })
    },
    uploadUrl () {
      const _this = this
      bridge.call('ui.selectPictures', { size: 600, maxBytes: 50 * 1024, num: (this.maxLength - this.urlList.length) }, function (result) {
        console.info('1选择照片成功', result.data.images.length)
        if (result.data.images.length > 0) {
          result.data.images.forEach(item => {
            bridge.call('ui.getBase64Picture', { key: item }, function (result) {
              console.info('2转换base64成功', result.data.image.length)
              let baseData = 'data:image/jpeg;base64,' + result.data.image
              _this.upload(baseData)
            })
          })
        }
      })
    },
    async upload (base64) {
      const url = await uploadOSS(base64)
      if (url) {
        this.urlList.push(url)
      }
    },
    async submit () {
      if (!this.content) {
        window.toast('请填写具体建议内容')
      } else {
        const data = {
          suggestContext: this.content,
          suggestPhotos: this.urlList
        }
        const res = await this.submitFeedback(data)
        if (res.code === 10000) {
          window.toast('提交成功')
          this.content = ''
          this.urlList = []
        } else {
          window.toast(res.msg)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.content = ''
        vm.urlList = []
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.feedback
  height 100%
  background-color #ffffff
  padding 0px 11px
  h2
    font-size 18px
    color #222121
    padding-top 22px
  &_content
    margin-top 11px
    padding 14px
    border 1px solid #D5D5D5
    position relative
    border-radius 4px
  &_max
    font-size 15px
    color #D9D9D9
    position absolute
    right 16px
    bottom 8px
  &_pic
    display flex
    -webkit-display flex
    padding 10px 0px
  &_item
    width 110px
    height 110px
    margin-right 11px
    position relative
    img
      height 100%
      width 100%
  &_item:last-child
    margin-right 0
  &_item--clear
    position absolute
    top -6px
    left -8px
    width 20px
    height 20px
    background url("../assets/user-clear.png") center
    background-size 20px
  &_default
    height 110px
    width 110px
    background #F1F1F1 url("../assets/user-upload-sq.png") center no-repeat
    background-size 45px
  &_submit
    width 100%
    position fixed
    bottom 0
    left 0
    .cube-btn
      font-size 18px
      border-radius 0
      height 43px
      padding 10px 170px
>>>.cube-textarea-wrapper
    transition none
    min-height 127px
    margin-bottom 10px
>>>.cube-textarea
    padding 0px
    font-size 15px
    color #555555
    line-height 21px
>>>.cube-textarea-wrapper:after
    width 100%
    height 100%
    border-radius 0px
    transform none
    border none
    transition none
>>>.cube-textarea_active:after
    border none
    transform  none
    height 127px
</style>

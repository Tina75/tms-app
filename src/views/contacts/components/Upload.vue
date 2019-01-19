<template>
  <div class="upload">
    <template v-if="!file">
      <div class="upload-input" @click="beforeUpload">
        <slot>
          <icon-font name="icon-zengjia" color="#CECECE" :size="30" />
          <p class="upload-label" v-text="label"/>
        </slot>
      </div>
    </template>

    <template v-else>
      <div
        :style="{'background-image': `url(${file})`}"
        class="upload-preview">
        <span @click="remove">
          <icon-font name="icon-shanchu-tupian" class="upload-remove" color="red" :size="20"/>
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { uploadOSS } from '@/libs/ossUtil'
import bridge from '@/libs/dsbridge'

export default {
  name: 'oss-upload',

  components: { IconFont },

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '点击上传'
    }
  },

  data () {
    return {
      file: ''
    }
  },

  watch: {
    value (newVal) {
      this.file = newVal
    },
    file (newVal) {
      this.$emit('input', newVal)
    }
  },

  methods: {
    beforeUpload () {
      const bridgeConf = {
        size: 1200,
        maxBytes: 300 * 1024,
        num: 1
      }
      bridge.call('ui.selectPictures', bridgeConf, this.uploading)
    },

    uploading (fileList) {
      fileList.data.images.map(item => {
        bridge.call('ui.getBase64Picture', { key: item }, async (result) => {
          const base64Picture = 'data:image/jpeg;base64,' + result.data.image
          try {
            const res = await uploadOSS(base64Picture)
            res ? this.uploaded(res) : this.$emit('on-error', res)
          } catch (error) {
            this.$emit('on-error', error)
          }
        })
      })
    },

    uploaded (result) {
      this.file = result.url
      this.$emit('on-success', result.url)
    },

    remove () {
      this.file = ''
      this.$emit('on-remove', this.file)
    }
  }
}

</script>

<style lang='stylus' scoped>
.upload
  display inline-block
  flex 1
  margin-left 25px
  border-radius 2px
  height 90px
  &:first-child
    margin-left 0
  &-input
    background #F9F9F9
    font-size 12px
    color #999999
    text-align center
    padding 21px 0 10px
  &-label
    margin-top 18px
  &-preview
    position relative
    background center no-repeat #F9F9F9
    background-size cover
    height 100px
  &-remove
    position absolute
    top 0
    right 0
    transform translate(50%, -50%)
    z-index 10
</style>

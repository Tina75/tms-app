<template>
  <div class="upload">
    <template v-if="fileList.length">
      <div class="upload-input" @click="beforeUpload">
        <slot>
          <icon-font name="icon-zengjia" color="#CECECE" :size="30" />
          <p class="upload-label" v-text="label"/>
        </slot>
      </div>
    </template>

    <template v-else>
      <div
        v-for="(file, index) in fileList"
        :key="index"
        :style="{'background-image': `url(${file.url})`}"
        class="upload-preview"
        @click="preview(index)">
        <span @click="remove(index)">
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
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: '点击上传'
    }
  },

  data () {
    return {
      fileList: []
    }
  },

  watch: {
    value (newVal) {
      this.fileList = [ ...newVal ]
    },
    fileList (newVal) {
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
        bridge.call('ui.getBase64Picture', { key: item }, async (res) => {
          const base64Picture = 'data:image/jpeg;base64,' + res.data.image
          try {
            const res = await uploadOSS(base64Picture)
            res ? this.uploaded(res) : this.$emit('on-error', res)
          } catch (error) {
            console.error(error)
            this.$emit('on-error', error)
          }
        })
      })
    },

    uploaded (result) {
      this.fileList.push(result)
      this.$emit('on-success', result)
    },

    remove (index) {
      this.fileList.splice(index, 1)
      this.$emit('on-remove', index, this.fileList)
    },

    preview (start = 0) {
      this.$emit('on-preview', start, this.fileList)
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

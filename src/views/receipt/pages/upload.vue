<template>
  <div class="receipt-upload">
    <div class="upload-box">
      <span class="cardTitle">上传回单（{{photoList.length}}/6）</span>
      <Upload :upload-photos="photoList" :max-count="6" :input-show="false"/>
    </div>
    <div class="btn-box">
      <cube-button primary @click="save">提交</cube-button>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/Upload'
import * as Api from '../libs/api'
export default {
  name: 'receipt-upload',
  metaInfo: {
    title: '回单上传'
  },
  components: { Upload },
  data () {
    return {
      photoList: [
        {
          url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg'
        }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.query.id || ''
    }
  },
  methods: {
    save () {
      const params = {
        id: this.id,
        receiptUrl: this.photoList.map(el => el.url)
      }
      Api.updateReceipt(params)
        .then(res => {
          this.$router.push({
            name: 'receipt'
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.receipt-upload
  .upload-box
    padding 18px 15px
    background #fff
  .btn-box
    padding 18px 15px
</style>

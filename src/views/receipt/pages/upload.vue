<template>
  <div class="receipt-upload">
    <div class="upload-box">
      <span class="cardTitle">{{isUpdate ? '修改回单' : '上传回单'}}（{{photoList.length}}/10）</span>
      <Upload :upload-photos="photoList" :max-count="10" :input-show="false"/>
    </div>
    <div class="btn-box">
      <cube-button :disabled="!photoList.length" primary @click="save">提交</cube-button>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/Upload'
import * as Api from '../libs/api'
export default {
  name: 'receipt-upload',
  metaInfo: {
    title: '上传回单'
  },
  components: { Upload },
  data () {
    return {
      photoList: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    isUpdate () {
      return this.$route.query.type === 'update'
    },
    orderId () {
      return this.$route.query.orderId
    },
    // 刷新tab
    tab () {
      return this.$route.query.tab
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name !== 'image-preview') {
        vm.getUrlList()
      }
    })
  },
  methods: {
    getUrlList () {
      if (this.isUpdate) {
        Api.initDetail(this.orderId).then(response => {
          const data = response.data.data.receiptOrder.receiptUrl
          this.photoList = data.map(el => {
            return { url: el }
          })
        })
      } else {
        this.photoList = []
      }
    },
    save () {
      const params = {
        id: this.id,
        receiptUrl: this.photoList.map(el => el.url)
      }
      Api.uploadReceiptPic(params)
        .then(res => {
          this.$router.back()
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

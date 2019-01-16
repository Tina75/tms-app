<template>
  <div class="receipt-upload">
    <form-item v-model="form.value" label="上传图片"/>
    <Upload/>
  </div>
</template>
<script>
import Upload from '@/components/Upload'
import { FormItem } from '@/components/Form'
export default {
  name: 'receipt-upload',
  metaInfo: {
    title: '回单上传'
  },
  components: { Upload, FormItem },
  data () {
    return {
      form: {
        value: ''
      },
      contactList: []
    }
  },
  methods: {
    save () {
      this.$router.push({ name: 'company' })
    }
  }
}
</script>

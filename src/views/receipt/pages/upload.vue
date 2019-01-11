<template>
  <div>
    <cube-scroll class="scroll-box">
      <form-item v-model="form.value" label="上传图片"/>
      <Upload/>
    </cube-scroll>
  </div>
</template>
<script>
import Upload from '@/components/Updalod'
import { FormItem } from '@/components/Form'
export default {
  name: 'recept-upload',
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

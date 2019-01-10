<template>
  <div class="carrier-create">
    <!-- <form-title title="创建承运商"></form-title> -->
    <!-- <form-item /> -->
  </div>
</template>

<script>
export default {
  name: 'CarrierCreate',

  metaInfo: { title: '新增承运商' },

  data () {
    return {
      form: {
        carrierName: '',
        carrierPrincipal: '',
        carrierPhone: '',
        payType: '',
        remark: ''
      }
    }
  },

  methods: {
    /* 清空表单 */
    clearForm () {
      this.form = {
        ...{
          carrierName: '',
          carrierPrincipal: '',
          carrierPhone: '',
          payType: '',
          remark: ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

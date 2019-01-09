<template>
  <cube-scroll class="scroll-box">
    <form>
      <div class="form-section">
        <form-item label="提货费用(元)" type="number" v-model="form.pickupFee" />
        <form-item label="装货费用(元)" type="number" v-model="form.uploadFee" />
        <form-item label="卸货费用(元)" type="number" v-model="form.unloadFee" />
        <form-item label="保险费用(元)" type="number" v-model="form.ensuranceFee" />
      </div>
      <div class="form-section">
        <form-item label="其它费用(元)" type="number" v-model="form.otherFee" />
      </div>
    </form>
  </cube-scroll>
</template>

<script>
export default {
  metaInfo: { title: '费用信息' },
  data () {
    return {
      form: {
        pickupFee: '',
        uploadFee: '',
        unloadFee: '',
        ensuranceFee: '',
        otherFee: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  form
    margin-top 10px
  .form-section
    margin-bottom 15px
</style>


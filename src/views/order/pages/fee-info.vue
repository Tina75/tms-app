<template>
  <cube-scroll class="scroll-box">
    <form>
      <div class="form-section">
        <form-item v-model="form.pickupFee" label="提货费用(元)" type="number" />
        <form-item v-model="form.uploadFee" label="装货费用(元)" type="number" />
        <form-item v-model="form.unloadFee" label="卸货费用(元)" type="number" />
        <form-item v-model="form.ensuranceFee" label="保险费用(元)" type="number" />
      </div>
      <div class="form-section">
        <form-item v-model="form.otherFee" label="其它费用(元)" type="number" />
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

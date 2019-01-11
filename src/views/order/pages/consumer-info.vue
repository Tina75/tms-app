<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item label="客户订单号" type="text" v-model="form.customOrderNo" />
          <form-item label="客户运单号" type="text" v-model="form.customWaybillNo" />
          <form-item label="对接业务员" type="text" v-model="form.reveivelist" />
        </div>
        <div class="form-section">
          <form-item label="发货时间" type="click" placeholder="请选择" v-model="form.sendTime" />
          <form-item label="到货时间" type="click" placeholder="请选择" v-model="form.ariveTime" />
        </div>
      </form>
    </cube-scroll>

    <cube-button class="footer" primary>确定</cube-button>
  </div>
</template>

<script>
export default {
  metaInfo: { title: '客户单号及其他' },
  data () {
    return {
      form: {
        customOrderNo: '',
        customWaybillNo: '',
        reveivelist: '',
        sendTime: '',
        ariveTime: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  form
    padding-top 10px
  .form-section
    margin-bottom 15px

  .footer
    position fixed
    left 0
    right 0
    bottom 0
    height 44px
    padding 0
    border-radius 0
</style>


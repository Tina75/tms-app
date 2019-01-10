<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item v-model="form.customOrderNo" label="客户订单号" type="text" />
          <form-item v-model="form.customWaybillNo" label="客户运单号" type="text" />
          <form-item v-model="form.reveivelist" label="对接业务员" type="text" />
        </div>
        <div class="form-section">
          <form-item v-model="form.sendTime" label="发货时间" type="click" placeholder="请选择" />
          <form-item v-model="form.ariveTime" label="到货时间" type="click" placeholder="请选择" />
        </div>
      </form>
    </cube-scroll>

    <cube-button class="footer" primary>确定</cube-button>
  </div>
</template>

<script>
import { FormItem } from '@/components/Form'

export default {
  metaInfo: { title: '客户单号及其他' },
  components: { FormItem },
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

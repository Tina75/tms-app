<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item v-model="form.needTicket" label="是否开票" type="switch" />
          <form-item v-model="form.rate" label="开票税率(%)" type="text" />
        </div>
        <div class="form-section">
          <form-item v-model="form.replace" label="代收货款(元)" type="number" />
        </div>
        <div class="form-section">
          <form-item v-model="form.remark" label="备注" type="textarea" placeholder="请输入(最多输入200字)" maxlength="200" />
        </div>
      </form>
    </cube-scroll>

    <cube-button class="footer" primary>确定</cube-button>
  </div>
</template>

<script>
export default {
  metaInfo: { title: '其他信息' },
  data () {
    return {
      form: {
        needTicket: '',
        rate: '',
        replace: '',
        remark: ''
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

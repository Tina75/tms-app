<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item label="是否开票" type="switch" v-model="form.needTicket" />
          <form-item label="开票税率(%)" type="text" v-model="form.rate" />
        </div>
        <div class="form-section">
          <form-item label="代收货款(元)" type="number" v-model="form.replace" />
        </div>
        <div class="form-section">
          <form-item label="备注" type="textarea" placeholder="请输入(最多输入200字)" maxlength="200" v-model="form.remark" />
        </div>
      </form>
    </cube-scroll>

    <cube-button class="footer" primary>确定</cube-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo: { title: '其他信息' },
  computed: {
    ...mapGetters([
      'otherInfo'
    ]),
    form () {
      return Object.assign({
        needTicket: '',
        rate: '',
        replace: '',
        remark: ''
      }, this.otherInfo)
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


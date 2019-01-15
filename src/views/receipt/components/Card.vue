<template>
  <div class="tab-card">
    <div class="tab-card-title">
      <div class="create-time">{{data.createTime | datetimeFormat}}</div>
    </div>
    <div class="consignee-info">
      <div class="city">
        {{data.departureCityName}} - {{data.destinationCityName}}
      </div>
      <div class="cargos">
        <div class="cargo-infos">{{data.weight || 0}}吨</div>
        <div class="cargo-infos">{{data.volume || 0}}方</div>
        <div class="cargo-infos">{{data.cargoCnt || 0}}件</div>
      </div>
      <div class="company">
        {{data.consignerAddress}} {{data.consignerContact}}
      </div>
      <div class="company">
        客户单号：{{data.customerOrderNo}}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="settlement">月结</div>
        <div class="fee">
          3500/元
        </div>
      </div>
      <div class="left">
        <div class="settlement">回单</div>
        <span class="fee">1</span>份
      </div>
      <!-- <div class="right">
        <a class="btn btn-active">回收</a>
        <a class="btn" style="margin-right: 8px">上传回单</a>
        <a class="btn" style="margin-right: 8px">修改回单</a>
        <a class="btn" style="margin-right: 8px">返厂</a>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'tab-card',
  metaInfo: {
    title: 'tab-card'
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    showAlert() {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '回收',
        prompt: {
          value: '',
          placeholder: '请输入回收人'
        },
        onConfirm: (e, promptValue) => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: `Prompt value: ${promptValue || ''}`
          }).show()
        }
      }).show()
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-card
  background #fff
  margin-top 15px
  padding 0 15px
.tab-card-title
  padding 10px 10px 10px 0
  .create-time
    font-size 14px
    line-height 20px
    color #666
    display inline-block
.consignee-info
  padding-bottom 15px
  .city
    color #333
    font-size 18px
  .cargos
    margin-top 4px
    .cargo-infos
      display inline-block
      padding 0 5px
      color #333
      font-size 12px
      line-height 17px
      background #efefef
      margin-right 5px
  .address
    font-size 14px
    margin-top 7px
  .company
    color #666
    font-size 14px
    line-height 20px
.footer
  border-top 1px sold #ccc
  overflow hidden
  padding 8px 0
  .left
    width 50%
    .settlement
      font-size 12px
    .fee
      color #FA8C16
      font-size 20px
      line-height 28px
  .right
    margin-top 4px
    .btn
      display block
      width 54px
      line-height 30px
      float right
      text-align center
      border-radius 4px
      color #999
      border 1px solid #999
      font-size 14px
    .btn-active
      color #00A4BD
      border-color #00A4BD
.right
  float right
.left
  float left
.yellow
  background #FA8C16
.grey
  background #6c798e
.green
  background #00c185
</style>

<template>
  <div class="form-item-box">
    <div class="form-item">
      <div class="form-item-label">{{label}}</div>
      <div class="form-item-input-box">
        <div class="input-box">
          <slot/>
        </div>
        <div class="right-action">
          <slot name="right"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'form-item',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-item
  overflow hidden
  font-size 15px
  padding 10px 0
  display flex
  line-height 22px
.form-item-label
  color #666
  width 85px
.form-item-input-box
  flex 1
  color #333
  margin-right 15px
  text-align right
  display flex
  word-break break-all
  .input-box
    flex 1
    vertical-align middle
    p
      display inline-block
      text-align left
  .right-action
    float right
    vertical-align middle
    i
      margin-left 5px
</style>

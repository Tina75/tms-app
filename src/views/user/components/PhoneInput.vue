<template>
  <cube-input
    v-model="phone"
    placeholder="请输入新手机号"
    :clearable="true"
    :maxlength="13"
    class="user-input"
  >
  </cube-input>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      phone: ''
    }
  },
  watch: {
    value () {
      this.phone = this.formatePhoneNum(this.value)
    },
    phone (value) {
      this.$emit('input', value.replace(/\s/g, ''))
    }
  },
  methods: {
    formatePhoneNum (temp) {
      if (/^1/.test(temp)) {
        let str = temp.replace(/\s/g, '')
        if (temp.length > 3 && temp.length < 8) {
          temp = str.substr(0, 3) + ' ' + str.substr(3, 4)
        } else if (temp.length >= 8) {
          temp = [str.substr(0, 3), str.substr(3, 4), str.substr(7, 4)].join(' ')
        }
      }
      return temp
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .user-input
    &:after
      display: none
  >>> .cube-input-field
    padding-left: 0;
    border: none
    outline 0
    font-size: 16px;
    color: #333333
    &::-webkit-input-placeholder
      color #999999
    &:nth-child(3)
      margin-right: 10px;
  >>> .cube-input-append
    margin-top: -15px
</style>

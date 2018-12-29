<template>
  <div class="user-name">
    <p class="tips">真实姓名有助于TMS操作者辨识您的身份</p>
    <cell-group>
      <cell-item>
        <cube-input
          v-model="userName"
          placeholder="请填写您的真实姓名"
          :clearable="true"
          :maxlength="10"
          class="user-input"
        >
        </cube-input>
      </cell-item>
    </cell-group>
    <div class="btns">
      <cube-button
        :disabled="!userName"
        @click="submitNewName">
        提交
      </cube-button>
    </div>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'
import { mapActions } from 'vuex'

export default {
  name: 'user-name',
  metaInfo: {
    title: '编辑姓名'
  },
  data () {
    return {
      userName: ''
    }
  },
  components: { CellGroup, CellItem },
  methods: {
    ...mapActions(['getUserInfo', 'editUserInfo']),
    submitNewName () {
      this.editUserInfo({
        type: 2,
        value: this.userName
      }).then(() => {
        this.$router.back()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUserInfo().then(res => {
        vm.userName = res.name
      })
    })
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .user-name
    height: 100%;
    background-color: #F3F3F3
    .tips
      padding-left: 15px;
      line-height: 55px;
      font-size: 15px;
      color: #555555;
    .user-input
      &:after
        display: none
    >>> .cube-input-field
          padding-left: 0;
          border: none
          outline 0
          font-size: 16px;
          color: #333333;
          &::-webkit-input-placeholder
            color #999999
    >>> .cube-input-append
      margin-top: -15px
    .btns
      padding: 15px
</style>

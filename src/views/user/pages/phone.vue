<template>
  <div class="user-phone">
    <p class="tips">原手机号为{{userInfo.phone}}，将更换为：</p>
    <cell-group>
      <cell-item>
        <phone-input v-model="phone">
        </phone-input>
      </cell-item>
      <cell-item>
        <cube-input
          v-model="captcha"
          placeholder="请输入验证码"
          :maxlength="4"
          class="user-input"
        >
          <a
            slot="append"
            class="captcha-btn"
            @click="getCaptcha">
            {{captchaText}}
          </a>
        </cube-input>
      </cell-item>
    </cell-group>
    <p
      v-if="validError"
      class="error-text">
      {{validError}}
    </p>
    <div class="btns">
      <cube-button
        :disabled="realTimeValid || !countDownInterval"
        @click="submitNewName">
        提交
      </cube-button>
    </div>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'
import PhoneInput from '../components/PhoneInput'
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

Vue.filter('phoneFormat', (value) => {
  return value + 'aaa'
})

export default {
  name: 'user-phone',
  metaInfo: {
    title: '修改手机号'
  },
  data () {
    return {
      phone: '',
      captcha: '',
      validError: '',
      captchaText: '获取验证码',
      countDown: 60,
      countDownInterval: null
    }
  },
  components: { CellGroup, CellItem, PhoneInput },
  watch: {},
  computed: {
    ...mapGetters(['userInfo']),
    realTimeValid () {
      if (!/^1\d{10}$/.test(this.phone)) {
        return true
      } else if (this.phone === this.userInfo.phone) {
        return true
      } else return !/^\d{4}$/.test(this.captcha)
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'queryCaptcha', 'editUserInfo']),
    submitNewName () {
      this.submitValid().then(() => {
        this.editUserInfo({
          type: 3,
          value: this.phone,
          captcha: this.captcha
        }).then(() => {
          this.$router.back()
        }).catch(err => {
          if (err.data.code === 210309) {
            this.validError = '该号码已被注册'
          }
        })
      }).catch(err => {
        this.validError = err.message
      })
    },
    getCaptcha () {
      this.captchaValid().then(() => {
        this.captcha = ''
        this.countDown = 60
        this.validError = ''
        this.queryCaptcha(this.phone)
          .then(() => {
            this.$createToast({
              txt: '短信验证码已发送，请注意查收',
              type: 'txt'
            }).show()
            this.countDownInterval = setInterval(() => {
              if (this.countDown > 0) {
                this.captchaText = `${this.countDown}秒后重新获取`
              } else {
                this.captchaText = `重新获取验证码`
                clearInterval(this.countDownInterval)
              }
              this.countDown--
            }, 1000)
          }).catch(err => {
            if (err.data.code === 210309) {
              this.validError = '该号码已被注册'
            }
          })
      }).catch(err => {
        this.validError = err.message
      })
    },
    captchaValid () {
      return new Promise((resolve, reject) => {
        if (!this.phone) {
          reject(new Error('请先输入手机号码，再获取验证码'))
        } else if (!/^1\d{10}$/.test(this.phone)) {
          reject(new Error('手机号码错误，请输入11位的手机号'))
        } else if (this.phone === this.userInfo.phone) {
          reject(new Error('该号码与当前账号相同，请勿重复操作'))
        } else if (this.countDown > 0 && this.countDown < 60) {
          reject(new Error('您已经获取过验证码'))
        } else {
          resolve()
        }
      })
    },
    submitValid () {
      return new Promise((resolve, reject) => {
        if (!this.phone) {
          reject(new Error('请先输入手机号码，再获取验证码'))
        } else if (!/^1\d{10}$/.test(this.phone)) {
          reject(new Error('手机号码错误，请输入11位的手机号'))
        } else if (this.phone === this.userInfo.phone) {
          reject(new Error('该号码与当前账号相同，请勿重复操作'))
        } else if (this.countDown === 60) {
          reject(new Error('请点击获取验证码'))
        } else if (!/^\d{4}$/.test(this.captcha)) {
          reject(new Error('请输入正确的验证码'))
        } else {
          resolve()
        }
      })
    },
    resetForm () {
      this.phone = ''
      this.captcha = ''
      this.validError = ''
      this.captchaText = '获取验证码'
      this.countDown = 60
      clearInterval(this.countDownInterval)
      this.countDownInterval = null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUserInfo().then(() => {
        vm.resetForm()
      })
    })
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .user-phone
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
          color: #333333
          &::-webkit-input-placeholder
            color #999999
          &:nth-child(3)
            margin-right: 10px;
    >>> .cube-input-append
          margin-top: -15px
      .captcha-btn
        width:100px;
        height:25px;
        border-radius:2px;
        border:1px solid #cacaca
        text-align: center
        font-size: 12px;
        color: #999999;
        line-height: 25px;
        margin-top: 15px;
    .error-text
      padding-left: 15px;
      line-height: 25px;
      color: #EA4040;
      font-size: 12px;
    .btns
      padding: 15px
</style>

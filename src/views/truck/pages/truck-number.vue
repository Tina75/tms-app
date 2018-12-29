<template>
  <div class="truckNo">
    <div class="truckNo_top">
      请填写车牌号
    </div>
    <div
      class="truckNo_input"
      @click="showKeyboard=true">
      <div class="truckNo_input_city">
        <span>{{carCity}}</span>
        <div>
          <img src="../assets/truck_select.png">
        </div>
      </div>
      <div class="truckNo_input_number">
        <span
          v-if="!carNo || carNo.length < 2"
          class="placeholder">
          请填写车牌号
        </span>
        <span v-text="carNo.slice(1)" />
      </div>
    </div>
    <div class="truckNo_submit">
      <cube-button
        :disabled="disabled"
        :primary="true"
        @click="submit">
        确认
      </cube-button>
    </div>
    <cube-popup
      ref="popup"
      v-model="showKeyboard"
      :mask-closable="true"
      position="bottom">
      <keyboard
        v-model="carNo"
        @cancel="showKeyboard=false"
        @confirm="showKeyboard=false" />
    </cube-popup>
  </div>
</template>
<script>
import keyboard from '../components/keyboard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'truckNumber',
  metaInfo: {
    title: '车牌号码'
  },
  components: { keyboard },
  data () {
    return {
      carNo: '',
      showKeyboard: false,
      disabled: true
    }
  },
  computed: {
    ...mapGetters(['TruckInfo']),
    carCity () {
      return this.carNo ? this.carNo.slice(0, 1) : '京'
    }
  },
  watch: {
    showKeyboard () {
      if (this.showKeyboard === false && this.carNo) {
        this.checkCarNo()
      }
    }
  },
  methods: {
    ...mapActions(['setTruckNo']),
    checkCarNo () {
      const reg = /^[a-zA-Z]/
      if (this.carNo.length < 7 || !reg.test(this.carNo.slice(1, 2))) {
        this.$createToast({
          txt: '车牌号码格式不正确',
          type: 'txt'
        }).show()
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    async submit () {
      let data = {
        editType: 4,
        oldValueCode: null,
        oldValueName: this.TruckInfo.truckNo,
        newValueName: this.carNo
      }
      this.setTruckNo(data).then(() => {
        this.carNo = ''
        this.$router.back()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.carNo = ''
      vm.disabled = true
    })
  }
}
</script>
<style lang="stylus" scoped>
.truckNo
  height 100%
  &_top
    font-size 15px
    color #555555
    padding 16px 13px
  &_input
    height 55px
    padding 16px 28px
    box-sizing border-box
    background-color #ffffff
    display flex
    -webkit-display flex
    line-height 25px
    &_city
      display flex
      -webkit-display flex
      align-content center
      border-right 1px solid #D8D8D8
      padding-right 11px
      span
        font-size 18px
        color #189CB2
        font-weight 600
        margin-right 16px
      img
        width 10px
        height 5px
        margin-bottom 5px
    &_number
      font-size 16px
      padding 0px 16px
      color #242424
      letter-spacing 5px
      .placeholder
        color #C9CED9
  &_submit
    margin-top 27px
    padding 0px 12px
    .cube-btn
      font-size 18px
      height 46px
      padding 11px 0px
>>>.cube-popup
  display flex
  flex-direction column-reverse
>>>.cube-popup-mask
  opacity 0
>>>.cube-popup-container
  transform: none
  position relative
  height auto
  width auto
>>>.cube-popup-content
  transform: none
  position relative
  animation truck_keyboard .3s ease forwards
@keyframes truck_keyboard {
  0% {
    transform:translateY(100%)
  }
  100%{
     transform:translateY(0)
  }
}
</style>

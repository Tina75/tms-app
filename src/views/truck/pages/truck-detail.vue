<template>
  <div class="truckDetail">
    <div class="truckDetail_top">{{MODE.title}}</div>
    <div class="truckDetail_select">
      <div class="truckDetail_options">
        <div
          v-for="(item, index) in MODE.tags"
          :key="index"
          class="truckDetail_tags">
          <input
            :id="'tags_'+index"
            v-model="tag"
            :value="item.code"
            name="tag"
            type="radio"
            @change="saveName(item.value)">
          <label
            :for="'tags_'+index"
            v-text="item.value" />
          <i v-if="tag === item.code"></i>
        </div>
      </div>
      <div
        v-if="MODE.tags && tag === MODE.tags[MODE.tags.length-1].code"
        class="truckDetail_other">
        <input
          v-if="otherConfig"
          v-model="truckTypeName"
          type="text"
          :maxlength="8"
          :placeholder="MODE.others"
        >
        <input
          v-else
          v-model="truckLengthName"
          type="number"
          :placeholder="MODE.others"
          @keydown="limitInput"
          @input="onInput"
        >
      </div>
    </div>
    <div class="truckDetail_submit">
      <cube-button
        :primary="true"
        :disabled="disabled"
        @click="submit">
        提交
      </cube-button>
    </div>
  </div>
</template>
<script>
import MODE_CONFIG from '../assets/mode-config.json'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'truckDetail',
  metaInfo () {
    return {
      title: this.MODE.pageTitle
    }
  },
  data () {
    return {
      tag: null,
      truckTypeName: '',
      truckLengthName: '',
      truckName: ''
    }
  },
  computed: {
    ...mapGetters(['TruckInfo']),
    MODE () {
      return MODE_CONFIG[this.$route.params.type] || {}
    },
    otherConfig () {
      return this.$route.params.type === 'proto'
    },
    disabled () {
      const tags = this.MODE.tags || [{ code: '', value: '' }]
      const code = tags[tags.length - 1].code
      if (this.tag && this.tag !== code) {
        return false
      } else if (this.truckTypeName || this.truckLengthName) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions(['setTruckNo']),
    limitInput (e) {
      let value = e.target.value + ''
      let pointIndex = value.indexOf('.')
      const code = e.keyCode
      console.log(value, pointIndex, code, value.slice(pointIndex + 1).length)
      if (pointIndex > -1 && value.slice(pointIndex + 1).length === 1 && code !== 8) {
        e.preventDefault()
      }
    },
    // 兼容安卓
    onInput (e) {
      this.truckLengthName = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
    },
    saveName (value) {
      if (this.tag === this.MODE.tags[this.MODE.tags.length - 1].code) {
        this.truckName = ''
      } else {
        this.truckName = value
      }
    },
    async submit () {
      const data = {
        proto: {
          editType: 5,
          oldValueCode: 1101,
          oldValueName: '',
          newValueCode: this.tag,
          newValueName: this.truckName ? this.truckName : this.truckTypeName
        },
        length: {
          editType: 6,
          oldValueCode: 1201,
          oldValueName: '',
          newValueCode: this.tag,
          newValueName: this.truckName ? this.truckName : this.truckLengthName
        }
      }
      this.setTruckNo(data[this.$route.params.type]).then(() => {
        this.$router.back()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.tag = null
      vm.truckName = vm.MODE.tags[0].value
      vm.truckTypeName = ''
      vm.truckLengthName = ''
    })
  }
}
</script>
<style lang="stylus" scoped>
.truckDetail
  &_top
    font-size 15px
    color #555555
    padding 16px 13px
  &_select
    background-color #ffffff
    padding 19px 12px 36px 12px
  &_options
    display flex
    justify-content space-between
    flex-wrap wrap
  &_options:after
    content ''
    width 171px
  &_tags
    margin-bottom 11px
    height 40px
    width 80px
    position relative
    input
      display none
    label
      padding 9px 0px
      font-size 15px
      height 100%
      border 1px solid #DADADA
      color #555
      display inline-block
      width 100%
      text-align center
      line-height 21px
      border-radius 4px
      box-sizing border-box
    input:checked + label
      border-color #189CB2
      color #189CB2
    i
      position absolute
      right 0px
      bottom 0px
      display block
      width 15px
      height 15px
      background url('../assets/truck_checked.png') center no-repeat
      background-size 15px
  &_other
    width 100%
    border-bottom 1px solid #D2D2D2
    color #999999
    font-size 15px
    line-height 21px
    input
      padding 10px 0px
      border none
      outline none
  &_submit
    width 100%
    position fixed
    bottom 0px
    .cube-btn
      font-size 18px
      border-radius 0
      height 43px
      padding 10px 170px
</style>

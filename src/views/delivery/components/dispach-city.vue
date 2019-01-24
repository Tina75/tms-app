<!-- 调度工作台 城市选择 -->
<template>
  <div class="city-content">
    <div class="city-cell start border-bottom-1px" @click="startSelVisable = !startSelVisable" >
      <div class="city-left">
        <span class="city-icon start-icon">始</span>始发地
      </div>
      <div class="city-right">
        {{startCode | codeToName}}&nbsp;
        <i class="iconfont icon-ico_right"/>
      </div>
    </div>
    <city-picker :value="startSelVisable" :deep="3" @confirm="confirmStart"/>
    <div class="city-cell cube-ml-15" @click="endSelVisable = !endSelVisable">
      <div class="city-left">
        <span class="city-icon end-icon">目</span>目的地
      </div>
      <div class="city-right">
        {{endCode | codeToName}}&nbsp;
        <i class="iconfont icon-ico_right"/>
      </div>
    </div>
    <city-picker :value="endSelVisable" :deep="3" @confirm="confirmEnd"/>
  </div>
</template>

<script>
import CityPicker from '@/components/CityPicker'
import { setAppTitleBtn } from '@/libs/bridgeUtil'

export default {
  name: 'delivery-dispach-city',
  components: { CityPicker },
  props: {
    startCode: { type: Number, default: -1 },
    endCode: { type: Number, default: -1 }
  },
  data () {
    return {
      startSelVisable: false,
      endSelVisable: false
    }
  },
  activated() {
    this.$nextTick(() => {
      setAppTitleBtn({
        text: '返回',
        iconType: 'back',
        position: 'left',
        action: () => {
          if (this.startSelVisable || this.endSelVisable) {
            this.startSelVisable = false
            this.endSelVisable = false
          } else {
            this.$router.back()
          }
        }
      })
    })
  },

  methods: {
    confirmStart(val) {
      if (val && val.length) {
        const sel = val[val.length - 1]
        this.$emit('update:startCode', sel.code)
        this.startSelVisable = false
      }
    },
    confirmEnd(val) {
      if (!val || !val.length) return
      const sel = val[val.length - 1]
      this.$emit('update:endCode', sel.code)
      this.endSelVisable = false
    }
  }
}

</script>
<style lang='stylus' scoped>
.city-content
  background white
  .city-cell
    display flex
    display -webkit-flex
    font-size 15px
    height 50px
    line-height 50px
    color #333333
    justify-content space-between
    i
      color #C5C8CE
  .city
    &-icon
      color white
      font-size 12px
      border-radius 2px
      padding 0 4px
      margin-right 15px
    &-left
      width 100px
    &-right
      text-align right
      padding-right 15px
  .start
    margin-left 15px
    &-icon
      background #00A4BD
  .end
    &-icon
      background #333
</style>

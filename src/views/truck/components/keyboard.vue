<template>
  <div class="keyboard">
    <div class="confirm-group">
      <div
        class="cube-pull-left cube-font-15"
        @click="$emit('cancel')">
        取消
      </div>
      <div
        class="cube-pull-right cube-font-15 cube-c-blue"
        @click="$emit('confirm')">
        确定
      </div>
    </div>
    <div class="btns-wrap">
      <div
        v-for="(row,i) in btns"
        :key="i"
        class="keyboard-row border-top-1px">
        <div
          v-for="(btn,j) in row"
          :key="j"
          class="keyboard-btn border-left-1px"
          @click="clickBtn(btn)"
          v-text="btn" />
        <div
          v-if="i===btns.length-1"
          class="keyboard-btn remove-btn border-left-1px"
          @click="clickBtn()">
          <div>
            X
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      type: 'city',
      city: [
        ['京', '津', '沪', '渝', '冀', '晋'],
        ['蒙', '辽', '苏', '浙', '皖', '闽'],
        ['赣', '鲁', '豫', '鄂', '桂', '琼'],
        ['川', '贵', '云', '藏', '吉', '湘'],
        ['陕', '黑', '粤', '甘', '青', '宁'],
        ['新', '', '', '', '']
      ],
      number: [
        ['A', 'B', 'C', 'D', 'E', 'F'],
        ['G', 'H', 'J', 'K', 'L', 'M'],
        ['N', 'P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y', 'Z'],
        ['0', '1', '2', '3', '4', '5'],
        ['6', '7', '8', '9', '']
      ]
    }
  },
  computed: {
    btns () {
      return this[this.value.length > 0 ? 'number' : 'city']
    }
  },
  // mounted () {
  //   this.type = this.value.length > 0 ? 'number' : 'city'
  //   console.info(this.type)
  // },
  methods: {
    clickBtn (v) {
      const old = this.value || ''
      const length = old.length
      const newValue = v
        ? length <= 7 ? old + v : old
        : old.slice(0, old.length - 1)
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="stylus" scoped>
.confirm-group
  div
    text-align center
    width 60px
    height 52px
    line-height 52px
.btns-wrap
  padding 0 8px
.keyboard
  width 100%
  background #fff
  display flex
  flex-direction column
  box-sizing border-box
  overflow hidden
.keyboard-row
  display flex
.keyboard-btn
  flex 1
  font-size 18px
  line-height 37px
  text-align center
.keyboard-btn:first-child:after,
.keyboard-row:first-child:after
  border none
.remove-btn
  position relative
  div
    position absolute
    left 50%
    top 50%
    color #fff
    background #999
    display inline-block
    vertical-align bottom
    transform translate(-5px, -10px)
    width 20px
    height 20px
    line-height 20px
    font-size 14px
    &:after
      content ''
      width 0
      height 0
      border 10px solid transparent
      border-right 10px solid #999
      position absolute
      left -20px
      top 0px
.cube-pull-left
  float left
.cube-pull-right
  float right
.cube-font-15
  font-size 15px
.cube-c-blue
  color #418DF9
</style>

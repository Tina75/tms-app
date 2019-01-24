<template>
  <div class="transport-line">
    <i class="transport-line__icon" />
    <form-item
      v-model="from.sn"
      type="click"
      :label="label[0]"
      :click-icon="from.sn ? 'icon-shanchu-shuru remove-btn-color' : ''"
      placeholder="请选择出发地城市"
      @on-click="showPickCity(0)"
      @on-icon-click="handleRemove(0)"
    />
    <form-item
      v-model="to.en"
      type="click"
      :label="label[1]"
      :click-icon="to.en ? 'icon-shanchu-shuru remove-btn-color' : ''"
      placeholder="请选择目的地城市"
      @on-click="showPickCity(1)"
      @on-icon-click="handleRemove(1)"
    />

    <CityPicker v-model="pickCityVisible" @confirm="citySelect"/>
  </div>
</template>

<script>
import FormItem from '@/components/Form/FormItem'
import CityPicker from '@/components/CityPicker'

export default {
  name: 'TransportLine',
  components: { CityPicker, FormItem },

  props: {
    label: {
      type: Array,
      default: () => ['出发地', '目的地']
    },
    value: {
      type: [Object, String],
      required: true,
      default: () => {}
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data () {
    return {
      pickCityVisible: false,
      isDestination: false, // 目标值是否是目的地
      from: { s: '', sn: '' },
      to: { e: '', en: '' }
    }
  },

  watch: {
    value (newVal) {
      this.from = { s: newVal.s || '', sn: newVal.sn || '' }
      this.to = { e: newVal.e || '', en: newVal.en || '' }
    },
    visible (newVal) {
      this.pickCityVisible = newVal
    }
  },

  methods: {
    showPickCity (index) {
      this.pickCityVisible = true
      this.$emit('update:visible', true)
      this.isDestination = Boolean(index)
    },

    citySelect (city) {
      let address = []
      city.forEach(({ name }) => {
        address = address.includes(name) ? [ ...address, '全境' ] : [ ...address, name ]
      })
      address = address.join('')
      const res = city.slice(-1)[0]
      let eventData = {}
      if (this.isDestination) {
        eventData = {
          e: res.code,
          en: address,
          s: this.value.s,
          sn: this.value.sn
        }
      } else {
        eventData = {
          e: this.value.e,
          en: this.value.en,
          s: res.code,
          sn: address
        }
      }
      console.log(eventData)
      this.$emit('input', eventData)
    },

    handleRemove (index) {
      const isDestination = Boolean(index)
      let eventData = {}
      if (isDestination) {
        eventData = {
          e: '',
          en: '',
          s: this.value.s,
          sn: this.value.sn
        }
      } else {
        eventData = {
          e: this.value.e,
          en: this.value.en,
          s: '',
          sn: ''
        }
      }
      console.log(eventData)
      this.$emit('input', eventData)
    }
  }
}
</script>

<style lang="stylus">
.transport-line
  position relative
  padding-left 20px
  .remove-btn-color
    color #C5C8CE !important
  .form-item-icon::before
    display none
  &__icon
    position absolute
    display block
    left 17px
    top 22px
    bottom 22px
    border-left 1px dashed #E4E7EC
    &::before
      content ''
      position absolute
      top 0
      left -3px
      height 6px
      width 6px
      border-radius 100%
      background #00A4BD
    &::after
      content ''
      position absolute
      bottom 0
      left -3px
      height 6px
      width 6px
      border-radius 100%
      background #252A2F
</style>

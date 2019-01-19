<template>
  <div>
    <form-item
      v-model="from.sn"
      type="click"
      :label="label[0]"
      placeholder="请选择出发地城市"
      @on-click="showPickCity(0)"
    />
    <form-item
      v-model="to.en"
      type="click"
      :label="label[1]"
      placeholder="请选择目的地城市"
      @on-click="showPickCity(1)"
    />

    <CityPicker v-model="pickCityVisible" @confirm="citySelect"/>
  </div>
</template>

<script>
import FormItem from '@/components/Form/FormItem'
import CityPicker from '@/components/CityPicker'

export default {
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
    }
  },

  data () {
    return {
      pickCityVisible: false,
      isDestination: false, // 目标值是否是目的地
      from: {
        s: '',
        sn: ''
      },
      to: {
        e: '',
        en: ''
      }
    }
  },

  watch: {
    value (newVal) {
      this.from = {
        s: newVal.s || '',
        sn: newVal.sn || ''
      }
      this.to = {
        e: newVal.e || '',
        en: newVal.en || ''
      }
    }
  },

  methods: {
    showPickCity (index) {
      this.pickCityVisible = true
      this.isDestination = Boolean(index)
    },

    citySelect (city) {
      console.log(city)
      let address
      let eventData = {}

      if (city[0].name === city[1].name) {
        address = city[1].name + city[2].name
      } else {
        address = city[0].name + city[1].name + city[2].name
      }

      const res = city.slice(-1)[0]

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
    }
  }
}
</script>

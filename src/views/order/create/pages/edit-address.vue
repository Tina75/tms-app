<template>
  <div class="contacts-address">
    <form-group
      class="border-bottom-1px"
      ref="$form"
      v-model="form">
      <form-item
        :value="localeView"
        label="所在地区"
        type="click"
        placeholder="请选择省/市/区"
        @click.native="showCityPicker = true" />
      <form-item
        v-model="form.address"
        label="详细地址"
        placeholder="请输入详细地址"
        clearable />
      <form-item
        v-model="form.extra"
        label="补充地址"
        placeholder="请输入楼号-门牌号"
        clearable />
    </form-group>
    <template v-if="showOftenList">
      <p class="address-list-title">常用地址</p>

      <ul class="address-often-list list">
        <li
          class="list-item"
          v-for="item in oftenAddresses" :key="item.id"
          @click="pickOftenAddress(item)">
          <div class="item-icon">
            <icon-font name="icon-ico_location" size="20" color="#ffffff" />
          </div>

          <div class="item-info border-bottom-1px">
            <p class="item-info-title">{{ item.cityName || '' }}</p>
            <p class="item-info-data">
              {{ item.address }}
            </p>
          </div>
        </li>
      </ul>
    </template>
    <bmap-address-list
      v-show="showAddressList"
      :city="limitCityGeo"
      :search="form.address"
      @select="onSelectAddress" />
    <cube-button
      primary
      @click="submit">
      确定
    </cube-button>
    <city-picker
      v-model="showCityPicker"
      @confirm="confirmCity" />
  </div>
</template>
<script>
import yddArea from 'ydd_area'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { Address } from '@/views/contacts/common/model'
import cityUtil from '@/libs/city'
import CityPicker from '@/components/CityPicker'
import FormGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import BmapAddressList from '@/views/contacts/components/BmapAddressList'

export default {
  name: 'edit-address',
  metaInfo() {
    return {
      title: this.currentArrdessType === 'send' ? '发货地址' : '收货地址'
    }
  },
  components: {
    FormItem,
    FormGroup,
    CityPicker,
    BmapAddressList
  },
  data() {
    return {
      form: {
        locale: [],
        longitude: '',
        latitude: '',
        address: '',
        extra: '',
        cityCode: ''
      },
      oftenAddresses: [],
      showCityPicker: false
    }
  },
  computed: {
    ...mapState('contacts/consignee', [ 'saveConsigner' ]),
    ...mapGetters('order/create', [ 'currentArrdessType', 'orderInfo' ]),

    showOftenList () { return this.currentArrdessType === 'send' && !this.form.address && this.oftenAddresses.length },
    showAddressList () { return !!this.form.address },
    localeView () { return cityUtil.getCityNameArray(this.form.locale).join('/') },

    limitCityGeo () {
      const data = this.form.locale
      const length = data.length
      if (length) {
        let deeper = data[length - 1]
        return {
          lat: deeper.lat,
          lon: deeper.lon
        }
      }
      return ''
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_ADDRESS_INFO' ]),
    ...mapActions('order/create', [ 'getOftenAddress' ]),

    onSelectAddress (item) {
      this.form.address = item.detail + item.name
      this.form.latitude = item.data.point.lat
      this.form.longitude = item.data.point.lng
    },

    confirmCity (data) {
      this.form.locale = data
      this.form.cityCode = data[data.length - 1].code
    },

    pickOftenAddress (addressInfo) {
      const { cityCode, latitude, longitude, address, consignerHourseNumber } = addressInfo
      this.form.cityCode = cityCode
      this.form.latitude = latitude
      this.form.longitude = longitude
      this.form.address = address
      this.form.extra = consignerHourseNumber
      this.formartLocale(cityCode)
    },

    formartLocale (cityCode) {
      if (!cityCode) return
      const codes = [ Number(cityCode) ]
      const cityInfos = yddArea.getParentByCode(cityCode)
      codes.unshift(Number(cityInfos.code))
      if (Number(cityInfos.parent) !== 0) codes.unshift(Number(cityInfos.parent))
      this.form.locale = codes.map(code => {
        const item = yddArea.getItemByCode(code)
        return {
          code: String(item.code),
          name: item.name,
          shortName: item.shortName,
          lat: String(item.lat),
          lon: String(item.lon)
        }
      })
    },

    async fetchAddressData () {
      if (!this.saveConsigner.id) return
      this.oftenAddresses = await this.getOftenAddress(this.saveConsigner.id)
    },

    async submit () {
      this.SET_ADDRESS_INFO(Object.assign({}, this.form))
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const info = vm.orderInfo
      const form = vm.form
      if (vm.currentArrdessType === 'send') {
        form.address = info.consignerAddress
        form.extra = info.consignerHourseNumber
        form.longitude = info.consignerAddressLongitude
        form.latitude = info.consignerAddressLatitude
        form.locale = info.consignerAddressLocale
        vm.fetchAddressData()
      } else {
        form.address = info.consigneeAddress
        form.extra = info.consigneeHourseNumber
        form.longitude = info.consigneeAddressLongitude
        form.latitude = info.consigneeAddressLatitude
        form.locale = info.consigneeAddressLocale
        vm.formartLocale(info.end)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.$form.reset()
    next()
  }
}
</script>
<style lang='stylus' >
  @import '../style/list.styl';

  .contacts-address
    height 100%
    display flex
    flex-direction column
    background #fff

  .address-list-title
    padding 0 15px
    line-height 52px
    color #666666

  .address-often-list
    flex 1


</style>

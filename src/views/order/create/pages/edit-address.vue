<template>
  <div class="contacts-address">
    <form-group
      ref="$form"
      v-model="form"
      :rules="rules"
      class="border-bottom-1px">
      <form-item
        v-if="showCityOption"
        :value="localeView"
        label="所在地区"
        type="click"
        placeholder="请选择省/市/区"
        @click.native="showCityPicker = true" />
      <form-item
        v-model="form.address"
        prop="address"
        label="详细地址"
        maxlength="100"
        placeholder="请输入详细地址"
        clearable
        @on-focus="allowSearch = true"
        @on-blur="allowSearch = false" />
      <form-item
        v-model="form.extra"
        label="补充地址"
        maxlength="50"
        placeholder="请输入楼号-门牌号"
        clearable />
    </form-group>
    <div class="contacts-address-list">
      <template v-if="(showOftenList || !allowSearch) && oftenAddresses.length">
        <p class="address-list-title">常用地址</p>
        <ul class="address-often-list list">
          <li
            v-for="item in oftenAddresses"
            :key="item.id" class="list-item"
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
        :search="allowSearch ? form.address : ''"
        @select="onSelectAddress" />
    </div>
    <cube-button
      class="footer-button"
      primary
      @click.stop="submit">
      确定
    </cube-button>
    <city-picker
      v-model="showCityPicker"
      @confirm="confirmCity" />
  </div>
</template>
<script>
import yddArea from 'ydd_area'
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      rules: {
        address: { required: true, type: 'string' }
      },
      oftenAddresses: [],
      showCityPicker: false,
      allowSearch: false
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'currentArrdessType', 'orderInfo', 'orderConfig', 'consignerId' ]),

    showOftenList () { return this.currentArrdessType === 'send' && !this.form.address && this.oftenAddresses.length },
    showAddressList () { return !!this.form.address },
    localeView () { return cityUtil.getCityNameArray(this.form.locale).join('/') },
    showCityOption () {
      if (this.currentArrdessType === 'send') return !!this.orderConfig.startCityOption
      else return !!this.orderConfig.endCityOption
    },

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
      const address = item.detail === item.name ? item.detail : (item.detail || '') + (item.name || '')
      const temp = address.replace(/(.{0,}省){0,1}(.{0,}市){0,1}/, '')
      this.form.address = temp ? temp : address
      this.form.latitude = item.data.point.lat
      this.form.longitude = item.data.point.lng
      this.allowSearch = false
    },

    confirmCity (data) {
      this.form.locale = data
      if (data[data.length - 1].code !== this.form.cityCode) this.allowSearch = true
      this.form.cityCode = data[data.length - 1].code
    },

    pickOftenAddress (addressInfo) {
      const { cityCode, latitude, longitude, address, consignerHourseNumber } = addressInfo
      this.form.cityCode = cityCode || ''
      this.form.latitude = latitude || ''
      this.form.longitude = longitude || ''
      this.form.address = address || ''
      this.form.extra = consignerHourseNumber || ''
      this.formartLocale()
    },

    formartLocale () {
      if (!this.form.cityCode) return
      const codes = [ Number(this.form.cityCode) ]
      const cityInfos = yddArea.getParentByCode(this.form.cityCode)
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
      if (!this.consignerId) return
      this.oftenAddresses = await this.getOftenAddress(this.consignerId)
    },

    async submit () {
      if (!(await this.$refs.$form.validate())) return window.toast('请填写详细地址')
      this.SET_ADDRESS_INFO(Object.assign({}, this.form, { cityName: this.localeView.split('/').join('') }))
      this.$formWillLeave(() => {
        this.showCityPicker = false
        this.$refs.$form.reset()
      })
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const info = vm.orderInfo
      const form = vm.form
      if (vm.currentArrdessType === 'send') {
        form.cityCode = info.start
        form.address = info.consignerAddress.replace(info.startCityName, '') || ''
        form.extra = info.consignerHourseNumber || ''
        form.longitude = info.consignerAddressLongitude || ''
        form.latitude = info.consignerAddressLatitude || ''
        form.locale = info.consignerAddressLocale || ''
        vm.fetchAddressData()
      } else {
        form.cityCode = info.end
        form.address = info.consigneeAddress.replace(info.endCityName, '') || ''
        form.extra = info.consigneeHourseNumber || ''
        form.longitude = info.consigneeAddressLongitude || ''
        form.latitude = info.consigneeAddressLatitude || ''
        form.locale = info.consigneeAddressLocale || ''
      }
      vm.formartLocale()
    })
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
    &-list
      flex 1
      height 100%
      overflow-y auto
    .footer-button
      font-weight bold

  .address-list-title
    padding 0 15px
    line-height 52px
    color #666666

  .address-often-list
    flex 1
</style>

<template>
  <div class="contacts-address">
    <FromGroup ref="form" :rules="rules" class="border-bottom-1px">
      <FormItem
        :value="localeView"
        label="所在地区"
        type="click"
        placeholder="请选择省/市/区"
        @click.native="showCityPicker = true"
      />
      <FormItem
        v-model="form.address"
        label="详细地址"
        :focus-on-end="true"
        placeholder="请输入详细地址"
        prop="address"
      />
      <FormItem v-model="form.additional" label="补充地址" placeholder="请输入楼号-门牌号"/>
    </FromGroup>
    <BmapAddressList :city="limitCityGeo" :search="form.address" @select="onSelectAddress"/>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <CityPicker v-model="showCityPicker" @confirm="confirmCity"/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Address } from './model'
import { addressRule } from './rules.js'
import { setAppRightBtn } from '@/libs/bridgeUtil'
import cityUtil from '@/libs/city'
import CityPicker from '@/components/CityPicker'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import BmapAddressList from '../components/BmapAddressList'
const moudleName = 'contacts'
export default {
  name: 'CommonAddressSelect',
  metaInfo() {
    return {
      title: this.AddressPage.title || ''
    }
  },
  components: {
    FormItem,
    FromGroup,
    LoadingButton,
    CityPicker,
    BmapAddressList
  },
  data() {
    return {
      form: {
        locale: [],
        address: '',
        additional: '',
        addressDetail: null
      },
      rules: addressRule,
      submiting: false,
      showCityPicker: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['AddressPage']),
    localeView() {
      return cityUtil.getCityNameArray(this.form.locale).join('/')
    },
    limitCityGeo() {
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
    },
    namespace() {
      return this.AddressPage.namespace ? this.AddressPage.namespace + '/' : ''
    }
  },
  methods: {
    ...mapActions(moudleName, ['resetAddressPage']),
    onSelectAddress(item) {
      const detail = item.detail || ''
      const title = item.name || ''
      this.form.address = detail.includes(title) ? detail : detail + title
      this.form.addressDetail = item.data
    },
    async submit() {
      try {
        this.submiting = true
        if (!(await this.$refs.form.validate())) {
          return window.toast('请填写详细地址')
        }
        const dispatchName = this.AddressPage.dispatch
        const storeData = Address.toStore(this.form, this.AddressPage.data)
        if (dispatchName) {
          await this.$store.dispatch(this.namespace + dispatchName, storeData)
          this.resetAddressPage()
        } else {
          console.warn('do you forgot to set the [dispatch] options ?')
        }
        window.toast('保存成功')
        this.$router.back(true)
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    confirmCity(data) {
      this.form.locale = data
    },
    reset() {
      const options = this.AddressPage
      this.form = Address.toForm(options.data)
      if (options.appButton) {
        // TODO set app
        const namespace = this.AddressPage.namespace
          ? this.AddressPage.namespace + '/'
          : ''
        const action = options.appButton.action
        const btnOptions = {
          ...options.appButton,
          action: this.doAction.bind(this, namespace + action)
        }
        setAppRightBtn(btnOptions)
      }
    },
    doAction(name = this.namespace + this.AddressPage.appButton.action) {
      if (name) {
        this.$store.dispatch(
          name,
          Address.toStore(this.form, this.AddressPage.data)
        )
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.reset())
  },
  beforeRouteLeave(to, from, next) {
    this.showCityPicker = false
    this.form.address = ''
    next()
  }
}
</script>
<style lang='stylus' >
.contacts-address
  height 100%
  display flex
  flex-direction column
  padding-bottom 44px
  background #fff
</style>

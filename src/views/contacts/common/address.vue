<template>
  <div class="contacts-address">
    <FromGroup class="border-bottom-1px">
      <FormItem
        :value="localeView"
        label="所在地区"
        type="click"
        placeholder="请选择省/市/区"
        @click.native="showCityPicker = true"
      />
      <FormItem v-model="form.address" label="详细地址" placeholder="请输入详细地址"/>
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
        additional: ''
      },
      submiting: false,
      showCityPicker: false,
      confirmed: false
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
    }
  },
  methods: {
    ...mapActions(moudleName, ['resetAddressPage']),
    onSelectAddress(item) {
      this.form.address = item.detail
    },
    async submit() {
      this.submiting = true
      this.confirmed = true
      try {
        const dispatchName = this.AddressPage.dispatch
        const namespace = this.AddressPage.namespace
          ? this.AddressPage.namespace + '/'
          : ''
        const storeData = Address.toStore(this.form, this.AddressPage.data)
        if (dispatchName) {
          await this.$store.dispatch(namespace + dispatchName, storeData)
          this.resetAddressPage()
        } else {
          this.resetAddressPage({
            ...this.AddressPage,
            data: storeData
          })
        }
        this.$router.back()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    confirmCity(data) {
      console.info(data)
      this.form.locale = data
    },
    reset() {
      const options = this.AddressPage
      this.form = Address.toForm(options.data)
      if (options.appButton) {
        // TODO set app
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.reset())
  },
  beforeRouteLeave(to, from, next) {
    this.showCityPicker = false
    const leave = () => {
      this.confirmed = false
      this.resetAddressPage()
      next()
    }
    if (this.confirmed) {
      leave()
    } else {
      this.$createDialog({
        type: 'confirm',
        title: '',
        content: '信息未保存，确认退出吗？',
        icon: 'cubeic-alert',
        onConfirm: leave
      }).show()
    }
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

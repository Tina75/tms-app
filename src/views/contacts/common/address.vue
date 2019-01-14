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
      <FormItem v-model="model.address" label="详细地址" placeholder="请输入详细地址"/>
      <FormItem v-model="model.detail" label="补充地址" placeholder="请输入楼号-门牌号" maxlength="15"/>
    </FromGroup>
    <BmapAddressList :city="limitCityGeo" :search="model.address" @select="onSelectAddress"/>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <CityPicker v-model="showCityPicker" @confirm="confirmCity"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CityPicker from '@/components/CityPicker'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import BmapAddressList from '../components/BmapAddressList'
const moudleName = 'contacts'
export default {
  name: 'ModifyContactsShipperAddress',
  metaInfo() {
    return {
      title: this.CommonAddress.title || ''
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
      model: {
        locale: [],
        address: '',
        detail: ''
      },
      submiting: false,
      showCityPicker: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['CommonAddress']),
    localeView() {
      const data = this.model.locale
      if (data.length) {
        let locale = data.reduce((arr, item, i) => {
          if (i === 0 || item.name !== arr[i - 1]) {
            arr.push(item.name)
          }
          return arr
        }, [])
        return locale.join('/')
      }
      return ''
    },
    limitCityGeo() {
      const data = this.model.locale
      if (data.length) {
        return {
          lat: data[1].lat,
          lon: data[1].lon
        }
      }
      return ''
    }
  },
  methods: {
    onSelectAddress(item) {
      console.info(item)
    },
    async submit() {
      this.submiting = true
      try {
        const dispatchName = this.CommonAddress.dispatch
        const namespace = this.CommonAddress.namespace
          ? this.CommonAddress.namespace + '/'
          : ''
        if (dispatchName) {
          await this.$store.dispatch(namespace + dispatchName)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    confirmCity(data) {
      console.info(data)
      this.model.locale = data
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

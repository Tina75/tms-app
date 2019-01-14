<template>
  <div>
    <FromGroup>
      <FormItem
        v-model="model.locale"
        label="所在地区"
        type="click"
        maxlength="20"
        prop="require"
        placeholder="请选择省/市/区"
        @click.native="showCityPicker = true"
      />
      <FormItem
        v-model="model.address"
        label="详细地址"
        placeholder="请输入详细地址"
        maxlength="15"
        prop="require"
      />
      <FormItem
        v-model="model.detail"
        label="补充地址"
        placeholder="请输入楼号-门牌号"
        maxlength="15"
        prop="require"
      />
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <CityPicker v-model="showCityPicker" @confirm="confirmCity"/>
  </div>
</template>
<script>
import CityPicker from '@/components/CityPicker'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
// const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyContactsShipperAddress',
  metaInfo() {
    return {
      title: this.isCreate ? '新增发货地址' : '修改发货地址'
    }
  },
  components: { FormItem, FromGroup, LoadingButton, CityPicker },
  data() {
    return {
      model: {
        locale: '',
        address: '',
        detail: ''
      },
      submiting: false,
      showCityPicker: false
    }
  },
  computed: {
    isCreate() {
      return true
    }
  },
  methods: {
    async submit() {
      this.submiting = true
      try {
        // await this.modifyContact(ContactDetail.toServer(this.model))
      } catch (e) {
        console.error(e)
      } finally {
        // this.submiting = false
      }
    },
    confirmCity(data) {
      const [province, city, area] = data
      const locale = [province.name]
      if (province.name !== city.name) {
        locale.push(city.name)
      }
      locale.push(area.name)
      this.model.locale = locale.join('/')
    },
    onPageRefresh() {}
  }
}
</script>
<style lang='stylus' >
</style>

<template>
  <div>
    <FromGroup>
      <FormItem v-model="model.name" label="所在地区" type="click" maxlength="20" prop="require"/>
      <FormItem v-model="model.contact" label="详细地址" maxlength="15" prop="require"/>
      <FormItem v-model="model.contact" label="补充地址" maxlength="15" prop="require"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { ContactDetail } from '../modules/model'
// const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyContactsShipperAddress',
  metaInfo() {
    return {
      title: this.isCreate ? '新增发货地址' : '修改发货地址'
    }
  },
  components: { FormItem, FromGroup, LoadingButton },
  data() {
    return {
      model: new ContactDetail(),
      submiting: false
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
    onRefreshPage() {
    }
  }
}
</script>
<style lang='stylus' >
</style>

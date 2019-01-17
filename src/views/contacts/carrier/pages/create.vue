<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup :rules="rules" >
      <FormItem v-model="model.carrierName" label="承运商名称" maxlength="20" prop="require"/>
      <FormItem v-model="model.carrierPrincipal" label="负责人" maxlength="15" prop="require"/>
      <FormItem
        v-model="model.carrierPhone"
        label="联系电话"
        prop="require"
      />
      <FormItem
        v-model="model.payType"
        label="结算方式"
        placeholder="请选择"
        type="select"
        class="cube-mb-15"
        :bottom-line="false"
        :options="options.payType"
      />
      <FormItem v-model="model.remark" maxlength="200" type="textarea" label="备注"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { ContactDetail } from '../modules/model'
const moudleName = 'contacts/carrier'
export default {
  name: 'ModifyContactsCarrier',
  metaInfo() {
    return {
      title: this.isCreate ? '新增承运商' : '修改承运商'
    }
  },
  components: { FormItem, FromGroup, LoadingButton },
  data() {
    return {
      model: new ContactDetail(),
      options: {
        payType: ContactDetail.payType
      },
      rules: {
        require: {
          required: true
        }
      },
      submiting: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['contactDetail']),
    isCreate() {
      return !this.contactDetail.id
    }
  },
  methods: {
    ...mapActions(moudleName, ['modifyContact']),
    async submit() {
      this.submiting = true
      try {
        await this.modifyContact(ContactDetail.toServer(this.model))
        this.$refreshPage('contacts-carrier', 'contacts-carrier-detail')
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    onRefreshPage() {
      this.model = this.isCreate
        ? new ContactDetail()
        : ContactDetail.toForm(this.contactDetail)
    }
  }
}
</script>
<style lang='stylus' >
</style>

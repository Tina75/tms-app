<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup :rules="rules" >
      <FormItem v-model="model.carNO" label="车牌号" maxlength="20" prop="require"/>
      <FormItem v-model="model.driverName" label="司机姓名" maxlength="15" prop="require"/>
      <FormItem v-model="model.driverPhone" label="手机号" maxlength="15" prop="require"/>
      <FormItem
        v-model="model.driverType"
        label="合作方式"
        placeholder="请选择"
        type="select"
        class="cube-mb-15"
        :bottom-line="false"
        :options="options.driverType"
      />

      <FormItem
        v-model="model.carType"
        label="车型"
        placeholder="请选择"
        type="select"
        :options="options.carType"
      />
      <FormItem
        v-model="model.carLength"
        label="车长"
        placeholder="请选择"
        type="select"
        :options="options.carLength"
      />
      <FormItem v-model="model.shippingWeight" label="载重（吨）" maxlength="15"/>
      <FormItem v-model="model.shippingVolume" label="净空（方）" maxlength="15"/>
      <FormItem v-model="model.driverPhone" label="品牌" maxlength="15"/>

      <FormItem
        v-model="model.payType"
        label="购买日期"
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
import { mapActions, mapState, mapGetters } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { ContactDetail } from '../modules/model'
const moudleName = 'contacts/carrier'
export default {
  name: 'ModifyContactsCarrier',
  metaInfo() {
    return {
      title: this.isCreate ? '新增车辆' : '修改车辆'
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

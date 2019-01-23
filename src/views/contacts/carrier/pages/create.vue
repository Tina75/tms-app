<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup ref="form" :rules="rules">
      <FormItem v-model="model.carrierName" label="承运商名称" :maxlength="rules.carrierName.max" prop="carrierName"/>
      <FormItem v-model="model.carrierPrincipal" label="负责人" :maxlength="rules.carrierPrincipal.max" prop="carrierPrincipal"/>
      <FormItem
        v-model="model.carrierPhone"
        label="负责人号码"
        :maxlength="rules.carrierPhone.max"
        prop="carrierPhone"
        type="phone"
      />
      <FormItem
        v-model="model.customerCarrierPhone"
        label="客服号码"
        prop="customerCarrierPhone"
        type="phone"
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
      <FormItem v-model="model.remark" type="textarea" label="备注" prop="remark" :maxlength="rules.remark.max"/>
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
import { contactRule } from '../modules/rules'
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
      rules: contactRule,
      submiting: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['contactDetail']),
    isCreate() {
      return typeof this.$route.query.carrierId === 'undefined'
    }
  },
  methods: {
    ...mapActions(moudleName, ['loadCarrierDetail', 'modifyContact']),
    async submit() {
      try {
        this.submiting = true
        if (!(await this.$refs.form.validate())) {
          return window.toast('请输入必填信息')
        }
        await this.modifyContact(ContactDetail.toServer(this.model))
        this.afterSubmit()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    /* 提交成功后续操作 */
    afterSubmit () {
      this.$refreshPage('contacts-carrier', 'contacts-carrier-detail')
      this.$formWillLeave()
      window.toast(this.isCreate ? '新增承运商成功' : '修改承运商成功')
      this.$router.back()
    },
    async setForm() {
      this.$refs.form.reset()
      if (!this.isCreate) {
        // 编辑操作, 判断store中的值是否是目标, 不是则拉新的
        const urlId = +this.$route.query.carrier
        if (urlId !== +this.contactDetail.id) {
          await this.loadCarrierDetail()
          // 更新了detail的则要刷新detail页
          this.$refreshPage('contacts-carrier-detail')
        }
        this.model = ContactDetail.toForm(this.contactDetail)
      } else {
        this.model = new ContactDetail()
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setForm())
  }
}
</script>
<style lang='stylus' >
</style>

<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup ref="form" :rules="rules">
      <FormItem v-model="form.name" label="发货人名称" prop="name"/>
      <FormItem v-model="form.contact" label="联系人" prop="contact"/>
      <FormItem
        v-model="form.phone"
        :bottom-line="false"
        class="cube-mb-15"
        type="number"
        label="联系人电话"
        prop="phone"
      />
      <FormItem
        v-model="form.pickUp"
        :options="options.pickUp"
        type="select"
        label="提货方式"
        placeholder="请选择"
      />
      <FormItem
        v-model="form.payType"
        :options="options.payType"
        type="select"
        label="支付方式"
        placeholder="请选择"
      />
      <FormItem v-model="form.isInvoice" label="是否开票" type="switch"/>
      <FormItem
        v-if="form.isInvoice"
        v-model="form.invoiceRate"
        prop="invoiceRate"
        type="number"
        required
        label="开票税率(%)"
      />
      <FormItem
        v-model="form.salesmanId"
        :type="operatorSelectType"
        :options="operatorOptions"
        label="对接业务员"
        placeholder="请选择"
      />
      <FormItem
        v-model="form.exploiteChannel"
        :bottom-line="false"
        :options="options.exploiteChannel"
        class="cube-mb-15"
        type="select"
        label="开拓渠道"
        placeholder="请选择"
      />
      <FormItem v-model="form.remark" maxlength="200" type="textarea" label="备注" prop="remark"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { contactRule } from '../modules/rules'
import { ContactDetail } from '../modules/model'
const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyContactsShipper',
  metaInfo() {
    return {
      title: this.isCreate ? '新增发货方' : '修改发货方'
    }
  },
  components: { FormItem, FromGroup, LoadingButton },
  data() {
    return {
      form: new ContactDetail(),
      options: {
        pickUp: ContactDetail.pickUp,
        payType: ContactDetail.payType,
        exploiteChannel: ContactDetail.exploiteChannel
      },
      operatorSelectType: 'select',
      rules: contactRule,
      submiting: false
    }
  },
  computed: {
    ...mapState(moudleName, ['operator', 'contactDetail']),
    operatorOptions() {
      return this.operator.map(item => ({ value: item.id, text: item.name }))
    },
    isCreate() {
      return typeof this.$route.query.consignerId === 'undefined'
    }
  },
  methods: {
    ...mapActions(moudleName, [
      'syncButtOperator',
      'modifyContact',
      'loadContactDetail'
    ]),
    async submit() {
      try {
        this.submiting = true
        if (!(await this.$refs.form.validate())) {
          return window.toast('请输入必填信息')
        }
        await this.modifyContact(ContactDetail.toServer(this.form))
        this.$refreshPage('contacts-shipper', 'contacts-shipper-detail')
        this.$formWillLeave()
        window.toast('保存成功')
        this.$router.back()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    async setForm() {
      this.loadOperators()
      if (!this.isCreate) {
        // 编辑操作, 判断store中的值是否是目标, 不是则拉新的
        const urlId = +this.$route.query.consignerId
        if (urlId !== +this.contactDetail.id) {
          await this.loadContactDetail()
          // 更新了detail的则要刷新detail页
          this.$refreshPage('contacts-shipper-detail')
        }
        this.form = ContactDetail.toForm(this.contactDetail)
      } else {
        this.form = new ContactDetail()
      }
    },
    async loadOperators() {
      if (!this.operatorOptions.length) {
        try {
          this.operatorSelectType = 'loading'
          await this.syncButtOperator()
        } catch (e) {
          console.error(e)
        } finally {
          this.operatorSelectType = 'select'
        }
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

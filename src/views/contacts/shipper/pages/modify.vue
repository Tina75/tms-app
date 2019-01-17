<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup :rules="rules">
      <FormItem v-model="form.name" label="发货人名称" maxlength="20" prop="require"/>
      <FormItem v-model="form.contact" label="联系人" maxlength="15" prop="require"/>
      <FormItem
        v-model="form.phone"
        label="联系人电话"
        :bottom-line="false"
        class="cube-mb-15"
        prop="require"
      />
      <FormItem
        v-model="form.pickUp"
        label="提货方式"
        placeholder="请选择"
        type="select"
        :options="options.pickUp"
      />
      <FormItem
        v-model="form.payType"
        label="支付方式"
        placeholder="请选择"
        type="select"
        :options="options.payType"
      />
      <FormItem v-model="form.isInvoice" label="是否开票" type="switch"/>
      <FormItem
        v-if="form.isInvoice"
        v-model="form.invoiceRate"
        label="开票税率(%)"
        required
        maxlength="2"
        type="number"
      />
      <FormItem
        v-model="form.salesmanId"
        label="对接业务员"
        placeholder="请选择"
        :type="operatorSelectType"
        :options="operatorOptions"
      />
      <FormItem
        v-model="form.exploiteChannel"
        label="开拓渠道"
        placeholder="请选择"
        class="cube-mb-15"
        type="select"
        :bottom-line="false"
        :options="options.exploiteChannel"
      />
      <FormItem v-model="form.remark" maxlength="200" type="textarea" label="备注"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
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
      rules: {
        require: {
          required: true
        }
      },
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
      this.submiting = true
      try {
        await this.modifyContact(ContactDetail.toServer(this.form))
        this.$refreshPage('contacts-shipper', 'contacts-shipper-detail')
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    async onPageRefresh() {
      this.form = new ContactDetail()
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
  }
}
</script>
<style lang='stylus' >
</style>

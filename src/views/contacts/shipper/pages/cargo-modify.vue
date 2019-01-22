<template>
  <div class="cube-default-background cube-has-bottom-btn cube-pt-10">
    <FromGroup ref="form" :rules="rules">
      <FormItem
        v-model="form.cargoName"
        label="货物名称"
        class="cube-mb-15"
        prop="name"
        :maxlength="rules.name.max"
      />
      <FormItem v-model="form.cargoNo" label="货物编号" prop="number" :maxlength="rules.number.max"/>
      <FormItem v-model="form.cargoCost" label="货值(元)" type="number" prop="price" precision="4"/>
      <FormItem
        v-model="form.unit"
        label="包装方式"
        type="click"
        placeholder="请选择"
        @on-click="showPackageType = true"
      />
      <FormItem
        :value="viewDimension"
        label="包装尺寸(毫米)"
        type="click"
        placeholder="请输入长*宽*高"
        @on-click="showDismensionInput = true"
      />
      <FormItem v-model="form.weight" label="重量(公斤)" type="number" prop="weight"/>
      <FormItem
        v-model="form.volume"
        label="体积(方)"
        type="number"
        class="cube-mb-15"
        prop="volume"
        precision="6"
      />
      <FormItem
        v-model="form.remark1"
        label="备注1"
        placeholder="请输入（最多输入100字）"
        type="textarea"
        class="cube-mb-15"
        prop="remark"
        :maxlength="rules.remark.max"
      />
      <FormItem
        v-model="form.remark2"
        label="备注2"
        placeholder="请输入（最多输入100字）"
        type="textarea"
        prop="remark"
        :maxlength="rules.remark.max"
      />
    </FromGroup>
    <CheckboxPopup
      v-model="showPackageType"
      :value="form.unit"
      :options="unitTypes"
      placeholder="请输入包装方式"
      @confirm="form.unit = $event"
    />
    <DimensionPopup v-model="showDismensionInput" :value="form.dimension" @confirm="setDimension"/>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { CargoDetail } from '../modules/model'
import { cargoRule } from '../modules/rules'
import { setAppRightBtn } from '@/libs/bridgeUtil'
import float from '@/libs/float'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import CheckboxPopup from '../../components/CheckboxPopup'
import DimensionPopup from '../../components/DimensionPopup'
const moudleName = 'contacts/shipper'

const isNum = v => typeof v === 'number'
export default {
  name: 'ModifyContactsShipperCargo',
  metaInfo() {
    return {
      title: this.isCreate ? '新增常发货物' : '修改常发货物'
    }
  },
  components: {
    FormItem,
    FromGroup,
    LoadingButton,
    CheckboxPopup,
    DimensionPopup
  },
  data() {
    return {
      form: new CargoDetail(),
      unitTypes: CargoDetail.unitTypes,
      rules: cargoRule,
      submiting: false,
      showPackageType: false,
      showDismensionInput: false
    }
  },
  computed: {
    ...mapState(moudleName, ['cargoList']),
    ...mapMutations(moudleName, ['setCargoDetail']),
    viewDimension() {
      const dimension = this.form.dimension
      if (dimension) {
        if (
          isNum(dimension.length) ||
          isNum(dimension.width) ||
          isNum(dimension.height)
        ) {
          return `${+dimension.length}*${+dimension.width}*${+dimension.height}`
        }
      }
      return ''
    },
    isCreate() {
      return typeof this.$route.query.id === 'undefined'
    }
  },
  methods: {
    ...mapActions(moudleName, ['modifyCargo', 'removeCargo']),
    async submit() {
      try {
        this.submiting = true
        if (!this.form.cargoName) {
          return window.toast('请填写货物名称')
        }
        if (!(await this.$refs.form.validate())) {
          return
        }
        const server = CargoDetail.toServer(this.form)
        server.consignerId = this.$route.query.consignerId
        await this.modifyCargo(server)
        this.$refreshPage('contacts-shipper-cargo', 'contacts-shipper-detail')
        window.toast('保存成功')
        this.$router.back(true)
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    setDimension({ length, width, height } = {}) {
      this.form.dimension = {
        length, width, height
      }
      if (
        isNum(length) &&
        isNum(width) &&
        isNum(height)
      ) {
        this.form.volume = float.round(length * width * height / (1000 * 1000 * 1000), 6)
      }
    },
    setForm() {
      const list = this.cargoList.list
      const id = this.$route.query.id
      let detailData
      if (id && list && list.length) {
        let item = list.find(item => +item.id === +id)
        if (item) {
          detailData = item.data
        }
      }
      this.form = CargoDetail.toForm(detailData)
      if (!this.isCreate) {
        setAppRightBtn({
          text: '删除',
          color: '#00A4BD',
          action: this.removeConfirm.bind(this)
        })
      }
    },
    async remove() {
      await this.removeCargo({ id: this.form.id })
      this.$refreshPage('contacts-shipper-cargo')
      window.toast('删除成功')
      this.$router.back(true)
    },
    removeConfirm() {
      window.confirm({
        content: '确认删除？',
        icon: 'cubeic-alert',
        onConfirm: this.remove.bind(this)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setForm())
  }
}
</script>
<style lang='stylus' >
</style>

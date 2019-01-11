<template>
  <div class="pickup-edit">
    <div class="edit-form">
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"/>
          <cube-form-item :field="fields[1]">
            <cube-button @click="showDatePicker">{{model.dateValue || 'Please select date'}}</cube-button>
            <date-picker ref="datePicker" :min="[2008, 8, 8]" :max="[2020, 10, 20]" @select="dateSelectHandler"/>
          </cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-button type="submit">Submit</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'pickup-edit',
  metaInfo: {
    title: '编辑'
  },
  data () {
    return {
      validity: {},
      valid: undefined,
      model: {
        inputValue: '',
        pcaValue: [],
        dateValue: ''
      },
      fields: [
        {
          type: 'input',
          modelKey: 'inputValue',
          label: 'Input',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          modelKey: 'dateValue',
          label: 'Date',
          rules: {
            required: true
          }
        }
      ]
    }
  },
  computed: {
    // ...mapGetters(['News'])
  },
  methods: {
    // ...mapActions(['getNews', 'clearNews']),
    /** 下拉刷新 */
    submitHandler(e) {
      console.log('submit')
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    showDatePicker() {
      this.$refs.datePicker.show()
    },
    dateSelectHandler(selectedVal) {
      this.model.dateValue = new Date(selectedVal[0], selectedVal[1] - 1, selectedVal[2]).toDateString()
    }
  },
  beforeRouteEnter (to, from, next) {
    // next(vm => {
    //   vm.first = true
    //   vm.clearNews()
    //   vm.getNews().then(() => {
    //     vm.first = false
    //   })
    // })
  }
}
</script>
<style lang="stylus">
.pickup-edit
  .van-list
    min-height 55Px
</style>

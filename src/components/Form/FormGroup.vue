<template>
  <form ref="$form">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'FormGroup',
  provide () {
    return {
      rules: this.rules
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async validate () {
      const formItems = this.$children.filter(item => item.$options._componentTag === 'form-item')
      const valids = await Promise.all(formItems.map(item => item.doValidate()))
      return valids.every(valid => valid === true)
    }
  }
}
</script>

<template>
  <form class="form">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'form-group',
  props: {
    data: {
      type: Object
    },
    rules: {
      type: Array
    }
  },
  created () {

  }
}
</script>


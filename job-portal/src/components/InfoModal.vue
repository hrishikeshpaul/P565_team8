<template>
  <div>
    <b-modal v-model="show">Hello From My Modal!</b-modal>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  props: {
    show: false,
    job: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>

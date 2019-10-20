<template>
  <div class="py-5">
    <multiselect
      v-model="value"
      :max-height="150"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name" track-by="code"
      :options="options"
      :taggable="true"
      :option-height="104"
      @tag="addTag"></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'FilterBar',
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
        { name: 'Position', code: 'position' },
      ],
      options: [
        { name: 'Position', code: 'position' },
        { name: 'Location', code: 'location' },
        { name: 'Company', code: 'company' }
      ]
    }
  },
  watch: {
    value (newVal) {
      if (newVal.hasOwnProperty('code')) {
        this.$emit('group', newVal.code)
      } else {
        this.value.push({ name: 'Position', code: 'position' })
      }
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style scoped>

</style>

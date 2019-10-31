<template>
  <div class="pb-2">
    <multiselect
      v-model="value"
      :max-height="150"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name" track-by="name"
      :options="options"
      :taggable="true"
      :multiple="true"
      :option-height="104"
      @tag="addTag"></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'SkillSelect',
  components: {
    Multiselect
  },
  props: {
    recievedValues: {
      type: Array
    }
  },
  data () {
    return {
      value: [

      ],
      options: [
        { name: 'Java', code: 'java' },
        { name: 'Python', code: 'python' },
        { name: 'Javascript', code: 'js' },
        { name: 'Node.js', code: 'node.js' },
        { name: 'React.js', code: 'react.js' },
        { name: 'Flask', code: 'flask' }
      ]
    }
  },
  watch: {
    recievedValues (newVal) {
      if (newVal.length > 0) {
        this.value = newVal
      }
    },
    value (newVal) {
      if (typeof newVal.hasOwnProperty('name') !== null) {
        this.$emit('addSkills', newVal)
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

<template>
  <div class="pb-2">
    <multiselect
      style="font-size: 20px;"
      v-model="value"
      :max-height="150"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name" track-by="code"
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
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: this.recievedValues,
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
  /deep/ .multiselect__content-wrapper {
    font-size: 15px !important;
    z-index: 1000;
  }
  /deep/ .multiselect {
    background-color: #f6f6f6 !important;
  }
</style>

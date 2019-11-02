<template>
  <div>
    <div >
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="newJob.title" class="nice-font">
        <div class="d-block px-3 nice-font">
          <b>Company: </b>
          <p>{{newJob.company}}</p>
          <b>Location: </b>
          <p>{{newJob.location}}</p>
          <b>Position: </b>
          <p>{{newJob.position}}</p>
          <b>Description: </b>
          <p style="white-space: pre-wrap">{{newJob.description}}</p>
          <b>Skills Required: </b>
          <p>{{newJob.skills.length > 0 ? newJob.skills.map(s => s.name).join(', ') : 'None'}}</p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JobInfoModal',
  components: {
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    job: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      newJob: {
        location: '',
        skills: []
      },
      showAlert: false,
      alertText: ''
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    },
    job (newVal) {
      this.newJob = newVal
    }
  },
  methods: {}
}
</script>

<style scoped>
.nice-font {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
}
</style>

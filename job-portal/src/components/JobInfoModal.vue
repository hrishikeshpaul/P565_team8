<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="'Job Posting Settings'">
        <div class="d-block text-center">
          <b-alert variant="danger" v-if="showAlert" :show="10">{{alertText}}</b-alert>
          <b-form class="text-left">
            <label>Title</label>
            <b-form-group>
              <b-form-input id="title" v-model.trim="newJob.title"></b-form-input>
            </b-form-group>
            <label>Position</label>
            <b-form-group>
              <b-form-input id="position" v-model.trim="newJob.position"></b-form-input>
            </b-form-group>
            <label>Location</label>
            <b-form-group>
              <b-form-input id="position" v-model.trim="newJob.location"></b-form-input>
            </b-form-group>
            <label>Descriptionn</label>
            <b-form-group>
              <b-form-textarea id="position" v-model.trim="newJob.description" rows="4"></b-form-textarea>
            </b-form-group>
            <label>Preferred Skills</label>
            <b-form-group>
              <SkillSelect @addSkills="addSkills" :recieved-values="newJob.skills"/>
            </b-form-group>
          </b-form>
        </div>
        <button class="mt-3 btn btn-outline-warning w-100" @click="editJob">Edit Job</button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SkillSelect from './SkillSelect'

export default {
  name: 'JobInfoModal',
  components: {
    SkillSelect
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
      newJob: {},
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
  methods: {
    addSkills (skills) {
      this.newJob.skills = skills
    },
    editJob () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      // var id = localStorage.getItem('user_id')
      var id = this.job._id

      axios.patch(`http://localhost:3000/api/jobs/edit/${id}`, this.newJob, {headers: headers})
        .then(response => {
          if (response.status === 200) {
            this.show = false
            this.$emit('hideModal')
          }
        })
        .catch(e => {
          if (e.response.status === 400) {
            this.showAlert = true
            this.alertText = 'Error'
          }
        })
    }
  }
}
</script>

<style scoped>
  label {
    font-size: 15px;
    color: #6d6d6d;
  }
</style>

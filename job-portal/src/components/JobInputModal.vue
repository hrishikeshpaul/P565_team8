<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="'Post a Job'" header-bg-variant="warning">
        <template v-slot:modal-title>
          <div style="font-size: 40px;" class="nice-font">
            Post a Job
          </div>
          <p style="font-size: 17px; color: #575e65; margin-top: -7px; padding-left: 2px;" class="mb-0 nice-font">Describe your job opening!</p>
        </template>
        <div class="d-block text-center">
          <b-form class="text-left">
            <label>Title</label>
            <b-form-group>
              <b-form-input id="title" v-model.trim="job.title"></b-form-input>
            </b-form-group>
            <label>Position</label>
            <b-form-group>
              <b-form-input id="position" v-model.trim="job.position"></b-form-input>
            </b-form-group>
            <label>Location</label>
            <b-form-group>
              <b-form-input id="company" v-model.trim="job.location"></b-form-input>
            </b-form-group>
            <label>Job Description</label>
            <b-form-group>
              <b-form-textarea id="company" v-model.trim="job.description" rows="3"></b-form-textarea>
            </b-form-group>
            <label>Preferred</label>
            <b-form-group>
              <SkillSelect @addSkills="addSkills"/>
            </b-form-group>
          </b-form>
        </div>
        <button class="mt-2 btn btn-outline-warning w-100" @click="postJob">Post</button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import SkillSelect from './SkillSelect'
import axios from 'axios'


export default {
  name: 'JobInputModal',
  components: {
    SkillSelect
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    user: {
      type: Object
    }
  },
  data () {
    return {
      job: {},
      show: false
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    }
  },
  methods: {
    addSkills (skills) {
      this.job.skills = skills
    },
    postJob () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      this.job['employer'] = localStorage.getItem('user_id')
      this.job['company'] = this.user.company

      axios.post(`http://localhost:3000/api/jobs`, this.job, {headers: headers})
        .then(response => {
          if (response.status == 204) {
            this.show = false
            this.$emit('hideModal')
            this.$emit('getData')
          }
        })
        .catch(e => {
          if (e.response.status === 401) {
            this.$router.push({
              name: 'Login'
            })
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
  .nice-font {
    font-weight: 100;
    font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
  }
</style>

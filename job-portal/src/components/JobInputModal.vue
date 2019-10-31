<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false"
               data-backdrop="static" :title="'Post a Job'">
        <div class="d-block text-center">
          <b-form class="text-left">
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Title of Job">
              <b-form-input id="title" v-model.trim="job.title"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Position">
              <b-form-input id="position" v-model.trim="job.position"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Location">
              <b-form-input id="company" v-model.trim="job.location"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Job Description">
              <b-form-textarea id="company" v-model.trim="job.description" rows="3"></b-form-textarea>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Preferred Skills">
              <SkillSelect @addSkills="addSkills"/>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="mt-3 btn btn-outline-warning" block @click="postJob">Post</b-button>
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
      this.jobs.skills = skills
    },
    postJob () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      this.job['employer'] = localStorage.getItem('user_id')
      this.job['company'] = this.user.company
      console.log(this.job)

      axios.post(`http://localhost:3000/api/jobs`, this.job, {headers: headers})
        .then(response => {
          if (response.status == 204) {
            this.show = false
            this.$emit('hideModal')
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

</style>

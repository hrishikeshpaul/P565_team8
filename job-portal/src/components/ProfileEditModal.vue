<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false"
               data-backdrop="static" :title="'Edit Profile'" size="lg">
        <div class="d-block text-center">
          <b-alert variant="danger" v-model="showAlert"> {{alertText}}</b-alert>
          <b-form class="text-left">
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Name">
              <b-form-input id="title" v-model.trim="user.name"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Company">
              <b-form-input id="position" v-model.trim="user.company"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Website">
              <b-form-input id="company" v-model.trim="user.website"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          v-if="user.role == 'student'"
                          label="Website">
              <b-form-input id="company" v-model.trim="user.social.linkedin"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          v-if="user.role == 'student'"
                          breakpoint="md"
                          label-size="sm"
                          label="Website">
              <b-form-input id="company" v-model.trim="user.social.github"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Location">
              <b-form-input id="location" v-model.trim="user.location" rows="3"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Bio">
              <b-form-textarea id="Bio" v-model.trim="user.bio" rows="4"></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="mt-3 btn btn-outline-warning" block @click="editUser">Edit</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileInputModal',
  components: {

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
      show: false,
      alertText: '',
      showAlert: false
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    }
  },
  methods: {
    editUser () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      if (this.user.name.length === 0) {
        this.alertText = 'You cannot leave the name empty'
        this.showAlert = true
      } else if (this.user.company.length === 0) {
        this.alertText = this.user.role === 'student' ? 'You cannot leave the university name empty' : 'You cannot leave the company name empty'
        this.showAlert = true
      } else if (this.user.website.length === 0) {
        this.alertText = 'You cannot leave the website empty'
        this.showAlert = true
      } else if (this.user.location.length === 0) {
        this.alertText = 'You cannot leave the location empty'
        this.showAlert = true
      } else {
        var id = localStorage.getItem('user_id')

        axios.patch(`http://localhost:3000/api/user/${id}`, this.user, {headers: headers})
          .then(response => {
            if (response.status === 204) {
              this.show = false
              this.showAlert = false
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
}
</script>

<style scoped>

</style>

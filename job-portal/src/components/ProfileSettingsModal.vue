<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false"
               data-backdrop="static" :title="'Profile Settings'">
        <div class="d-block text-center">
          <b-alert variant="danger" v-if="showAlert" :show="10">{{alertText}}</b-alert>
          <b-form class="text-left">
            <label>Reset Password</label>
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Old Password">
              <b-form-input id="title" v-model.trim="oldPassword" type="password"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="New Password">
              <b-form-input id="position" v-model.trim="newPassword" type="password"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Re-enter New Password">
              <b-form-input id="position" v-model.trim="newPassword1" type="password"></b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="mt-3 btn btn-outline-secondary" block @click="changePassword">Change Password</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileSettingsModal',
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
      oldPassword: '',
      newPassword: '',
      newPassword1: '',
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
    changePassword () {
      console.log('hi')
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      var id = localStorage.getItem('user_id')

      if (this.newPassword.length > 0 && this.newPassword === this.newPassword1) {
        axios.patch(`http://localhost:3000/api/user/changepassword/${id}`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          newPassword1: this.newPassword1
        }, {headers: headers})
          .then(response => {
            if (response.status === 200) {
              this.show = false
              this.$emit('hideModal')
              this.oldPassword = ''
              this.newPassword = ''
              this.newPassword1 = ''
            }
          })
          .catch(e => {
            if (e.response.status === 400) {
              this.showAlert = true
              this.alertText = 'Error'
            }
          })
      } else {
        this.showAlert = true
        this.alertText = 'Passwords dont\'t match'
      }
    }
  }
}
</script>

<style scoped>

</style>

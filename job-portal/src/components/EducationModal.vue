<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="'Education'">
        <div class="d-block text-center">
          <b-alert variant="danger" v-if="showAlert" :show="10">{{alertText}}</b-alert>
          <b-form class="text-left">
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Name of School">
              <b-form-input id="title" v-model.trim="newEducation.school"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Degree">
              <b-form-input id="position" v-model.trim="newEducation.degree"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Field Of Study">
              <b-form-input id="position" v-model.trim="newEducation.fieldofstudy"></b-form-input>
            </b-form-group>
            <div class="row">
              <div class="col-5">
                <b-form-group id="fieldsetHorizontal"
                              :label-cols="2"
                              breakpoint="md"
                              label-size="sm"
                              label="From">
                  <b-form-input id="from" v-model="newEducation.from" type="date" required></b-form-input>
                </b-form-group>
              </div>
              <div class="col-5">
                <b-form-group id="fieldsetHorizontal"
                              :label-cols="2"
                              breakpoint="md"
                              label-size="sm"
                              label="To">
                  <b-form-input id="to" v-model="newEducation.to" type="date"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-2 mt-4 pt-2">
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="newEducation.current"
                  name="checkbox-1"
                >
                  Current
                </b-form-checkbox>
              </div>
            </div>
          </b-form>
        </div>
        <b-button class="mt-3 btn btn-outline-warning" type="submit" block v-if="buttonText === 'Edit Education'" @click="editEducation ">{{buttonText}}</b-button>
        <b-button class="mt-3 btn btn-outline-warning" type="submit" block v-else @click="addEducation ">{{buttonText}}</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EducationModal',
  components: {
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    education: {
      type: Object
    },
    user: {
      type: Object
    },
    buttonText: {
      type: String
    }
  },
  data () {
    return {
      show: false,
      newEducation: {},
      showAlert: false,
      alertText: ''
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    },
    education (newVal) {
      this.newEducation = newVal
      this.newEducation.from = this.$moment(this.newEducation.from).format('YYYY-MM-DD')
      this.newEducation.to = this.$moment(this.newEducation.to).format('YYYY-MM-DD')
    }
  },
  methods: {
    addEducation () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      if (this.newEducation.school.length === 0) {
        this.showAlert = true
        this.alertText = 'Name of School is required'
      } else if (this.newEducation.degree.length === 0) {
        this.showAlert = true
        this.alertText = 'Degree is required'
      } else if (this.newEducation.to == 'Invalid date') {
        this.newEducation.to = null
      }else if (this.newEducation.from == 'Invalid date') {
        this.showAlert = true
        this.alertText = 'From date is required'
      } else if (this.newEducation.fieldofstudy === 0) {
        this.showAlert = true
        this.alertText = 'Field of Study is required'
      } else if (this.$moment(this.newEducation.from).diff(this.$moment(this.newEducation.to)) < 0) {
        this.showAlert = true
        this.alertText = 'To Date can\'t be after From date'
      } else {
        axios.post(`http://localhost:3000/api/profile/education`, {data: [this.newEducation], user: {id: this.user._id}}, {headers: headers})
          .then(response => {
            alert('Education Added')
            this.show = false
            this.newEducation = {}
            this.$emit('hideModal')
          })
          .catch(e => {
            if (e.response.status === 400) {
              this.showAlert = true
              this.alertText = 'Error while added education'
            }
          })
      }
    },
    editEducation () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      var id = this.education._id

      axios.patch(`http://localhost:3000/api/profile/education/${id}`, this.newEducation, {headers: headers})
        .then(response => {
          if (response.status === 200) {
            this.show = false
            this.newEducation = {}
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

</style>

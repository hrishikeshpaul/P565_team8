<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="'Experience'">
        <div class="d-block text-center">
          <b-alert variant="danger" v-if="showAlert" :show="10">{{alertText}}</b-alert>
          <b-form class="text-left">
            <b-form-group id="fieldsetHorizontal"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Company/Organisation">
              <b-form-input id="title" v-model.trim="newExperience.company"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Title">
              <b-form-input id="position" v-model.trim="newExperience.title"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Location">
              <b-form-input id="position" v-model.trim="newExperience.location"></b-form-input>
            </b-form-group>
            <div class="row">
              <div class="col-5">
                <b-form-group id="fieldsetHorizontal"
                              :label-cols="2"
                              breakpoint="md"
                              label-size="sm"
                              label="From">
                  <b-form-input id="from" v-model="newExperience.from" type="date" required></b-form-input>
                </b-form-group>
              </div>
              <div class="col-5">
                <b-form-group id="fieldsetHorizontal"
                              :label-cols="2"
                              breakpoint="md"
                              label-size="sm"
                              label="To">
                  <b-form-input id="to" v-model="newExperience.to" type="date"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-2 mt-4 pt-2">
                <b-form-checkbox
                  v-model="newExperience.current"
                >
                  Current
                </b-form-checkbox>
              </div>
            </div>
            <b-form-group id="fieldsetHorizontal1"
                          :label-cols="4"
                          breakpoint="md"
                          label-size="sm"
                          label="Description">
              <b-form-textarea id="position" v-model.trim="newExperience.description" rows="4"></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="mt-3 btn btn-outline-warning" type="submit" block v-if="buttonText === 'Edit Experience'"
                  @click="editExperience ">{{buttonText}}
        </b-button>
        <b-button class="mt-3 btn btn-outline-warning" type="submit" block v-else @click="addExperience ">
          {{buttonText}}
        </b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ExperienceModal',
  components: {},
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    experience: {
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
      newExperience: {},
      showAlert: false,
      alertText: ''
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    },
    experience (newVal) {
      this.newExperience = newVal
      this.newExperience.from = this.$moment(this.newExperience.from).format('YYYY-MM-DD')
      this.newExperience.to = this.$moment(this.newExperience.to).format('YYYY-MM-DD')
    }
  },
  methods: {
    addExperience () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      if (this.newExperience.company.length === 0) {
        this.showAlert = true
        this.alertText = 'Company is required'
      } else if (this.newExperience.title.length === 0) {
        this.showAlert = true
        this.alertText = 'Title is required'
      } else if (this.newExperience.to == 'Invalid date') {
        this.newExperience.to = null
      } else if (this.newExperience.from == 'Invalid date') {
        this.showAlert = true
        this.alertText = 'From date is required'
      } else if (this.newExperience.location === 0) {
        this.showAlert = true
        this.alertText = 'Locationn is required'
      } else if (this.$moment(this.newExperience.from).diff(this.$moment(this.newExperience.to)) < 0) {
        this.showAlert = true
        this.alertText = 'To Date can\'t be after From date'
      } else {
        axios.post(`http://localhost:3000/api/profile/experience`, {
          data: [this.newExperience],
          user: {id: this.user._id}
        }, {headers: headers})
          .then(response => {
            alert('CExperience Added')
            this.show = false
            this.newExperience = {}
            this.$emit('hideModal')
          })
          .catch(e => {
            if (e.response.status === 400) {
              this.showAlert = true
              this.alertText = 'Error while adding experience'
            }
          })
      }
    },
    editExperience () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      var id = this.experience._id

      axios.patch(`http://localhost:3000/api/profile/experience/${id}`, this.newExperience, {headers: headers})
        .then(response => {
          if (response.status === 200) {
            this.show = false
            this.newExperience = {}
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

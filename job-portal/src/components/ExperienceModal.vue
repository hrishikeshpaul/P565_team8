<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="'Experience'" header-bg-variant="warnning">
        <template v-slot:modal-title>
          <div style="font-size: 40px;" class="nice-font px-3">
            Experience
          </div>
          <p style="font-size: 17px; color: #575e65; margin-top: -7px; padding-left: 2px;" class="mb-0 nice-font px-3">In a few words, describe your work experience!</p>
        </template>
        <div class="d-block text-center nice-font px-3 pb-2" style="max-height: 600px; overflow-y: auto;">
          <b-alert variant="danger" v-if="showAlert" :show="10">{{alertText}}</b-alert>
          <b-form class="text-left">
            <label>Organization/Company*</label>
            <b-form-group>
              <b-form-input id="title" v-model.trim="newExperience.company" class="input-field"></b-form-input>
            </b-form-group>
            <label class="mb-0 smaller-font">Title*</label>
            <b-form-group>
              <b-form-input id="position" v-model.trim="newExperience.title" class="input-field"></b-form-input>
            </b-form-group>
            <label> class="mb-0 smaller-font"Position*</label>
            <b-form-group>
              <b-form-input id="position" v-model.trim="newExperience.location" class="input-field"></b-form-input>
            </b-form-group>
            <div class="row">
              <div class="col-6">
                <label class="mb-0 smaller-font">From*</label>
                <b-form-group>
                  <b-form-input id="from" v-model="newExperience.from" type="date" required class="input-field"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-6">
                <label class="mb-0 smaller-font">To</label><span style="background-color: #b4b4b4; color: white; border-radius: 50%; margin-left: 5px;" class="px-2 info-hover" data-toggle="tooltip" data-placement="top" title="If you are currently enrolled, leave this blank">i</span>
                <b-form-group>
                  <b-form-input id="to" v-model="newExperience.to" type="date" class="input-field"></b-form-input>
                </b-form-group>
              </div>
            </div>
            <label class="mb-0 smaller-font">Description</label>
            <b-form-group>
              <b-form-textarea id="position" v-model.trim="newExperience.description" rows="4" class="input-field"></b-form-textarea>
            </b-form-group>
          </b-form>
          <b-button class="mt-3" variant="outline-warning" type="submit" block v-if="buttonText === 'Edit Experience'"
                    @click="editExperience ">{{buttonText}}
          </b-button>
          <b-button class="mt-3" variant="outline-warning" type="submit" block v-else @click="addExperience ">
            {{buttonText}}
          </b-button>
        </div>

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
  label {
    font-size: 15px;
    color: #6d6d6d;
  }
  .nice-font {
    font-family: 'Raleway', sans-serif;
    font-weight: 200;
  }
  .input-field {
    border: 0;
    border-radius: 2px;
    outline: none;
    box-shadow: none;
    margin-top: 1px;
    background-color: #f6f6f6;
  }
  .input-field:hover {
    background-color: #f1f1f1;
  }
  .input-field:focus {
    background-color: #eaeaea;
  }
  .smaller-font {
    font-size: 13px;
  }
</style>

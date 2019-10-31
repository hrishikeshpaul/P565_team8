<template>
  <div >
    <NavBar @logout="logout"/>
    <div class="mt-5 container p-5 shadow-sm p-3 mb-5 bg-white rounded" style="border: 1px solid #cecece; border-radius: 8px; background-color: white">
      <button href="#" style="float: right;" class="mt-3 pt-2 btn btn-info" @click="profileInputModal"><i class="ti-pencil"></i></button>
      <button href="#" style="float: right;" class="mt-3 pt-2 btn btn-secondary mr-2" @click="profileSettingsModal"><i class="ti-settings"></i>
      </button>

      <div class="row">
        <div class="col-lg-3 col-sm-12" style="border-right: 1px solid #b8b8b8">
          <gravatar
            email="hrishikeshpaul12@gmail.com"
            alt="Nobody"
            :size="200"
            default-img="mm"
            style="border-radius: 50%; "/>
        </div>
        <div class="col-8">
          <div>
            <span style="font-size: 40px;" >{{user.name}}</span>
          </div>
          <div>
            <span style="font-size: 20px; color: grey;">{{user.company}}</span>
          </div>
          <div>
            <a style="font-size: 20px;" href="#">{{user.website}}</a>

            <!--            <span style="font-size: 20px;" v-html="user.social.linkedin.length > 0 ? user.social.linkedin : null">{{user.social.linkedin.length > 0 ? user.social.linkedin : null}} {{user.social.github ? ' | ' + user.social.github : null}} | {{user.website ? ' | ' + user.website : null}}</span>-->
          </div>
          <div style="justify-content: center; text-align: justify;">
            <span style="font-size: 20px; font-style: italic;">{{user.bio.length > 40 ? user.bio.substring(0, 150) + ' ...' : user.bio}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 container px-0 shadow-sm mb-5 bg-white rounded" v-if="role === 'student'">
      <b-card no-body >
        <b-tabs card>
          <b-tab title="Acceptances" active>
            <b-card-body>
              <span v-if="user.acceptances.length === 0">You don't have any acceptances! Start applying!</span>
              <div v-for="(job, idx) in user.acceptances" class="text-left mt-2">
                <b-card :title="job.title">
                  <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 ml-2 btn btn-danger" @click="rejectConfirmedApplicant(job._id, user._id)"><i class="ti-close"></i></button>
                  <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 btn btn-info"><i class="ti-comment-alt"></i></button>
                  <b>Company:</b><p>{{job.company}}</p>
                  <b>Recruiter: </b><p>{{job.employer.name}}</p>
                  <b>Position:</b><p>{{job.position}}</p>
                </b-card>
              </div>
            </b-card-body>
          </b-tab>
          <b-tab title="Education">
            <b-card-body>
              <div v-if="user.education.length > 0" v-for="edu in user.education" :id="edu.school">
                <b-card class="mb-3">
                  <button style="float: right;" class="btn btn-outline-danger ml-2" @click="deleteEducation(edu)"><i class="ti-close"></i></button>
                  <button style="float: right;" class="btn btn-outline-secondary" @click="editEducationModal(edu)"><i class="ti-pencil"></i></button>
                  <div><b>Name</b>
                    <p>{{edu.school}} </p></div>
                  <div><b>Degree</b>
                    <p>{{edu.degree}} </p></div>
                  <div><b>Field of Study</b>
                    <p>{{edu.fieldofstudy}} </p></div>
                  <div><b>Duration</b>
                    <p>{{$moment(edu.from).format('MMM Do YY') }} - {{edu.to !== null ? $moment(edu.to).format('MMM Do YY') : 'Present'}} </p></div>
                </b-card>
              </div>
              <button
                v-if="role === 'student'"
                style="width: 100%; border-radius: 10px;"
                class="btn-outline-warning mb-2 mt-1 "
                @click="addEducationModal"
              >
                Add
              </button>
            </b-card-body>
          </b-tab>
          <b-tab title="Experiences">
            <b-card-body>
              <div v-if="user.experience.length > 0" v-for="exp in user.experience">
                <b-card class="mb-3">
                  <button style="float: right;"><i class="ti-pencil"></i></button>
                  <div><b>Company/Organization</b>
                    <p>{{exp.company}} </p></div>
                  <div><b>Title</b>
                    <p>{{exp.title}} </p></div>
                  <div><b>Location</b>
                    <p>{{exp.location}} </p></div>
                  <div><b>Duration</b>
                    <p>{{$moment(exp.from).format('MMM Do YY') }} - {{$moment(exp.to).format('MMM Do YY') }} </p>
                  </div>
                  <div><b>Description</b>
                    <p>{{exp.description}}</p></div>
                </b-card>
              </div>
              <button
                v-if="role === 'student'"
                style="width: 100%; border-radius: 10px;"
                class="btn-outline-warning mb-2 mt-1 "
              >
                Add
              </button>
            </b-card-body>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="my-5 container px-0 shadow-sm mb-5 bg-white rounded" v-if="role === 'employer'">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Job Posting" active style="max-height: 1000px; overflow-y: auto;">
            <b-card-body>
              <b-input-group class="mb-3">
                <b-form-input placeholder="Search for job" v-model="employerSearchJob"></b-form-input>
                <b-input-group-append>
                  <b-button variant="warning" style="border: 1px solid #dba30e"><i class="ti-search"></i></b-button>
                </b-input-group-append>
              </b-input-group>
              <div v-for="(job, idx) in employerJobs">
                <b-card class="text-left my-2" :title="job.title">
                  <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 ml-2 btn btn-danger" @click="deleteConfirmModal(job)"><i class="ti-close"></i></button>
                  <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 btn btn-secondary" @click="jobInfoModal(job)"><i class="ti-pencil"></i></button>
                  <b>Location: </b><p>{{job.location}}</p>
                  <b>Position: </b><p>{{job.position}}</p>
                  <b>Description: </b><p style="white-space: pre-wrap">{{job.description}}</p>
                  <b>Skills Required: </b><p>{{job.skills.length > 0 ? job.skills.map(s => s.name).join(', ') : 'None'}}</p>
                  <b>Total Applications: </b><p>{{job.applicants.length}}</p>
                </b-card>
              </div>
              <button
                @click="jobInputModal"
                v-if="role === 'employer'"
                style="width: 100%; border-radius: 10px;"
                class="btn-outline-warning mb-2 mt-1"
              >
                Post Job
              </button>
            </b-card-body>
          </b-tab>
          <b-tab title="Applicants" style="max-height: 1000px; overflow-y: auto;">
            <b-card-body>
              <div v-for="job in user.jobs">
                <div v-for="user in job.confirmed_users">
                  <b-card class="text-left my-2" :title="user.name">
                    <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 ml-2 btn btn-danger" @click="rejectConfirmedApplicant(job._id, user._id)"><i class="ti-close"></i></button>
                    <button href="#" style="float: right; margin-top: -37px !important;" class="mt-3 pt-2 btn btn-info"><i class="ti-comment-alt"></i></button>
                    <b>Job:</b><p>{{job.title}}</p>
                    <b>University: </b><p>{{user.company}}</p>
                    <b>LinkedIn: </b><p>{{user.social.linkedin}}</p>
                    <b>Skills: </b><p>{{user.skills.join(', ')}}</p>
                  </b-card>
                </div>
              </div>
            </b-card-body>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <JobInputModal :showModal="showJobInputModal" @hideModal="hideJobInputModal" :user="user" @getData="getData"/>
    <ProfileInputModal :showModal="showEditProfileModal" :user="user" @hideModal="hideEditProfileInputModal"/>
    <ProfileSettingsModal :showModal="showProfileSettingsModal" :user="user" @hideModal="hideProfileSettingsModal" />
    <JobInfoModal :showModal="showJobInfoModal" :job="jobInfoToBePassed" @hideModal="hideJobInfoModal"/>
    <DeleteConfirmModal :showModal="showDeleteConfirmModal" @hideModal="hideDeleteConfirmModal" @delete="deleteJobPosting" :job="jobInfoToBePassed"/>
    <EducationModal :show-modal="showEducationModal" @hideModal="hideEducationModal" :education="educationToBePassed" :buttonText="educationButtonText" :user="user"/>
  </div>
</template>

<script>
import axios from 'axios'
import Fuse from 'fuse.js'

import NavBar from './NavBar'
import JobInputModal from './JobInputModal'
import ProfileInputModal from './ProfileEditModal'
import ProfileSettingsModal from './ProfileSettingsModal'
import JobInfoModal from './JobInfoModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import EducationModal from './EducationModal'

import Gravatar from 'vue-gravatar'

export default {
  name: 'Profile',
  components: {
    NavBar,
    Gravatar,
    JobInputModal,
    ProfileInputModal,
    ProfileSettingsModal,
    JobInfoModal,
    DeleteConfirmModal,
    EducationModal
  },
  data () {
    return {
      fuseOptions: {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "title"
        ]
      },
      jobInfoToBePassed: {},
      educationToBePassed: {},
      educationButtonText: '',
      user_id: localStorage.getItem('user_id'),
      user: {},
      role: localStorage.role,
      show: true,
      showJobInputModal: false,
      showEditProfileModal: false,
      showProfileSettingsModal: false,
      showJobInfoModal: false,
      showDeleteConfirmModal: false,
      showEducationModal: false,
      employerSearchJob: ''
    }
  },
  computed: {
    employerJobs: {
      get: function (s) {
        if (!this.employerSearchJob)
          return this.user.jobs
        else {
          var fuse = new Fuse(this.user.jobs, this.fuseOptions)
          return fuse.search(this.employerSearchJob)
        }
      },
      set: function (newVal) {
        return newVal
      }
    }
  },
  watch: {
    user (newData) {
      this.user = newData
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    },
    jobInputModal () {
      this.showJobInputModal = !this.showJobInputModal
    },
    hideJobInputModal () {
      this.showJobInputModal = false
    },
    profileInputModal () {
      this.showEditProfileModal = !this.showEditProfileModal
    },
    hideEditProfileInputModal () {
      this.showEditProfileModal = false
    },
    profileSettingsModal () {
      this.showProfileSettingsModal = !this.showProfileSettingsModal
    },
    hideProfileSettingsModal () {
      this.showProfileSettingsModal = false
    },
    jobInfoModal (job) {
      this.jobInfoToBePassed = job
      this.showJobInfoModal = !this.showJobInfoModal
    },
    hideJobInfoModal () {
      this.showJobInfoModal = false
    },
    deleteConfirmModal (job) {
      this.jobInfoToBePassed = job
      this.showDeleteConfirmModal = !this.showDeleteConfirmModal
    },
    hideDeleteConfirmModal () {
      this.showDeleteConfirmModal = false
    },
    editEducationModal (education) {
      this.educationToBePassed = education
      this.educationButtonText = 'Edit Education'
      this.showEducationModal = !this.showEducationModal
    },
    hideEducationModal () {
      this.showEducationModal = false
      this.getData()
    },
    addEducationModal () {
      this.educationToBePassed = {
        to: null,
        from: null,
        school: '',
        fieldofstudy: '',
        degree: '',
        current: false
      }
      this.educationButtonText = 'Add Education'
      this.showEducationModal = !this.showEducationModal
    },
    deleteEducation (edu) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }
      console.log(edu)
      axios.delete(`http://localhost:3000/api/profile/education/${edu._id}`, {headers: headers})
        .then(response => {
          alert('Deleted')
          this.getData()
        })
        .catch(err => {
          alert(err.response.data)
        })
    },
    deleteJobPosting (id) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }
      axios.delete(`http://localhost:3000/api/jobs/${id}`, {headers: headers})
        .then(response => {
          alert('Deleted')
          this.hideDeleteConfirmModal()
          this.getData()
        })
        .catch(err => {
          alert(err.response.data)
        })
    },
    rejectConfirmedApplicant (job_id, user_id) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      axios.patch(`http://localhost:3000/api/jobs/rejectconfirmedapplicant`, {job: job_id, user: user_id}, {headers: headers})
        .then(response => {
          this.getData()
        })
        .catch(err => {
          alert('Delete could not happen.')
        })

    },
    getData () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }

      axios.get(`http://localhost:3000/api/user/${this.user_id}`, {headers: headers})
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          if (e.response.status === 401) {
            this.$router.push({
              name: 'Login'
            })
          }
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
button {
  border: none;
}
</style>

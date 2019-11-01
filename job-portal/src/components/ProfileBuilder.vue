<template>
  <div>
    <NavBar @logout="logout"/>
    <div class="mt-5 container">
      <div class="container main-container">
         <b-card style="max-height: 85vh; overflow-y: auto; min-height: 40vh">
           <form-wizard
             v-if="role"
             @on-complete="onComplete"
             step-size="sm" color="orange"
             @on-change="handleTabChanged"
             @on-loading="setLoading"
             @on-validate="handleValidation"
             @on-error="handleErrorMessage"
           >
             <h2 slot="title">Hi, let us get you started with your profile! {{role}}</h2>
             <div class="mb-2"><span v-if="errorMsg"  style="color: red;">{{errorMsg}}</span></div>

             <tab-content :title="role === 'student' ? 'Personal Details' : 'Organizational Details'"
                          icon="ti-user"
                          :before-change="validateAsync"
             >
               <b-form>
                 <label>{{role === 'student' ? 'Full Name' : 'Name of Point of Contact'}}</label>
                 <b-form-group id="fieldsetHorizontal1">
                   <b-form-input id="name" v-model.trim="user.name"></b-form-input>
                 </b-form-group>

                 <label>{{role === 'student' ? 'University' : 'Company'}}</label>
                 <b-form-group id="fieldsetHorizontal2">
                   <b-form-input id="company" v-model.trim="user.company"></b-form-input>
                 </b-form-group>

                 <label v-if="role === 'student'">Gender</label>
                 <b-form-group>
                   <b-form-select v-if="role === 'student'" v-model="user.gender" :options="['Male', 'Female', 'I don\'t wish to state']"></b-form-select>
                 </b-form-group>

                 <label>Website</label>
                 <b-form-group id="fieldsetHorizontal3">
                   <b-form-input id="website" v-model.trim="user.website"></b-form-input>
                 </b-form-group>

                 <label>LinkedIn</label>
                 <b-form-group id="fieldsetHorizontal4">
                  <b-form-input id="linkedin" v-model.trim="user.social.linkedin"></b-form-input>
                 </b-form-group>

                 <label v-if="role === 'student'">Github</label>
                 <b-form-group id="fieldsetHorizontal6"
                               v-if="role === 'student'">
                   <b-form-input id="github" v-model.trim="user.social.github"></b-form-input>
                 </b-form-group>

                 <label>Location</label>
                 <b-form-group id="fieldsetHorizontal5">
                   <b-form-input id="location" v-model.trim="user.location"></b-form-input>
                 </b-form-group>

                 <label>Bio</label>
                 <b-form-group id="fieldsetHorizontal7">
                   <b-form-textarea id="bio" v-model.trim="user.bio" rows="3"></b-form-textarea>
                 </b-form-group>
               </b-form>
             </tab-content>

             <tab-content :title="'Education'"
                          v-if="role === 'student'"
                          :icon="'ti-book'"
                          :before-change="validateAsync">
               <div v-for="(education,index) in educations" v-if="role === 'student'">
                 <div class="row" v-if="educations.length > 1">
                   <div class="col-11">
                     <hr />
                   </div>
                   <div class="col-1">
                     <button class="btn-outline-danger btn-sm" @click.prevent="deleteItem(index, 'education')">X</button>
                   </div>
                 </div>
                 <b-form v-if="role === 'student'">
                   <label>Name of School</label>
                   <b-form-group>
                     <b-form-input id="school" v-model.trim="education.school"></b-form-input>
                   </b-form-group>

                   <label>Degree</label>
                   <b-form-group>
                     <b-form-input id="degree" v-model.trim="education.degree"></b-form-input>
                   </b-form-group>

                   <label>Field of Study</label>
                   <b-form-group>
                     <b-form-input id="fieldofstudy" v-model.trim="education.fieldofstudy"></b-form-input>
                   </b-form-group>
                   <div class="row">
                     <div class="col-6">
                       <label>From</label>
                       <b-form-group>
                         <b-form-input id="from" v-model.trim="education.from" type="date"></b-form-input>
                       </b-form-group>
                     </div>
                     <div class="col-6">
                       <label>To</label>
                       <b-form-group>
                         <b-form-input id="to" v-model.trim="education.to" type="date"></b-form-input>
                       </b-form-group>
                     </div>
                   </div>
                 </b-form>
               </div>
               <button
                 v-if="role === 'student'"
                 style="width: 100%; border-radius: 10px;"
                 class="btn-outline-warning mb-2 mt-1 "
                 @click.prevent="addItem('education')">
                 Add</button>
             </tab-content>
  <!--           EXPERIENCE TAB-->
             <tab-content
                          v-if="role === 'student'"
                          title="Experience"
                          :before-change="validateAsync"
                          icon="ti-bag">
               <div v-for="(experience,index) in experiences">
                 <div class="row" v-if="experiences.length > 1">
                   <div class="col-11">
                     <hr />
                   </div>
                   <div class="col-1">
                     <button class="btn-outline-danger btn-sm" @click.prevent="deleteItem(index, 'experience')">X</button>
                   </div>
                 </div>
                 <b-form>
                   <label>Name of Organisation</label>
                   <b-form-group>
                     <b-form-input id="company" v-model.trim="experience.company"></b-form-input>
                   </b-form-group>
                   <label>Title</label>
                   <b-form-group>
                     <b-form-input id="title" v-model.trim="experience.title"></b-form-input>
                   </b-form-group>
                   <label>Location</label>
                   <b-form-group>
                     <b-form-input id="location" v-model.trim="experience.location"></b-form-input>
                   </b-form-group>
                   <div class="row">
                     <div class="col-6">
                       <label>From</label>
                       <b-form-group>
                         <b-form-input id="from" v-model.trim="experience.from" type="date"></b-form-input>
                       </b-form-group>
                     </div>
                     <div class="col-6">
                       <label>To</label>
                       <b-form-group>
                         <b-form-input id="to" v-model.trim="experience.to" type="date"></b-form-input>
                       </b-form-group>
                     </div>
                   </div>
                   <label>Description</label>
                   <b-form-group>
                     <b-form-textarea id="description" v-model.trim="experience.description" rows="3"></b-form-textarea>
                   </b-form-group>
                 </b-form>
               </div>
               <button
                 v-if="role === 'student'"
                 style="width: 100%; border-radius: 10px;"
                 class="btn-outline-warning mb-2 mt-1 "
                 @click.prevent="addItem('experience')">
                 Add</button>
             </tab-content>
             <tab-content
               :before-change="validateAsync"
               v-if="role === 'student'"
               title="Skills"
               icon="ti-stats-up">
               <b-form-group id="fieldsetHorizontal"
                             :label-cols="4"
                             breakpoint="md"
                             label-size="sm"
                             class="m-0"
                             label="Skills">
               </b-form-group>
               <SkillSelect @addSkills="addSkills"/>
             </tab-content>

           </form-wizard>

         </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import NavBar from './NavBar'
  import SkillSelect from './SkillSelect'

export default {
  name: 'ProfileBuilder',
  components: {
    NavBar,
    SkillSelect,
  },
  data () {
    return {
      name: '',
      user: {
        social: {}
      },
      role: '',
      company: {},
      experiences: [{
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        description: ''
      }],
      educations: [{
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: ''
      }],
      skills: [],
      activeIndex: 0,
      loadingWizard: false,
      errorMsg: null,
      goNextIfNoError: false,
      showNoError: false,
      noError: ''
    }
  },
  methods: {
    onComplete: function () {

      var params = {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
        'Content-Type': 'application/json'
      }
      var id = localStorage.getItem('user_id')

      axios.patch(`http://localhost:3000/api/user/${id}`, {first_time: false}, {headers: params})
        .then(response => {
          console.log('hi')
          localStorage.setItem('user_first_time', 'false')
          this.$router.push({
            name: 'HomePage'
          })
        })
        .catch(e => {
          console.log(e.response.data)
        })

    },
    handleTabChanged (prevIndex, nextIndex) {
      this.activeIndex = nextIndex;
    },
    setLoading: function (value) {
      this.loadingWizard = value
    },
    handleValidation: function (isValid, tabIndex){
      console.log('Tab: ' + tabIndex + ' valid: ' + isValid)
    },
    handleErrorMessage: function(errorMsg) {
      this.errorMsg = errorMsg
    },
    validateAsync:function() {
      return new Promise((resolve, reject) => {
        var id = localStorage.getItem('user_id')
        var params = {
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
          'Content-Type': 'application/json'
        }
        if (this.activeIndex === 0) {
          var obj = {
            data: {
              name: this.user.name,
              company: this.user.company,
              website: this.user.website,
              social: this.user.social,
              bio: this.user.bio,
              gender: this.user.gender
            },
            user: {id: id}
          }
          if (!this.user.name || !this.user.company || !this.user.website)
            reject('Please enter the required details')

          axios.post(`http://localhost:3000/api/profile/personal`, obj, {headers: params})
            .then(response => {
              resolve(true)
            })
            .catch(e => {
              reject(e.response.data)
            })
        } else if (this.activeIndex === 1) {
          if (this.role === 'student') {
            if (this.educations[0].school === '') {
              resolve(true)
            } else {
              var obj = {
                data: this.educations,
                user: {id: id}
              }
              axios.post(`http://localhost:3000/api/profile/education`, obj, {headers: params})
                .then(response => {
                  resolve(true)
                })
                .catch(e => {
                  reject(e.response.data)
                })
            }
          }
          else {
            console.log('put the employer code here')
          }
        } else if (this.activeIndex === 2) {
          if (this.role === 'student') {
            if (this.experiences[0].company === '') {
              resolve(true)
            } else {
              var obj = {
                data: this.experiences,
                user: {id: id}
              }
              // temporary solve of bug where the current is not working
              obj.data.forEach(exp => {
                exp.current = false
              })
              axios.post(`http://localhost:3000/api/profile/experience`, obj, {headers: params})
                .then(response => {
                  resolve(true)
                })
                .catch(e => {
                  reject(e.response.data)
                })
            }
          }
          else {
            console.log('put employer code')
          }
        } else if (this.activeIndex === 3) {
          if (this.skills.length > 0) {
            // console.log('not done')
            // var skillsArray = []
            // this.skills.forEach(skill => {
            //   skillsArray.push(skill.name)
            // })

            var obj = {
              data: this.skills,
              user: {id: id}
            }

            axios.post(`http://localhost:3000/api/profile/skills`, obj, {headers: params})
              .then(response => {
                resolve(true)
              })
              .catch(e => {
                reject(e.response.data)
              })
          } else {
            resolve(true)
          }
        }
      })
    },
    addItem (array) {
      if (array === 'education')
        this.educations.push(
          {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: ''
          }
        )
      else if (array === 'experience')
        this.experiences.push({
          company: '',
          title: '',
          location: '',
          from: '',
          to: '',
          description: ''
        })
    },
    addSkills (skill) {
     this.skills = skill
    },
    deleteItem (index, array) {
      if (array === 'education')
        this.educations = this.educations.splice(this.educations.indexOf(index), 1)
      else if (array === 'experience')
        this.experiences = this.experiences.splice(this.experiences.indexOf(index), 1)
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    },
  },
  created () {
    console.log(typeof localStorage.getItem('role'))
    if (localStorage.getItem('role') == 'null') {
      const { value: role } = this.$swal({
        title: 'Select Role',
        input: 'select',
        inputOptions: {
          student: 'Student',
          employer: 'Employer'
        },
        allowOutsideClick: false,
        showCancelButton: false,
        inputPlaceholder: 'Select role',
        confirmButtonColor: '#f0ad4e',
        inputValidator: (value) => {
          return new Promise((resolve, reject) => {
            if (value === 'student' || value === 'employer') {
              var id = localStorage.getItem('user_id')
              var params = {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
                'Content-Type': 'application/json'
              }
              var obj = {
                user: id,
                role: value
              }
              axios.post('http://localhost:3000/api/profile/updateRole', obj, {headers: params})
                .then(resposne => {
                  localStorage.setItem('role', value)
                  console.log(value)
                  this.role = value
                  resolve()
                })
                .catch(e => {
                  reject('Error')
                })
            } else {
              resolve('You need to select a role :)')
            }
          })
        }
      })
    }
  },
  mounted () {
    this.role = localStorage.role
  }
}
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swal-title {
    margin: 0px;
    font-size: 25px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.21);
    margin-bottom: 28px;
  }
</style>

<template>
    <div class="mt-5 container">
    <div class="container main-container">
       <b-card style="max-height: 90vh; overflow-y: auto;">
         <form-wizard
           @on-complete="onComplete"
           step-size="sm" color="orange"
           @on-change="handleTabChanged"
           @on-loading="setLoading"
           @on-validate="handleValidation"
           @on-error="handleErrorMessage"
         >
           <h2 slot="title">Hi, let us get you started with your profile!</h2>
           <div class="mb-2"><span v-if="errorMsg"  style="color: red;">{{errorMsg}}</span></div>

           <tab-content title="Personal details"
                        icon="ti-user"
                        :before-change="validateAsync"
           >
             <b-form>
               <b-form-group id="fieldsetHorizontal"
                             :label-cols="4"
                             breakpoint="md"
                             label-size="sm"
                             label="Full Name">
                 <b-form-input id="name" v-model.trim="user.name"></b-form-input>
               </b-form-group>
               <b-form-group id="fieldsetHorizontal"
                             :label-cols="4"
                             breakpoint="md"
                             label-size="sm"
                             :label="role === 'student' ? 'University' : 'Company'"
               >
                 <b-form-input id="name" v-model.trim="user.company"></b-form-input>
               </b-form-group>
             </b-form>
           </tab-content>
           <tab-content :title="role === 'student' ? 'Education' : 'Orgainsational Information'"
                        :icon="role === 'student' ? 'ti-book' : 'ti-bag'"
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
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Name of School">
                   <b-form-input id="school" v-model.trim="education.school"></b-form-input>
                 </b-form-group>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Degree">
                   <b-form-input id="degree" v-model.trim="education.degree"></b-form-input>
                 </b-form-group>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Field Of Study">
                   <b-form-input id="fieldofstudy" v-model.trim="education.fieldofstudy"></b-form-input>
                 </b-form-group>
                 <div class="row">
                   <div class="col-5">
                     <b-form-group id="fieldsetHorizontal"
                                   :label-cols="2"
                                   breakpoint="md"
                                   label-size="sm"
                                   label="From">
                       <b-form-input id="from" v-model.trim="education.from" type="date"></b-form-input>
                     </b-form-group>
                   </div>
                   <div class="col-5">
                     <b-form-group id="fieldsetHorizontal"
                                   :label-cols="2"
                                   breakpoint="md"
                                   label-size="sm"
                                   label="To">
                       <b-form-input id="to" v-model.trim="education.to" type="date"></b-form-input>
                     </b-form-group>
                   </div>
                   <div class="col-2 mt-4 pt-2">
                     <b-form-checkbox
                       id="checkbox-1"
                       v-model="education.current"
                       name="checkbox-1"
                     >
                       Current
                     </b-form-checkbox>
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
             <div v-if="role === 'employer' ">
               <b-form>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Name of Organinzation">
                   <b-form-input id="name" v-model.trim="company.name"></b-form-input>
                 </b-form-group>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Location">
                   <b-form-input id="name" v-model.trim="company.location"></b-form-input>
                 </b-form-group>
               </b-form>
             </div>
           </tab-content>
<!--           EXPERIENCE TAB-->
           <tab-content
                        v-if="role === 'student'"
                        title="Experience"
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
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Name of Organinsation">
                   <b-form-input id="company" v-model.trim="experience.company"></b-form-input>
                 </b-form-group>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Title">
                   <b-form-input id="title" v-model.trim="experience.title"></b-form-input>
                 </b-form-group>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Location">
                   <b-form-input id="location" v-model.trim="experience.location"></b-form-input>
                 </b-form-group>
                 <div class="row">
                   <div class="col-5">
                     <b-form-group id="fieldsetHorizontal"
                                   :label-cols="2"
                                   breakpoint="md"
                                   label-size="sm"
                                   label="From">
                       <b-form-input id="from" v-model.trim="experience.from" type="date"></b-form-input>
                     </b-form-group>
                   </div>
                   <div class="col-5">
                     <b-form-group id="fieldsetHorizontal"
                                   :label-cols="2"
                                   breakpoint="md"
                                   label-size="sm"
                                   label="To">
                       <b-form-input id="to" v-model.trim="experience.to" type="date"></b-form-input>
                     </b-form-group>
                   </div>
                   <div class="col-2 mt-4 pt-2">
                     <b-form-checkbox
                       id="checkbox-1"
                       v-model="experience.current"
                       name="checkbox-1"
                     >
                       Current
                     </b-form-checkbox>
                   </div>
                 </div>
                 <b-form-group id="fieldsetHorizontal"
                               :label-cols="4"
                               breakpoint="md"
                               label-size="sm"
                               label="Description">
                   <b-form-input id="description" v-model.trim="experience.description"></b-form-input>
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
             v-if="role === 'student'"
             title="Skills"
             icon="ti-stats-up">
             stats tab
           </tab-content>

         </form-wizard>

       </b-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'ProfileBuilder',
  data () {
    return {
      name: '',
      user: {},
      role: '',
      company: {},
      experiences: [{
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: [],
        description: ''
      }],
      educations: [{
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: []
      }],
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
      alert('Yay. Done!')
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
              company: this.user.company
            },
            user: {id: id}
          }
          if (!this.user.name)
            reject('Please enter your name')

          axios.post(`http://localhost:3000/api/profile`, obj, {headers: params})
            .then(response => {
              resolve(true)
            })
            .catch(e => {
              reject(e.response.data)
            })
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
            to: '',
            current: true
          }
        )
      else if (array === 'experience')
        this.experiences.push({
          company: '',
          title: '',
          location: '',
          from: '',
          to: '',
          current: [],
          description: ''
        })
    },
    deleteItem (index, array) {
      if (array === 'education')
        this.educations = this.educations.splice(this.educations.indexOf(index), 1)
      else if (array === 'experience')
        this.experiences = this.experiences.splice(this.experiences.indexOf(index), 1)
    }
  },
  mounted () {
    this.role = localStorage.user_role
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
</style>

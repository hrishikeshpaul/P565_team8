<template>
  <div>
    <NavBar />
    <div class="text-center mt-5">
      <gravatar
        email="hrishikeshpaul12@gmail.com"
        alt="Nobody"
        :size="200"
        default-img="mm"
        style="border-radius: 50%; "/>
      <div class="mt-2" >
        <span style="font-size: 40px;">{{user.name}}</span>
        <button href="#"><i class="ti-pencil"></i></button>
      </div>
      <div>
        <span style="font-size: 20px;">{{user.company}}</span>
        <button href="#"><i class="ti-pencil"></i></button>
      </div>
    </div>
    <div class="mx-5 my-5 px-5">
      <div class="row">
        <div class="col-6">
          <b-card>
            <div class="text-center">
              <span style="font-size: 30px;">Your Information</span>
            </div>
            <b-card-body>
              <div id="education">
              <label><b>Education</b></label>
              <b-collapse v-if="user.education.length > 0" v-for="edu in user.education" :id="edu.school" v-model="show">
                <b-card class="mb-3">
                  <button style="float: right;"><i class="ti-pencil" @click="show != show"></i></button>
                  <div><b>Name</b><p>{{edu.school}} </p></div>
                  <div><b>Degree</b> <p>{{edu.degree}} </p></div>
                  <div><b>Field of Study</b> <p>{{edu.fieldofstudy}} </p></div>
                  <div><b>Duration</b> <p>{{$moment(edu.from).format("MMM Do YY") }} - {{edu.to !== null ? edu.to : 'Present'}} </p></div>
                </b-card>
              </b-collapse>
              <button
                v-if="role === 'student'"
                style="width: 100%; border-radius: 10px;"
                class="btn-outline-warning mb-2 mt-1 "
              >
                Add
              </button>
            </div>
              <div id="Experience">
                <label><b>Experiences</b></label>
                <div v-if="user.experience.length > 0" v-for="exp in user.experience">
                  <b-card class="mb-3">
                    <button style="float: right;"><i class="ti-pencil"></i></button>
                    <div><b>Company/Organization</b><p>{{exp.company}} </p></div>
                    <div><b>Title</b> <p>{{exp.title}} </p></div>
                    <div><b>Location</b> <p>{{exp.location}} </p></div>
                    <div><b>Duration</b> <p>{{$moment(exp.from).format("MMM Do YY") }} - {{exp.to !== null ? edu.to : 'Present'}} </p></div>
                    <div><b>Description</b><p>{{exp.description}}</p></div>
                  </b-card>
                </div>
                <button
                  v-if="role === 'student'"
                  style="width: 100%; border-radius: 10px;"
                  class="btn-outline-warning mb-2 mt-1 "
                >
                  Add
                </button>
              </div>
            </b-card-body>
          </b-card>
        </div>
        <div class="col-6" v-if="role === 'student'">
          <b-card title="Your Applications" class="text-center">

          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar'

import Gravatar from 'vue-gravatar';


export default {
  name: 'Profile',
  components: {
    NavBar,
    Gravatar
  },
  data () {
    return {
      user_id: localStorage.getItem('user_id'),
      user: {},
      role: localStorage.user_role,
      show: true
    }
  },
  method: {
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    },
  },
  created () {
    var headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
    }

    axios.get(`http://localhost:3000/api/user/${this.user_id}`, {headers: headers})
      .then(response => {
        this.user = response.data
        console.log(this.user)

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
</script>

<style scoped>
button {
  border: none;
}
</style>

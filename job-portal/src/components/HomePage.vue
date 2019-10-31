<template>
  <div>
    <NavBar @logout="logout"/>
    <div class="container">
      <FilterBar @group="callReGroup" :options="filterOptions"/>
    </div>

    <div class="mx-5 px-5">
      <div v-for="(job, key) in computedJobs" class="mb-3" v-if="someData === 'student'" >
        <div style="position: relative;">
          <h2><div class="mb-3">{{ key }}</div></h2>
          <div
            v-for="(j, index) in job" v-if="job.length > 0"
            style="display: inline-block;"
            class="mr-5">
            <JobCard
              :job="j"
              ref="card"
              :id="j._id"
              @accept="accept"
              @reject="reject"
              class="mb-3"
              :style="{'min-width': '200px', 'z-index': index+1, 'width': '270px', 'height': '300px'}"/>
          </div>
          <div v-else>You are out of companies!</div>
        </div>
      </div>

      <div v-for="(user, key) in computedUsers" class="mb-3" v-if="someData === 'employer'">

        <div style="position: relative;">
          <h2><div class="mb-3">{{ key }}</div></h2>
          <div
            v-for="u in user" v-if="user.length > 0"
            style="display: inline-block;"
            class="mr-5">
            <UserCard
              :user="u"
              ref="card"
              :id="u._id"
              @accept="acceptUser"
              @reject="rejectUser"
              class="mb-3"
              :style="{'min-width': '200px', 'width': '270px', 'height': '300px'}"/>
          </div>
          <div v-else>You are out of users!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

import NavBar from './NavBar'
import FilterBar from './FilterBar'
import JobCard from './JobCard'
import UserCard from './UserCard'

export default {
  name: 'HomePage',
  components: {
    NavBar,
    FilterBar,
    JobCard,
    UserCard
  },
  data () {
    return {
      user_id: localStorage.getItem('user_id'),
      jobs: [],
      role: '',
      users: [],
      showClass: false,
      studentKeyToGroup: 'position',
      employerKeyToGroup: 'company',
      someData: localStorage.getItem('role'),
      filterOptions: [],
      studentFilterOptions: [
        { name: 'Position', code: 'position' },
        { name: 'Location', code: 'location' },
        { name: 'Company', code: 'company' }
      ],
      employerFilterOptions: [
        { name: 'Company', code: 'company' },
        { name: 'Gender', code: 'gender' },
      ]
    }
  },
  computed: {
    computedJobs: {
      get: function () {
        return this.reGroup(this.jobs, this.studentKeyToGroup)
      },
      set: function (newVal) {
        return newVal
      }
    },
    computedUsers: {
      get: function () {
        return this.reGroup(this.users, this.employerKeyToGroup)
      },
      set: function (newVal) {
        return newVal
      }
    }
  },
  created () {
    this.getData()
    this.filterOptions = localStorage.getItem('role') == 'student' ? this.studentFilterOptions : this.employerFilterOptions
  },
  methods: {
    getData () {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
      }
      var params = {
        user: this.user_id,
        role: localStorage.role
      }

      axios.get(`http://localhost:3000/api/jobs`, {params, headers})
        .then(response => {
          if (this.someData === 'student')
            this.jobs = response.data
          else
            this.users = response.data
          // this.jobs = this.reGroup(response.data, 'position')
        })
        .catch(e => {
          if (e.response.status === 401) {
            this.$router.push({
              name: 'Login'
            })
          }
        })
    },
    reject (i) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
        'Content-Type': 'application/json'
      }

      axios.patch(`http://localhost:3000/api/jobs/reject`, {
        user: localStorage.getItem('user_id'),
        job: i
      }, {headers})
        .then(response => {
          console.log(this.$refs['card'])
          this.$refs['card'].forEach(card => {
            if (card.$el.id === i) {

              // card.$el.classList.add('object')
              // card.$el.classList.add('move-left')
            }
          })
          this.jobs.splice(this.jobs.findIndex(function (it) {
            return it._id === i
          }), 1)

        })
        .catch(e => {
          console.log(e.data)
        })
    },
    accept (i) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
        'Content-Type': 'application/json'
      }

      axios.patch(`http://localhost:3000/api/jobs/accept`, {
        user: localStorage.getItem('user_id'),
        job: i,
        role: this.someData
      }, {headers})
        .then(response => {
          this.$refs['card'].forEach(card => {
            if (card.$el.id === i) {
              // card.$el.classList.add('object')
              // card.$el.classList.add('move-right')
            }
          })
          this.jobs.splice(this.jobs.findIndex(function (it) {
            return it._id === i
          }), 1)
        })
        .catch(e => {
          console.log(e.data)
        })
    },
    acceptUser (i) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
        'Content-Type': 'application/json'
      }

      axios.patch(`http://localhost:3000/api/jobs/accept`, {
        user: localStorage.getItem('user_id'),
        userToAccept: i.id,
        job: i.job,
        role: this.someData
      }, {headers})
        .then(response => {
          this.$refs['card'].forEach(card => {
            if (card.$el.id === i) {
              // card.$el.classList.add('object')
              // card.$el.classList.add('move-right')
            }
          })
          this.users.splice(this.users.findIndex(function (it) {
            return it._id === i.id
          }), 1)
        })
        .catch(e => {
          console.log(e.data)
        })
    },
    rejectUser (i) {
      var headers = {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length),
        'Content-Type': 'application/json'
      }

      axios.patch(`http://localhost:3000/api/jobs/reject`, {
        user: localStorage.getItem('user_id'),
        userToReject: i.id,
        job: i.job,
        role: this.someData
      }, {headers})
        .then(response => {
          this.$refs['card'].forEach(card => {
            if (card.$el.id === i) {
              // annimations go here
              // card.$el.classList.add('object')
              // card.$el.classList.add('move-left')
            }
          })
          this.users.splice(this.users.findIndex(function (it) {
            return it._id === i
          }), 1)

        })
        .catch(e => {
          console.log(e.data)
        })
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    },
    callReGroup (key) {
      if (this.someData === 'student') {
        this.keyToGroup = key
        this.computedJobs = this.reGroup(this.jobs, this.keyToGroup)
      } else {
        this.employerKeyToGroup = key
        this.computedUsers = this.reGroup(this.users, key)
      }
    },
    reGroup (list, key) {
      const newGroup = {}
      list.forEach(item => {
        const newItem = Object.assign({}, item)
        delete newItem[key]
        newGroup[item[key]] = newGroup[item[key]] || []
        newGroup[item[key]].push(newItem)
      })

      const ordered = {};
      Object.keys(newGroup).sort().forEach(function (key) {
        ordered[key] = newGroup[key];
      })

      for (var k in ordered) {
        ordered[k].forEach(job => {
          job[this.keyToGroup] = k
        })
      }

      return ordered

    }

  }
}

</script>

<style scoped>

  .move-right {
    transform: translate(150px,0);
    -webkit-transform: translate(150px,0); /** Chrome & Safari **/
    -o-transform: translate(150px,0); /** Opera **/
    -moz-transform: translate(150px,0); /** Firefox **/
  }
  .move-left {
    transform: translate(-150px,0);
    -webkit-transform: translate(1-50px,0); /** Chrome & Safari **/
    -o-transform: translate(-150px,0); /** Opera **/
    -moz-transform: translate(-150px,0); /** Firefox **/
  }
  .object {
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out; /** Chrome & Safari **/
    -moz-transition: all 0.5s ease-in-out; /** Firefox **/
    -o-transition: all 0.5s ease-in-out; /** Opera **/
  }

</style>

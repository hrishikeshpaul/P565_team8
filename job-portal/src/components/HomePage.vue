<template>
  <div>
    <NavBar @logout="logout"/>
    <div class="container">
      <FilterBar/>
    </div>
    <div class="mx-5 px-5">
      <div v-for="(job, key) in jobs">
        <h2><span>{{key}}</span></h2>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

import NavBar from './NavBar'
import FilterBar from './FilterBar'

export default {
  name: 'HomePage',
  components: {
    NavBar,
    FilterBar
  },
  data () {
    return {
      jobs: [],
    }
  },
  created () {
    var headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken').substring(4, localStorage.getItem('jwtToken').length)
    }
    axios.get(`http://localhost:3000/api/jobs`, {headers})
      .then(response => {
        this.jobs = this.reGroup(response.data, 'position')
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    },
    reGroup (list, key) {
      const newGroup = {}
      list.forEach(item => {
        const newItem = Object.assign({}, item)
        delete newItem[key]
        newGroup[item[key]] = newGroup[item[key]] || []
        newGroup[item[key]].push(newItem)
      })
      return newGroup
    }

  }
}

</script>

<style scoped>
  h2 {
    position: relative;
  }

  h2 span {
    background-color: white;
    padding-right: 10px;
  }

  h2:after {
    content:"";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5em;
    border-top: 1px solid black;
    z-index: -1;
  }


</style>

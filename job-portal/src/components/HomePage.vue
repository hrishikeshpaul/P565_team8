<template>
  <b-row>
    <b-col cols="12">
      <h2>HomePage
        <b-link @click="logout()">(Logout)</b-link>
      </h2>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {

    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`http://localhost:3000/book`)
    .then(response => {
      this.books = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
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
    }
  }
}
</script>

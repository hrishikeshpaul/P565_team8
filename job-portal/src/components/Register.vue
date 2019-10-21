<template>
  <div>
    <div v-if="error">
        <b-alert show variant="danger">{{error}}</b-alert>
    </div>
    <div class="text-center mt-4">
      <a class="btn btn-md linkedin-btn light" @click="$emit('linkedin')" style="color: white;">Linked <i class="ti-linkedin"></i></a>
    </div>
    <div class="center-separator my-3 mt-4">
      or
    </div>
    <b-form @submit="onSubmit" class="p3">
      <b-form-group id="fieldsetHorizontal"
                    :label-cols="1"
                    label-size="sm"
                    breakpoint="md"
                    label="Email">
        <b-form-input id="username" v-model.trim="register.username" class="no-border"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label-size="sm"
                    breakpoint="md"
                    label="Password">
        <b-form-input type="password" id="password" :state="state" v-model.trim="register.password" class="no-border"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label-size="sm"
                    breakpoint="md"
                    label="Re-Enter Password">
        <b-form-input type="password" id="password2" :state="state" v-model.trim="register.password2" class="no-border"></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldsetHorizontal"
        label-size="sm"
        breakpoint="md"
        label="Select Role">
        <b-form-select v-model="register.role" :options="options" size="md" id="role"></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="warning" class="mt-2" style="width: 100%">Register</b-button>
      <br />
    </b-form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      register: {
        role: 'student'
      },
      error: '',
      state: null,
      options: [
        { value: 'student', text: 'Student' },
        { value: 'employer', text: 'Employer' }
      ]
    }
  },
  watch: {
    error (val) {
      if (val) {
        setTimeout(() => this.error = '', 2000)
      }
    }
  },
  methods: {
    onSubmit (evt) {
      this.error = ''
      evt.preventDefault()
      if (this.register.password === this.register.password2) {
        this.state = true
        axios.post(`http://localhost:3000/api/auth/register/`, this.register)
          .then(response => {
            this.$emit('registered', true)
          })
          .catch(e => {
            console.log(e)
            this.error = e.response.data.msg
          })
      } else {
        this.error = 'Password do not match'
        this.state = false
      }
    }
  }
}
</script>

<style scoped>
  .center-separator {
    display: flex;
    line-height: 1px;
    color: #858585;
  }

  .center-separator::before, .center-separator::after {
    content: '';
    display: inline-block;
    flex-grow: 1;
    margin-top: 0.05em;
    background: #c7c7c7;
    height: 1px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .linkedin-btn {
    background-color: #597ca0;
    color: white;
    cursor: pointer;
  }

  .linkedin-btn:hover{
    background-color: #6c9ccb !important;
  }

</style>

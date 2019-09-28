<template>
  <div class="container my-5">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.password1"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Re-Enter Password:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.password2"
          type="password"
          required
          placeholder="Re-Enter Password"
        ></b-form-input>
      </b-form-group>


      <b-button variant="success" class="mr-2" @click="register">Submit</b-button>
      <b-button type="reset" variant="info">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data: ()  => ({
      form: {
        email: '',
        name: '',
        password1: '',
        password2: ''
      }
    }),
    methods: {
      register() {
        let url = 'http://localhost:8081/auth/register'

        this.axios.post(url, this.form).then(response => {
          console.log(response.data)
          this.$router.push('/login')
        },
        error => {
          console.log('failure')
        })
      }
    }
  }
</script>

<style scoped>

</style>

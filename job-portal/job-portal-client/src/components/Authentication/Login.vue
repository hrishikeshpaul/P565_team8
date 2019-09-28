<template>
  <div class="container full-height">
    <div style="display: block">
      <div class="text-center mb-5">NOQ</div>
      <div class="jumbotron" style="background-color: #e8c400;">
        <b-form @submit="login">
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

          <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

        </b-form>

        <b-button type="submit" variant="success" class="mr-2" @click="login">Submit</b-button>
        <b-button type="reset" variant="info" router-link="">
          <router-link to="/register" style="text-decoration: none; color: white;"> Register</router-link>
        </b-button>


      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data: () => ({
      form: {
        password: '',
        email: ''
      }
    }),
    methods: {
      login() {
        let url = 'http://localhost:8081/auth/login'

        this.axios.post(url, this.form).then(response => {
            console.log(response.data)
            this.$router.push('/')
          },
          error => {
            console.log('failure')
          })
      }
    }


  }
</script>

<style scoped>
  .full-height {
    height: 100vh !important;
  }

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

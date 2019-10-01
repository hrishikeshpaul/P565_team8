<template>
  <div>
    <div style="height: 100vh; background-color: #e4e4e7" >
      <div class="container">
        <div style="display: block;">
          <div class="text-center big-title mb-5">
            NOQ
          </div>
          <div>
            <b-card style="border-radius: 8px !important;">
              <div style="width: 350px;">
                <b-tabs content-class="mt-3">
                  <b-tab title="Student" active>
                    <b-col cols="12" >
                      <div v-if="errors && errors.length">
                        <div v-for="error of errors">
                          <b-alert show>{{error.message}}</b-alert>
                        </div>
                      </div>
                      <b-form @submit="onSubmit">
                        <b-form-group id="fieldsetHorizontal"
                                      :label-cols="4"
                                      breakpoint="md"
                                      label="Email">
                          <b-form-input id="username" :state="state" v-model.trim="login.username"></b-form-input>
                        </b-form-group>
                        <b-form-group id="fieldsetHorizontal"
                                      :label-cols="4"
                                      breakpoint="md"
                                      label="Password">
                          <b-form-input type="password" id="password" :state="state" v-model.trim="login.password"></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Login</b-button>
                        <b-button type="button" variant="success" @click.stop="register()">Register</b-button>
                      </b-form>
                    </b-col>
                  </b-tab>
                  <b-tab title="Employer">
                    <b-col cols="12" >
                      <div v-if="errors && errors.length">
                        <div v-for="error of errors">
                          <b-alert show>{{error.message}}</b-alert>
                        </div>
                      </div>
                      <b-form @submit="onSubmit">
                        <b-form-group id="fieldsetHorizontal"
                                      :label-cols="4"
                                      breakpoint="md"
                                      label="Username">
                          <b-form-input id="username" :state="state" v-model.trim="login.username"></b-form-input>
                        </b-form-group>
                        <b-form-group id="fieldsetHorizontal"
                                      :label-cols="4"
                                      breakpoint="md"
                                      label="Password">
                          <b-form-input type="password" id="password" :state="state" v-model.trim="login.password"></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Login</b-button>
                        <b-button type="button" variant="success" @click.stop="register()">Register</b-button>
                      </b-form>
                    </b-col>
                  </b-tab>
                </b-tabs>
              </div>
            </b-card>
          </div>
          <div class="mt-5 pt-5 text-center">
            <br />
            <a class="align-bottom" href="#"><i class="arrow down"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: white; align-items: center; margin-top: 20px; margin-bottom: 20px;" class="my-4 mb-5">
      <div class="text-center big-title">
        What do we offer?
        <hr style="width: 50%"/>
      </div>

      <div>
        <div class="row mt-5" style="align-items: center" >
          <div class="col-lg-4 col-xs-1 col-sm-2 text-center" >
            <img src="../assets/job.png" class="mb-4"/>
            <br />
            <span class="offer-title">Efficient Job Matching</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">A matching based system to efficiently get paired up with jobs or students that suit
              you the best, based on your skills.
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/filter.png" class="mb-4"/>
            <br />
            <span class="offer-title">Discover Filtering</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">Companies and organizations are filtered based on their requirements and a student's skillset
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/chat.png" class="mb-4"/>
            <br />
            <span class="offer-title">Seamless Communication</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">An efficient chatting system to set up interviews, meetings etc.
            </span>
            </div>
          </div>
        </div>
        <div class="row mt-5 " style="align-items: center" >
          <div class="col-lg-4 col-xs-1 col-sm-2 text-center" >
            <img src="../assets/profile.png" class="mb-4"/>
            <br />
            <span class="offer-title">Profile Builder</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description"> An intuitive profile builder for organization and students to convey valuable information
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/queue.png" class="mb-4"/>
            <br />
            <span class="offer-title">Queue Reduction</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description"> Drastically reducing queues at career fairs by pre-matching students to employers.
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/posting.png" class="mb-4"/>
            <br />
            <span class="offer-title">Easy Job Posting</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description"> An easy way for organizations to post jobs to look for potential employers.
            </span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div style="background-color: #fff0e0; align-items: center" class="pt-4">
      <div class="text-center big-title">
        Our Team
        <hr style="width: 50%"/>
      </div>

      <div>
        <div class="row mt-5" style="align-items: center;" >
          <div class="col-lg-4 col-xs-1 col-sm-2 text-center" >
            <img src="../assets/job.png" class="mb-4"/>
            <br />
            <span class="offer-title">Efficient Job Matching</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">A matching based system to efficiently get paired up with jobs or students that suit
              you the best, based on your skills.
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/filter.png" class="mb-4"/>
            <br />
            <span class="offer-title">Discover Filtering</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">Companies and organizations are filtered based on their requirements and a student's skillset
            </span>
            </div>
          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >
            <img src="../assets/chat.png" class="mb-4"/>
            <br />
            <span class="offer-title">Efficient Job Matching</span>
            <br />
            <div class="px-5 pt-2">
            <span class="offer-description">An efficient chatting system to set up interviews, meetings etc.
            </span>
            </div>
          </div>
        </div>
        <div class="row mt-5 " style="align-items: center" >
          <div class="col-lg-4 col-xs-1 col-sm-2 text-center" >

          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >

          </div>
          <div class="col-lg-4 col-xs-1 col-sm-1 col-md-2 text-center" >

          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      login: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/login/`, this.login)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          this.$router.push({
            name: 'HomePage'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
    register () {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    height: 30px;
    width: 30px;
  }
  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .big-title{
    font-size: 40px;
  }

  .offer-title{
    font-size: 20px;
  }

  .offer-description {
    text-align: justify;
  }
</style>

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="warning">
      <b-navbar-brand href="#" class="nav-bar-logo" @click="btnClick">noQ</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">


          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <img src="../assets/user.png" class="nav-bar-icon">
            </template>
            <b-dropdown-item href="#">Profile Settings</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    props: {

    },
    methods: {
      btnClick() {
        this.axios.get('http://localhost:8081/try').then(response => {
          console.log(response.data)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav-bar-logo {
  font-family: Merienda One;
  font-size: 30px;
  padding: 0px;
  font-weight: 500;
}

.nav-bar-icon {
  height: 30px;
  border-radius: 25px;
  border: 1px solid #817d89;
}
</style>

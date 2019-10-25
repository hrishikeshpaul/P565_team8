<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="warning">
        <b-navbar-brand href="/"><b>noQ</b></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click.prevent="logout">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'NavBar',
    data () {
      return {}
    },
    methods: {
      logout () {
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped>

</style>

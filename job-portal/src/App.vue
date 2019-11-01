<template>
  <div id="app">
<!--    <sidebar-menu :menu="menu" />-->
    <vue-page-transition name="fade">
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Main Navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          href: '/charts',
          title: 'Charts',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/charts/sublink',
              title: 'Sub Link'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100% !important;
}
</style>

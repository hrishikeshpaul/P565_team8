import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import NavBar from './components/NavBar'

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: NavBar,
    },
  ]
})


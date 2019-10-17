import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('jwtToken')) {
          next()
        } else {
          next({
            name: 'Login'
          })
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('jwtToken')) {
          next({name: 'HomePage'})
        } else {
          next({
            name: 'Login'
          })
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

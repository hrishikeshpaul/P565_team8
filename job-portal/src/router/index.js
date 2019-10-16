import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NotFound from '@/components/NotFound'
import ProfileBuilder from '@/components/ProfileBuilder'

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
        if (from.fullPath === '/') {
          if (localStorage.getItem('jwtToken')) {
            next({name: 'HomePage'})
          } else {
            next()
          }
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
    {
      path: '/build_profile',
      name: 'ProfileBuilder',
      component: ProfileBuilder

    }
  ]
})

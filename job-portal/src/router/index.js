import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'
<<<<<<< HEAD
import NotFound from '@/components/NotFound'
=======
import ProfileBuilder from '@/components/ProfileBuilder'
>>>>>>> chore: Add profile builder

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
<<<<<<< HEAD
      path: '*',
      name: '404',
      component: NotFound
=======
      path: '/build_profile',
      name: 'ProfileBuilder',
      component: ProfileBuilder
>>>>>>> chore: Add profile builder
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    components: () => import('@/views/home')
  },
  {
    name: 'login',
    path: '/login',
    components: () => import('@/views/login')
  }
  ]
})

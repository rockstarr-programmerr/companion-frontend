import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import LayoutNoAppbar from '../layouts/LayoutNoAppbar.vue'

import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import GroupList from '../views/group/GroupList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: LayoutNoAppbar
    }
  },
  {
    path: '/groups',
    name: 'GroupList',
    component: GroupList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

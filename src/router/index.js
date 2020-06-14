import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { requireAuth } from './utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/posts/create',
    name: 'Create Post',
    component: () => import('../views/CreatePost.vue'),
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

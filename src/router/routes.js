import Home from '../views/Home.vue'
import { requireAuth } from './utils'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/posts/create',
    name: 'Create Post',
    component: () => import('@/views/CreatePost.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/posts/create/:community',
    name: 'Create Community Post',
    component: () => import('@/views/CreatePost.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/r/:community/:id',
    name: 'View Post',
    component: () => import('@/views/Post.vue')
  },
  {
    path: '/r/:community',
    name: 'Community',
    component: () => import('@/views/Community.vue')
  },
  {
    path: '/communities',
    name: 'Communities',
    component: () => import('@/views/Communities.vue')
  },
  {
    path: '/communities/directory/:letter?',
    name: 'Community Directory',
    component: () => import('@/views/CommunityDirectory.vue')
  },
  {
    path: '/credits',
    name: 'Credits',
    component: () => import('@/views/Credits.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

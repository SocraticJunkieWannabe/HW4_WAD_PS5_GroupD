import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import NewPost from '../views/NewPostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/post',
    name: 'post',
    component: NewPost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

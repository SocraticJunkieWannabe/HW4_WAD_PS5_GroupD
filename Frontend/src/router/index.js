import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import NewPost from '../views/NewPostView.vue'
import AboutView from '../views/AboutView.vue'
import PostView from '../views/PostView.vue'

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
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/newPost',
    name: 'newPost',
    component: NewPost
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

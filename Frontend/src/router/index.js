import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import NewPost from '../views/NewPostView.vue'
import AboutView from '../views/AboutView.vue'
import PostView from '../views/PostView.vue'

// ============================
// ROUTES
// ============================
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
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
    component: NewPost,
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    meta: { requiresAuth: true }
  }
]

// ROUTER INSTANCE
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//GLOBAL AUTH GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // Not logged in + trying to access protected page
  if (to.meta.requiresAuth && !token) {
    return next({
      name: 'signup',
      query: {
        redirect: to.fullPath,
        message: 'You must be logged in to access the home page'
      }
    })
  }

  // Already logged in = block access to signup page
  if (to.name === 'signup' && token) {
    return next({ name: 'home' })
  }

  next()
})


export default router
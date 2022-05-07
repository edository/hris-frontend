import { createRouter, createWebHistory } from 'vue-router'
import AbsenceView from '../views/AbsenceView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/absence',
      name: 'absence',
      component: AbsenceView
    },
  ]
})

export default router

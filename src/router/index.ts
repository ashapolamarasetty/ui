import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import DashboardHome from '@/views/DashboardHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/home', name: 'home', component: DashboardHome },
  ],
})

export default router

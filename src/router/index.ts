import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import DashboardHome from '@/views/DashboardHome.vue'
import ProjectsView from '@/views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/home', name: 'home', component: DashboardHome },
    { path: '/projects', name: 'projects', component: ProjectsView },
  ],
})

export default router

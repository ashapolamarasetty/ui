import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import DashboardLayout from '@/views/DashboardLayout.vue'
import DashboardHomeContent from '@/views/DashboardHomeContent.vue'
import ProjectsView from '@/views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    {
      path: '/home',
      component: DashboardLayout,
      children: [
        { path: '', name: 'home', component: DashboardHomeContent },
        { path: 'projects', name: 'projects', component: ProjectsView },
      ],
    },
  ],
})

export default router

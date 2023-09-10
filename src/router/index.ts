import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const ROUTE_NAMES = {
   home: 'home',
   feedbackDetail: 'feedback-detail',
   feedbackForm: 'feedback-form',
   designSystem: 'design-system',
   roadmap: 'roadmap',
}

const router = new VueRouter({
   mode: 'history',
   base: import.meta.env.BASE_URL,
   routes: [
      {
         path: '/',
         name: ROUTE_NAMES.home,
         component: () => import('@/views/HomeView.vue'),
      },
      {
         path: '/feedbacks/:id',
         name: ROUTE_NAMES.feedbackDetail,
         component: () => import('@/views/FeedbackDetailView.vue'),
      },
      {
         path: '/feedback-form/:id?',
         name: ROUTE_NAMES.feedbackForm,
         component: () => import('@/views/FeedbackFormView.vue'),
      },
      {
         path: '/roadmap',
         name: ROUTE_NAMES.roadmap,
         component: () => import('@/views/RoadmapView.vue'),
      },
      {
         path: '/design-system',
         name: ROUTE_NAMES.designSystem,
         component: () => import('@/views/DesignSystemView.vue'),
      },
   ]
})

export default router

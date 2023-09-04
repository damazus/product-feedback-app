import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeedbackFormView from '@/views/FeedbackFormView.vue'
import DesignSystemView from '@/views/DesignSystemView.vue'
import FeedbackDetailView from '@/views/FeedbackDetailView.vue'
import RoadmapView from '@/views/RoadmapView.vue'

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
         component: HomeView
      },
      {
         path: '/feedbacks/:id',
         name: ROUTE_NAMES.feedbackDetail,
         component: FeedbackDetailView
      },
      {
         path: '/feedback-form/:id?',
         name: ROUTE_NAMES.feedbackForm,
         component: FeedbackFormView
      },
      {
         path: '/roadmap',
         name: ROUTE_NAMES.roadmap,
         component: RoadmapView
      },
      {
         path: '/design-system',
         name: ROUTE_NAMES.designSystem,
         component: DesignSystemView
      },
   ]
})

export default router

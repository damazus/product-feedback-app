<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FeedbackItem from '@/components/FeedbackItem.vue'
import { useFeedbackStore } from '@/stores/feedback'
import { mapState, mapActions } from "pinia"
import ButtonComponent, { ButtonTheme } from "@/components/ButtonComponent.vue"
import NotFound from "@/components/NotFound.vue"
import StatusInfo from "@/components/StatusInfo.vue"
import { Category } from '@/types'
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   components: {
      ButtonComponent,
      HeaderComponent,
      FeedbackItem,
      NotFound,
      StatusInfo,
   },
   data() {
      return {
         ROUTE_NAMES,
         ButtonTheme,
      }
   },
   computed: {
      ...mapState(useFeedbackStore, [
         'productRequestsFiltered',
         'status',
         'filters'
      ]),
      categories(){
         return Object.values(Category)
      },
   },
   methods: {
      ...mapActions(useFeedbackStore, ['setFilters']),
      toggleCategory(category: string){
         this.setFilters(category)
      }
   },
})
</script>

<template>
   <div class="home-view">
      <div class="home-view__container">
         <div class="home-view__sidebar">
            <div class="home-view__sidebar-hero">
               <h2 class="home-view__sidebar-hero-title">Frontend Mentor</h2>
               <span class="home-view__sidebar-hero-content">Feedback Board</span>
            </div>
            <div class="home-view__sidebar-categories">
               <ButtonComponent
                  :theme="ButtonTheme.Tag"
                  v-for="(category, index) in categories"
                  :key="index"
                  :active="filters.category === category"
                  @click="toggleCategory(category)"
               >{{ category }}</ButtonComponent>
            </div>
            <div class="home-view__sidebar-roadmap">
               <div class="home-view__sidebar-roadmap-header">
                  <h3 class="home-view__sidebar-roadmap-title">Roadmap</h3>
                  <ButtonComponent
                     :theme="ButtonTheme.LinkUnderline"
                     :show-icon="false"
                     class="home-view__sidebar-roadmap-button-view"
                     :to="{ name: ROUTE_NAMES.roadmap }"
                  >View
                  </ButtonComponent>
               </div>

               <div class="home-view__sidebar-roadmap-items">
                  <StatusInfo
                     v-for="(item, index) in status"
                     :key="index"
                     :name="item.name"
                  >
                     <template #end>{{ item.count }}</template>
                  </StatusInfo>
               </div>
            </div>
         </div>
         <div class="home-view__main">
            <HeaderComponent/>
            <div v-if="productRequestsFiltered.length" class="home-view__feedbacks">
               <FeedbackItem
                  v-for="item in productRequestsFiltered"
                  :item="item"
                  :key="item.id"
               />
            </div>
            <NotFound v-else class="home-view__not-found"/>
         </div>
      </div>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.home-view {
   &__container {
      @include mixins.container;
      display: grid;
      grid-template-columns: 255px 1fr;
      gap: 30px;
   }

   &__sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
   }

   &__main {
      display: flex;
      flex-direction: column;
      gap: 24px;
   }

   &__feedbacks {
      display: flex;
      flex-direction: column;
      gap: 20px;
   }

   &__sidebar-hero,
   &__sidebar-categories,
   &__sidebar-roadmap {
      padding: 24px;
      border-radius: 10px;
      background-color: var(--color-white);
   }

   &__sidebar-hero {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 137px;
      border-radius: 10px;
      color: var(--color-white);
      background-image: url("/assets/suggestions/desktop/background-header.png");
   }

   &__sidebar-hero-content {
      opacity: 0.75;
   }

   &__sidebar-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
   }

   &__sidebar-roadmap-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
   }

   &__sidebar-roadmap-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
   }
}
</style>

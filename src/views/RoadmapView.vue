<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import ButtonGoBack from '@/components/ButtonGoBack.vue'
import { useFeedbackStore } from '@/stores/feedback'
import { mapState } from "pinia"
import RoadmapItem from '@/components/RoadmapItem.vue'

export default defineComponent({
   components: {
      HeaderComponent,
      ButtonGoBack,
      RoadmapItem,
   },
   computed: {
      ...mapState(useFeedbackStore, [
         'productRequests',
         'statusItems',
      ]),
   }
})
</script>

<template>
   <div class="roadmap-view">
      <HeaderComponent class="roadmap-view__header">
         <template #main>
            <div class="roadmap-view__header-main">
               <ButtonGoBack class="roadmap-view__header-button"/>
               <h1 class="roadmap-view__header-title">Roadmap</h1>
            </div>
         </template>
      </HeaderComponent>
      <div class="roadmap-view__main">
         <div
            v-for="status in statusItems"
            :key="status.key"
            class="roadmap-view__status-item"
         >
            <h3 class="roadmap-view__status-name">{{ status.key }} ({{ status.productRequests.length }})</h3>
            <p class="roadmap-view__status-description">{{ status.description }}</p>

            <div class="roadmap-view__product-requests">
               <RoadmapItem
                  v-for="productRequest in status.productRequests"
                  :key="productRequest.id"
                  :item="productRequest"
                  class="roadmap-view__product-request"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.roadmap-view{
   @include mixins.container;

   &__header{
      margin-bottom: 48px;
   }

   &__header-button{
      padding: 0;
      color: white;
   }

   &__main{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
   }

   &__status-description{
      color: var(--color-8);
      margin-bottom: 32px;
   }

   &__product-requests{
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
   }
}
</style>
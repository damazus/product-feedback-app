<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import type {ProductRequest} from "@/types"
import ButtonComponent, { ButtonTheme } from "@/components/ButtonComponent.vue"
import StatusInfo from "@/components/StatusInfo.vue"
import CommentCount from "@/components/CommentCount.vue";
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   name: 'RoadmapItem',
   computed: {
      ROUTE_NAMES() {
         return ROUTE_NAMES
      }
   },
   components: {
      ButtonComponent,
      StatusInfo,
      CommentCount,
   },
   props: {
      item: {
         type: Object as PropType<ProductRequest>,
         required: true
      }
   },
   data(){
      return{
         ButtonTheme
      }
   }
})
</script>

<template>
   <div class="roadmap-item" :class="[`roadmap-item--${item.status}`]">
      <StatusInfo :name="item.status" class="roadmap-item__status"/>
      <div class="roadmap-item__main">
         <div class="roadmap-item__info">
            <router-link :to="{name: ROUTE_NAMES.feedbackDetail, params: {id: item.id}}" class="roadmap-item__title">{{ item.title }}</router-link>
            <p class="roadmap-item__description">{{ item.description }}</p>
         </div>
         <ButtonComponent :theme="ButtonTheme.Tag" class="roadmap-item__button-category">{{ item.category }}</ButtonComponent>
         <div class="roadmap-item__footer">
            <ButtonComponent :theme="ButtonTheme.Vote" class="roadmap-item__button-upvote">{{ item.upvotes }}</ButtonComponent>
            <CommentCount :count="item.comments?.length || 0" class="roadmap-item__comment-count"/>
         </div>
      </div>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.roadmap-item{
   --highlight-color: var(--color-white);

   position: relative;
   width: 100%;
   padding: 32px;
   border-radius: 5px;
   background-color: var(--color-white);

   &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      border-radius: 5px 5px 0 0;
      background: var(--highlight-color);
   }

   &--planned{
      --highlight-color: var(--color-9);
   }

   &--in-progress{
      --highlight-color: var(--color-1);
   }

   &--live{
      --highlight-color: var(--color-10);
   }

   &__status{
      margin-bottom: 8px;
   }

   &__title{
      @include mixins.h3;
      color: var(--color-7);
      text-decoration: none;

      &:hover{
         color: var(--color-2);
      }
   }

   &__description{
      color: var(--color-8);
   }

   &__main{
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
   }

   &__footer{
      display: flex;
      justify-content: space-between;
      width: 100%;
   }

   &__button-upvote{
      flex-direction: row;
      gap: 8px;
   }
}
</style>
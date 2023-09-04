<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import type {ProductRequest} from "@/types";
import ButtonComponent, { ButtonTheme } from "@/components/ButtonComponent.vue";
import CommentCount from "@/components/CommentCount.vue";
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   components: {
      ButtonComponent,
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
         ROUTE_NAMES,
         ButtonTheme,
      }
   },
   methods: {
      upVote(){
         console.log('upVote')
      }
   }
})
</script>

<template>
   <div
      class="feedback-item"
      :class="{ 'feedback-item--no-comment': !Boolean(item.comments?.length) }"
   >
      <ButtonComponent
         :theme="ButtonTheme.Vote"
         @click="upVote"
      >{{ item.upvotes }}</ButtonComponent>
      <div class="feedback-item__main">
         <div class="feedback-item__body">
            <router-link
               :to="{ name: ROUTE_NAMES.feedbackDetail, params: {id: item.id} }"
               class="feedback-item__title">{{ item.title }}</router-link>
            <p class="feedback-item__description">{{ item.description }}</p>
            <ButtonComponent
               class="feedback-item__button-category"
               :theme="ButtonTheme.Tag"
            >
               <span class="feedback-item__button-category-label">{{ item.category }}</span>
            </ButtonComponent>
         </div>
         <CommentCount :count="item.comments?.length || 0"/>
      </div>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.feedback-item{
   display: flex;
   align-items: flex-start;
   gap: 40px;
   padding: 28px 32px;
   background-color: var(--color-white);
   border-radius: 10px;

   &__main{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   &__title{
      @include mixins.h3;
      color: var(--color-7);
      text-decoration: none;
      margin-bottom: 4px;

      &:hover{
         color: var(--color-2);
      }
   }

   &__description{
      color: var(--color-8);
      margin-bottom: 12px;
   }

   &--no-comment{
      .feedback-item__comments-count{
         opacity: 0.5;
      }
   }
}
</style>
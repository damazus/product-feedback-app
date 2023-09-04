<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import type {Comment} from '@/types'
import ButtonComponent, { ButtonTheme } from "@/components/ButtonComponent.vue";
import CommentField from "@/components/CommentField.vue";

export default defineComponent({
   name: 'CommentItem',
   components: {
      ButtonComponent,
      CommentField,
   },
   props: {
      comment: {
         type: Object as PropType<Comment>,
         required: true
      }
   },
   data(){
      return{
         ButtonTheme,
         showCommentField: false
      }
   },
   methods: {
      onSubmitComment(){
         console.log('onSubmitComment')
      }
   }
})
</script>

<template>
   <div
      class="comment-item"
      :class="{
         'comment-item--root': Boolean(comment.replies?.length),
         'comment-item--child': Boolean(comment.replyingTo),
      }"
   >
      <div class="comment-item__main">
         <img
            :src="comment.user.image"
            class="comment-item__user-image"
            alt="..."
         />
         <div class="comment-item__container">
            <div class="comment-item__header">
               <div class="comment-item__header-content">
                  <h4 class="comment-item__user-name">{{ comment.user.name }}</h4>
                  <span class="comment-item__user-username">@{{ comment.user.username }}</span>
               </div>
               <ButtonComponent
                  :theme="ButtonTheme.LinkUnderline"
                  :show-icon="false"
                  class="comment-item__button-reply"
                  @click="showCommentField = !showCommentField"
               >Reply</ButtonComponent>
            </div>
            <div class="comment-item__body">
               <div class="comment-item__content-container">
                  <span v-if="comment.replyingTo" class="comment-item__reply-to">@{{ comment.replyingTo }}</span>
                  <span class="comment-item__content">{{ comment.content }}</span>
               </div>
               <CommentField
                  v-if="showCommentField"
                  class="comment-item__comment-field"
                  @submit="onSubmitComment"
               />
            </div>
         </div>
      </div>
      <div v-if="comment.replies?.length" class="comment-item__replies">
         <CommentItem
            v-for="comment in comment.replies"
            :key="comment.id"
            :comment="comment"
         />
      </div>
   </div>
</template>

<style lang="scss">
.comment-item {
   --user-image-size: 40px;
   --gap: 32px;

   &:not(&--child){
      &:first-child{
         padding-bottom: var(--gap);
      }

      &:not(:first-child){
         padding-top: var(--gap);
      }

      &:not(:last-child){
         border-bottom: 1px solid rgba(140, 146, 179, 0.25);
      }
   }

   &__main {
      display: flex;
      gap: var(--gap);
   }

   &__user-image {
      display: block;
      width: var(--user-image-size);
      height: var(--user-image-size);
      border-radius: 50%;
   }

   &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;
   }

   &__header-content {
      display: flex;
      flex-direction: column;
   }

   &__user-name {
      color: var(--color-7);
   }

   &__user-username {
      font-size: 14px;
      color: var(--color-8);
   }

   &__body{
      display: flex;
      flex-direction: column;
      gap: 24px;
   }

   &__button-reply{
      text-decoration: none;
   }

   &__reply-to {
      display: inline-block;
      color: var(--color-1);
      margin-right: 8px;
   }

   &__content {
      color: var(--color-8);
   }

   &__replies {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--gap);
      padding-top: var(--gap);
      padding-left: var(--user-image-size);
   }
}
</style>
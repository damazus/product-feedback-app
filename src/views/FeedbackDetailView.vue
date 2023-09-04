<script lang="ts">
import {defineComponent} from 'vue'
import {mapState} from 'pinia'
import ButtonComponent, {ButtonTheme} from '@/components/ButtonComponent.vue'
import FeedbackItem from '@/components/FeedbackItem.vue'
import CommentItem from '@/components/CommentItem.vue'
import {useFeedbackStore} from '@/stores/feedback'
import ButtonGoBack from "@/components/ButtonGoBack.vue";
import {ROUTE_NAMES} from "@/router";
import TextField from "@/components/TextField.vue";
import {ValidationProvider, ValidationObserver} from 'vee-validate';

export default defineComponent({
   components: {
      ValidationObserver,
      ValidationProvider,
      TextField,
      ButtonGoBack,
      ButtonComponent,
      FeedbackItem,
      CommentItem,
   },
   data(){
      return{
         ROUTE_NAMES,
         ButtonTheme,
         comment: ''
      }
   },
   computed: {
      ...mapState(useFeedbackStore, ['productRequest']),
      id(){
         return parseInt(this.$route.params.id)
      },
      item(){
         return this.productRequest(this.id)
      }
   },
   methods: {
      onSubmit(){
         this.$refs.observer.validate()
      }
   }
})
</script>

<template>
   <div class="feedback-detail-view">
      <div class="feedback-detail-view__header">
         <ButtonGoBack
            class="feedback-detail-view__button-back"
            :margin-x-negative="true"
            :margin-y-negative="true"
         />
         <ButtonComponent
            :theme="ButtonTheme.Info"
            :to="{ name: ROUTE_NAMES.feedbackForm, params: { 'id': id.toString() } }">Edit Feedback</ButtonComponent>
      </div>
      <FeedbackItem :item="item"/>
      <div class="feedback-detail-view__comment-container">
         <h3 class="feedback-detail-view__comment-container-title">4 Comments</h3>

         <div class="feedback-detail-view__comments">
            <CommentItem
               class="feedback-detail-view__comment"
               v-for="comment in item.comments"
               :key="comment.id"
               :comment="comment"
            />
         </div>
      </div>
      <ValidationObserver slim ref="observer" >
         <form class="feedback-detail-view__form" @submit.prevent="onSubmit">
            <ValidationProvider
               slim
               name="comment"
               rules="required"
               v-slot="{ errors }"
            >
               <TextField
                  v-model="comment"
                  :errors="errors"
                  type="textarea"
                  label="Add Comment"
                  placeholder="Type your comment here"
                  class="feedback-detail-view__form-text-field"
               />
            </ValidationProvider>
            <div class="feedback-detail-view__form-footer">
               <span class="feedback-detail-view__form-instruction">250 Characters left</span>
               <ButtonComponent type="submit" class="feedback-detail-view__form-button">Post Comment</ButtonComponent>
            </div>
         </form>
      </ValidationObserver>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.feedback-detail-view{
   @include mixins.container;

   display: flex;
   flex-direction: column;
   gap: 24px;
   width: 730px;

   &__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   &__comment-container,
   &__form{
      padding: 24px 32px 48px;
      border-radius: 10px;
      background-color: var(--color-white);
   }

   &__comment-container-title{
      margin-bottom: 28px;
   }

   &__form-text-field{
      width: 100%;
      margin-bottom: 16px;

      .text-field__textarea{
         min-height: 80px;
      }
   }

   &__form-footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   &__form-instruction{
      font-size: 15px;
      color: var(--color-8);
   }
}
</style>
<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'pinia'
import ButtonComponent, {ButtonTheme} from '@/components/ButtonComponent.vue'
import ProductRequestItem from '@/components/ProductRequestItem.vue'
import CommentItem from '@/components/CommentItem.vue'
import {useFeedbackStore} from '@/stores/feedback'
import ButtonGoBack from "@/components/ButtonGoBack.vue";
import {ROUTE_NAMES} from "@/router";
import TextField from "@/components/TextField.vue";
import {ValidationProvider, ValidationObserver} from 'vee-validate';
import type {ProductRequest} from "@/types";

export default defineComponent({
   components: {
      ValidationObserver,
      ValidationProvider,
      TextField,
      ButtonGoBack,
      ButtonComponent,
      ProductRequestItem,
      CommentItem,
   },
   data(){
      return{
         ROUTE_NAMES,
         ButtonTheme,
         characterMax: 250,
         comment: ''
      }
   },
   computed: {
      ...mapState(useFeedbackStore, ['productRequest']),
      id(){
         return parseInt(this.$route.params.id)
      },
      item(): ProductRequest | undefined{
         return this.productRequest(this.id)
      },
      commentTitle(): string{
         return (this.item?.comments?.length || 0) > 1 ? 'Comments' : 'Comment'
      },
      charactersLeft(): number{
         return this.characterMax - this.comment.length
      }
   },
   methods: {
      ...mapActions(useFeedbackStore, ['upVote', 'addComment']),
      onComment(){
         this.$refs.observer.validate().then((valid) => {
            if(valid){
               console.log('onComment', this.id, this.comment)
               this.addComment(this.id, this.comment)
               this.comment = ''
               this.$refs.observer.reset()
            }
         })
      },
      onUpVote(productRequest: ProductRequest){
         this.upVote(productRequest)
      }
   }
})
</script>

<template>
   <div class="feedback-detail-view" v-if="item">
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
      <ProductRequestItem :item="item"  @up-vote="onUpVote"/>
      <div class="feedback-detail-view__comment-container">
         <h3 class="feedback-detail-view__comment-container-title">{{ item.comments?.length || 0 }} {{ commentTitle }}</h3>

         <div v-if="item.comments?.length" class="feedback-detail-view__comments">
            <CommentItem
               class="feedback-detail-view__comment"
               v-for="comment in item.comments"
               :key="comment.id"
               :comment="comment"
            />
         </div>
         <div v-else class="feedback-detail-view__empty-comment">Vous n'avez aucun commentaire</div>
      </div>
      <ValidationObserver slim ref="observer">
         <form class="feedback-detail-view__form" @submit.prevent="onComment">
            <ValidationProvider
               slim
               name="comment"
               rules="required"
               v-slot="{ errors }"
            >
               <TextField
                  v-model="comment"
                  :errors="errors"
                  :maxlength="characterMax"
                  type="textarea"
                  label="Add Comment"
                  placeholder="Type your comment here"
                  class="feedback-detail-view__form-text-field"
               />
            </ValidationProvider>
            <div class="feedback-detail-view__form-footer">
               <span class="feedback-detail-view__form-instruction">{{ charactersLeft }} Characters left</span>
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

   &__empty-comment{
      color: var(--color-8);
      text-align: center;
   }

   &__form-text-field{
      width: 100%;
      margin-bottom: 16px;
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
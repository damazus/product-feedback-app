<script lang="ts">
import {defineComponent} from 'vue'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {mapActions, mapState} from "pinia"
import {useFeedbackStore} from "@/stores/feedback"

import TextField from '@/components/TextField.vue'
import ButtonComponent, {ButtonTheme} from '@/components/ButtonComponent.vue'
import ButtonGoBack from '@/components/ButtonGoBack.vue'
import CategoryMultiselect from '@/components/CategoryMultiselect.vue'
import StatusMultiselect from '@/components/StatusMultiselect.vue'
import {Category, ProductRequest, StatusEnum} from "@/types";
import {capitalize, id} from "@/utils";
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   components: {
      ValidationProvider,
      ValidationObserver,
      TextField,
      ButtonComponent,
      ButtonGoBack,
      CategoryMultiselect,
      StatusMultiselect,
   },
   data() {
      return {
         ButtonTheme,
         form: this.initForm() as ProductRequest
      }
   },
   computed: {
      ...mapState(useFeedbackStore, ['productRequest', 'status',]),
      id(): number {
         return parseInt(this.$route.params.id)
      },
      isEdit(): boolean {
         return Boolean(this.id)
      },
      title(): string {
         return this.isEdit ? 'Editing ‘Add a dark theme option’' : 'Create New Feedback'
      },
      icon(): string {
         return this.isEdit ? 'shared-icon-edit-feedback' : 'shared-icon-new-feedback'
      },
      item(): ProductRequest | undefined {
         return this.productRequest(this.id)
      },
      categories() {
         return Object.values(Category)
      },
      buttonSubmitLabel(): string {
         return this.id ? 'Edit Feedback' : 'Add Feedback'
      }
   },
   methods: {
      ...mapActions(useFeedbackStore, [
         'add',
         'edit',
         'delete'
      ]),
      initForm(): ProductRequest{
         return {
            id: id(),
            title: '',
            category: '',
            description: '',
            upvotes: 0,
            status: StatusEnum.Suggestion
         }
      },
      onSubmit() {
         this.$refs.observer.validate().then((valid) => {
            if(valid){
               if (this.id){
                  this.edit({...this.form})
               }else{
                  this.add({...this.form})
               }

               this.$router.push({name: ROUTE_NAMES.home})
            }
         })
      },
      fillForm(item: ProductRequest){
         this.form.id = this.id
         this.form.title = item.title
         this.form.category = capitalize(item.category)
         this.form.status = item.status
         this.form.upvotes = item.upvotes
         this.form.description = item.description
      },
      onDelete(){
         this.delete(this.id)
         this.$router.push({name: ROUTE_NAMES.home})
      },
      onCancel(){
         this.form = this.initForm()
         this.$refs.observer.reset()
      }
   },
   mounted() {
      if (this.item) {
         this.fillForm(this.item)
      }
   }
})
</script>

<template>
   <div class="feedback-form">


      <div class="feedback-form__inner">
         <ButtonGoBack
            class="feedback-form__button-back"
            :margin-x-negative="true"
            :margin-y-negative="true"
         />

         <ValidationObserver ref="observer" tag="div">
            <form class="feedback-form__main" @submit.prevent="onSubmit">
               <SvgIcon
                  :name="icon"
                  class="feedback-form__button-plus"
               />
               <h1 class="feedback-form__title">{{ title }}</h1>
               <div class="feedback-form__body">
                  <ValidationProvider
                     slim
                     name="title"
                     rules="required"
                     v-slot="{ errors }"
                  >
                     <TextField
                        v-model="form.title"
                        :errors="errors"
                        label="Feedback Title"
                        description="Add a short, descriptive headline"
                     />
                  </ValidationProvider>

                  <ValidationProvider
                     slim
                     name="category"
                     rules="required"
                     v-slot="{ errors }"
                  >
                     <CategoryMultiselect
                        v-model="form.category"
                        :errors="errors"
                        label="Category"
                        description="Choose a category for your feedback"
                     />
                  </ValidationProvider>

                  <ValidationProvider
                     v-if="isEdit"
                     slim
                     name="status"
                     rules="required"
                     v-slot="{ errors }"
                  >
                     <StatusMultiselect
                        v-model="form.status"
                        :errors="errors"
                        label="Update Status"
                        description="Change feedback state"
                     />
                  </ValidationProvider>
                  <ValidationProvider
                     slim
                     name="detail"
                     rules="required"
                     v-slot="{ errors }"
                  >
                     <TextField
                        v-model="form.description"
                        :errors="errors"
                        type="textarea"
                        label="Feedback Detail"
                        description="Include any specific comments on what should be improved, added, etc."
                     />
                  </ValidationProvider>
               </div>
               <div class="feedback-form__actions">
                  <ButtonComponent v-if="isEdit" :theme="ButtonTheme.Danger" @click="onDelete">Delete</ButtonComponent>
                  <div class="feedback-form__actions-main">
                     <ButtonComponent type="reset" @click="onCancel" :theme="ButtonTheme.Secondary">Cancel</ButtonComponent>
                     <ButtonComponent type="submit">{{ buttonSubmitLabel }}</ButtonComponent>
                  </div>
               </div>
            </form>
         </ValidationObserver>
      </div>
   </div>
</template>

<style lang="scss">
.feedback-form {
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--color-6);
   border-radius: 10px;

   &__button-back {
      margin-bottom: 68px;
   }

   &__main {
      position: relative;
      width: 540px;
      padding: 52px 42px 40px;
      border-radius: 10px;
      background-color: var(--color-white);
   }

   &__button-plus.svg-icon {
      --size: 56px;

      position: absolute;
      top: 0;
      left: 42px;
      transform: translateY(-50%);
      display: flex;
      width: var(--size);
      height: var(--size);
   }

   &__title {
      margin-bottom: 40px;
   }

   &__body {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 32px;
   }

   &__actions {
      display: flex;
      justify-content: space-between;
   }

   &__actions-main {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      width: 100%;
   }
}
</style>
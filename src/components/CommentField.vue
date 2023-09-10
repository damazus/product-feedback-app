<script lang="ts">
import {defineComponent} from 'vue'
import TextField from "@/components/TextField.vue"
import ButtonComponent from "@/components/ButtonComponent.vue"
import {ValidationProvider} from 'vee-validate';

export default defineComponent({
   components: {
      ValidationProvider,
      ButtonComponent,
      TextField
   },
   data() {
      return {
         comment: ''
      }
   },
   methods: {
      submit() {
         this.$refs.provider?.validate()?.then(({ valid }) => {
               if (valid) {
                  this.$emit('submit')
               }
            })
      }
   }
})
</script>

<template>
   <div class="comment-field">
      <ValidationProvider
         ref="provider"
         slim
         name="comment"
         rules="required"
         v-slot="{ errors }"
      >
         <TextField
            v-model="comment"
            :errors="errors"
            class="comment-field__text-field"
            type="textarea"
            placeholder="Type your comment here"
         />
      </ValidationProvider>
      <ButtonComponent type="submit" @click="submit">Post Reply</ButtonComponent>
   </div>
</template>

<style lang="scss">
.comment-field {
   display: flex;
   align-items: flex-start;
   gap: 16px;

   &__text-field {
      flex: 1;
   }
}
</style>
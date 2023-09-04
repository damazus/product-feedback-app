<script lang="ts">
import { defineComponent } from 'vue'
import ButtonComponent from "@/components/ButtonComponent.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   components: {
      ButtonComponent,
      SvgIcon,
   },
   data(){
      return{
         ROUTE_NAMES
      }
   }
})
</script>

<template>
   <div class="not-found">
      <div class="not-found__inner">
         <SvgIcon class="not-found__empty-icon" name="suggestions-illustration-empty"/>
         <h1 class="not-found__empty-title">There is no feedback yet.</h1>
         <p class="not-found__empty-description">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
         <ButtonComponent
            icon="shared-icon-plus"
            :to="{ name: ROUTE_NAMES.feedbackForm }"
         >Add Feedback</ButtonComponent>
      </div>
   </div>
</template>

<style lang="scss">
.not-found{
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   padding: 110px 0;
   border-radius: 10px;
   background: var(--color-white);

   &__inner{
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 410px;
      margin: 0 auto;
   }

   &__empty-icon{
      font-size: 130px;
      margin-bottom: 53px;
   }

   &__empty-title{
      margin-bottom: 16px;
   }

   &__empty-description{
      margin-bottom: 48px;
   }
}
</style>
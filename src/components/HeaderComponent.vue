<script lang="ts">
import { defineComponent } from 'vue'
import ButtonComponent, {  } from '@/components/ButtonComponent.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useFeedbackStore } from '@/stores/feedback'
import { mapState } from "pinia"
import {ROUTE_NAMES} from "@/router";

export default defineComponent({
   components: {
      ButtonComponent,
      SvgIcon,
   },
   computed: {
      ROUTE_NAMES() {
         return ROUTE_NAMES
      },
      ...mapState(useFeedbackStore, ['productRequestsFiltered']),
      productRequestsCount(): number{
         return this.productRequestsFiltered.length
      },
      title(): string{
         return this.productRequestsCount > 1 ? 'Suggestions' : 'Suggestion'
      }
   }
})
</script>

<template>
   <header class="header">
      <div class="header__main">
         <slot name="main">
            <SvgIcon class="header__icon" name="suggestions-icon-suggestions"/>
            <h3 class="header__suggestion">{{ productRequestsCount }} {{ title }}</h3>
         </slot>
      </div>
      <ButtonComponent icon="shared-icon-plus" :to="{ name: ROUTE_NAMES.feedbackForm }">Add Feedback</ButtonComponent>
   </header>
</template>

<style lang="scss">
.header{
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 72px;
   padding-left: 24px;
   padding-right: 16px;
   border-radius: 10px;
   color: var(--color-white);
   background-color: var(--color-3);

   &__main{
      display: flex;
      align-items: center;
      gap: 16px;
   }

   &__icon{
      font-size: 40px;
   }
}
</style>
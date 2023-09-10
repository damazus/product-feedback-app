<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'StatusInfo',
   props: {
      name: {
         type: String,
         required: true
      }
   }
})
</script>

<template>
   <div
      class="status-info"
      :class="[`status-info--${ name }`]"
   >
      <div class="status-info__main">
         <span class="status-info__name">{{ name }}</span>
      </div>
      <span class="status-info__count">
         <slot name="end"></slot>
      </span>
   </div>
</template>

<style lang="scss">
.status-info{
   --dot-color: inherit;

   display: flex;
   justify-content: space-between;
   align-items: center;
   color: var(--color-8);

   &--suggestion {
      --dot-color: var(--color-2);
   }

   &--planned {
      --dot-color: var(--color-9);
   }

   &--in-progress {
      --dot-color: var(--color-1);
   }

   &--live {
      --dot-color: var(--color-10);
   }

   &__main {
      display: flex;
      align-items: center;
      gap: 16px;

      &::before {
         --size: 8px;

         content: '';
         display: block;
         width: var(--size);
         height: var(--size);
         border-radius: 50%;
         background-color: var(--dot-color);
      }
   }

   &__name {
      color: var(--color-8);

      &:first-letter {
         text-transform: uppercase;
      }
   }

   &__count {
      font-weight: 700;
   }
}
</style>